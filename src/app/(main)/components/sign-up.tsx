"use client";

import AuthInput from "./auth-input";

export default function SignUpForm() {
  return (
    <section className="_fc gap-4">
      <header className="_fc items-center">
        <h2 className="text-3xl text-center font-bold">Sign up with email</h2>
        <p className="text-xl text-center">
          Enter your email address to create an account.
        </p>
      </header>
      <form className="_fc gap-4">
        <div className="_fc items-center gap-2">
          <label htmlFor="">Your email</label>
          <AuthInput type="email" />
        </div>
        <div className="_fc items-center gap-2">
          <label htmlFor="">Password</label>
          <AuthInput type="password" />
        </div>
      </form>
    </section>
  );
}
