"use server"

import { AuthTable, UsersTable } from "@/db"
import {
  createSession,
  generateSessionToken,
  invalidateSession,
  SESSION_TOKEN_COOKIE_NAME,
} from "@/lib/session"
import { hashPassword, verifyPassword } from "@/lib/utils/password"
import { cookies } from "next/headers"

// email auth actions

type AuthFormInput = {
  email: string
  password: string
}

// Create a new user
export async function signUpAction({ email, password }: AuthFormInput) {
  try {
    if (!email || !password) {
      return { error: "Email and password are required" }
    }
    // Check if the user already exists
    const user = await UsersTable.selectUserByEmail(email)
    if (user) {
      return { error: "User already exists" }
    }
    const hashed = await hashPassword(password)
    const res = await UsersTable.insertUser({ email, hashedPassword: hashed })
    // insert auth record
    await AuthTable.insertAuth({ userId: res.id, type: "email" })
    return res
  } catch (error) {
    console.error("Fail:signUpAction", error)
    throw error
  }
}

export async function signInAction({ email, password }: AuthFormInput) {
  try {
    const user = await UsersTable.selectUserByEmail(email)

    if (!user) {
      return { error: "Email not found" }
    }

    const isValid = await verifyPassword(password, user.hashedPassword)

    if (!isValid) {
      return { error: "Password is incorrect" }
    }
    // Create a new session
    const token = generateSessionToken()
    await createSession(token, user.id)
    cookies().set(SESSION_TOKEN_COOKIE_NAME, token)
    return user
  } catch (error) {
    console.error("Fail:signInAction", error)
    throw error
  }
}

export async function signOutAction(sessionId: string) {
  try {
    await invalidateSession(sessionId)
    cookies().set(SESSION_TOKEN_COOKIE_NAME, "", { expires: new Date(0) })
  } catch (error) {
    console.error("Fail:signOutAction", error)
    throw error
  }
}
