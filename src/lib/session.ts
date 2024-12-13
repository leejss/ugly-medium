import { db, SessionTable } from "@/db"
import { SelectSession, sessionTable } from "@/db/tables/session"
import { SelectUser, usersTable } from "@/db/tables/users"
import { sha256 } from "@oslojs/crypto/sha2"
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"

const ONE_SEC = 1000
const ONE_MIN = ONE_SEC * 60
const ONE_HOUR = ONE_MIN * 60
const ONE_DAY = ONE_HOUR * 24
const THIRTY_DAYS_IN_MS = ONE_DAY * 30
const FIFTEEN_DAYS_IN_MS = ONE_DAY * 15

export const SESSION_TOKEN_COOKIE_NAME = "ugly_session_token"
export function generateSessionToken(): string {
  // 20 바이트 길이의 랜덤 바이트 배열 생성
  const bytes = new Uint8Array(20)

  // 난수로 배열을 채운다.
  crypto.getRandomValues(bytes)

  // Base32 인코딩된 문자열로 변환 - 바이너리 데이터를 텍스트로 변환한다.
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(sessionToken: string, userId: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)))
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + THIRTY_DAYS_IN_MS),
  }

  await SessionTable.insertSession(session)

  return {
    ...session,
    sessionToken,
  }
}

export async function validateSessionToken(token: string) {
  // 현재 시간을 가져옵니다.
  const now = Date.now()
  // 토큰을 해싱하여 세션 ID를 생성합니다.
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  // 데이터베이스에서 세션과 연관된 사용자 정보를 조회합니다.
  const result = await db
    .select({ user: usersTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(usersTable, eq(usersTable.id, sessionTable.userId))
    .where(eq(sessionTable.id, sessionId))

  // 세션이 존재하지 않으면 null을 반환합니다.
  if (result.length === 0) {
    return null
  }

  const { user, session } = result[0]

  // 세션이 만료되었으면 삭제하고 null을 반환합니다.
  if (now > session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId))
    return null
  }

  // 세션 만료 시간이 15일 이내로 남았다면 만료 시간을 연장합니다.
  if (now > session.expiresAt.getTime() - FIFTEEN_DAYS_IN_MS) {
    const newExpiresAt = new Date(now + THIRTY_DAYS_IN_MS)
    session.expiresAt = newExpiresAt

    // 데이터베이스에서 세션의 만료 시간을 업데이트합니다.
    await db
      .update(sessionTable)
      .set({ expiresAt: newExpiresAt })
      .where(eq(sessionTable.id, sessionId))
  }

  // 유효한 세션과 사용자 정보를 반환합니다.
  return { session, user }
}

export function getSessionFromCookie() {
  const cookie = cookies().get(SESSION_TOKEN_COOKIE_NAME)

  if (!cookie) {
    return null
  }

  const { value } = cookie
  return value
}

export async function invalidateSession(sessionId: string) {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId))
}

export type SessionData = {
  session: SelectSession
  user: SelectUser
}

function createSessionCookie() {
  const set = (sessionToken: string) => {
    cookies().set(SESSION_TOKEN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })
  }
  const get = () => {
    const cookie = cookies().get(SESSION_TOKEN_COOKIE_NAME)
    return cookie?.value ?? null
  }

  return {
    set,
    get,
  }
}

export const sessionCookie = createSessionCookie()
