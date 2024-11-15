"use server";

import { UserTable } from "@/db";
import { Password } from "@/lib/utils";

type AuthFormInput = {
  email: string;
  password: string;
};

export async function signUpAction({ email, password }: AuthFormInput) {
  try {
    if (!email || !password) {
      return { error: "Email and password are required" };
    }
    const hashed = await Password.hashPassword(password);
    const res = await UserTable.insertUser({ email, password: hashed });
    return res;
  } catch (error) {
    console.error("Fail:signUpAction", error);
    throw error;
  }
}

export async function signInAction({ email, password }: AuthFormInput) {
  try {
    const user = await UserTable.selectUserByEmail(email);

    if (!user) {
      return { error: "Email not found" };
    }

    const isValid = await Password.verifyPassword(password, user.password);

    if (!isValid) {
      return { error: "Password is incorrect" };
    }
    return user;
  } catch (error) {
    console.error("Fail:signInAction", error);
    throw error;
  }
}
