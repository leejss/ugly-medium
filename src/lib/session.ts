import { db } from "@/db";
import { SelectSession, sessionTable } from "@/db/tables/session";
import { SelectUser, usersTable } from "@/db/tables/users";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

const ONE_SEC = 1000;
const ONE_MIN = ONE_SEC * 60;
const ONE_HOUR = ONE_MIN * 60;
const ONE_DAY = ONE_HOUR * 24;
const THIRTY_DAYS_IN_MS = ONE_DAY * 30;
const FIFTEEN_DAYS_IN_MS = ONE_DAY * 15;

export const sessionCookieName = "session_token";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes); // fill bytes with random values
  const token = encodeBase32LowerCaseNoPadding(bytes); // encode as base32
  return token;
}

export async function createSession(token: string, userId: number) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + THIRTY_DAYS_IN_MS),
  };
  await db.insert(sessionTable).values(session);
  return session;
}

export async function validateSessionToken(token: string) {
  const now = Date.now();
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: usersTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(usersTable, eq(usersTable.id, sessionTable.userId))
    .where(eq(sessionTable.id, sessionId));

  if (result.length === 0) {
    return null;
  }

  const { user, session } = result[0];
  if (now > session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
    return null;
  }

  if (now > session.expiresAt.getTime() - FIFTEEN_DAYS_IN_MS) {
    const newExpiresAt = new Date(now + THIRTY_DAYS_IN_MS);
    session.expiresAt = newExpiresAt;
    await db
      .update(sessionTable)
      .set({ expiresAt: newExpiresAt })
      .where(eq(sessionTable.id, sessionId));
  }

  return { session, user };
}

export function getSessionFromCookie() {
  const cookie = cookies().get(sessionCookieName);

  if (!cookie) {
    return null;
  }

  const { value } = cookie;
  return value;
}

export async function invalidateSession(sessionId: string) {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export type SessionData = {
  session: SelectSession;
  user: SelectUser;
};
