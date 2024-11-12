"use server";

import { UserTable } from "@/db";
import { Password } from "@/lib/utils";

// 1. extract form data
// 2. validate form data
// 3. if invalid, return error
// 4. else, save user to database

export async function signUpAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // const supabase = await createClient();
  // const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const hashed = await Password.hashPassword(password);

  // const { error } = await supabase.auth.signUp({
  //   email,
  //   password,
  //   options: {
  //     emailRedirectTo: `${origin}/auth/callback`,
  //   },
  // });

  const res = await UserTable.insertUser({ email, password: hashed });
  return res;

  // if (error) {
  //   console.error(error.code + " " + error.message);
  //   return encodedRedirect("error", "/sign-up", error.message);
  // } else {
  //   return encodedRedirect(
  //     "success",
  //     "/sign-up",
  //     "Thanks for signing up! Please check your email for a verification link.",
  //   );
  // }
}
