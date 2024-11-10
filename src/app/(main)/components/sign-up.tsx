"use client";

import { ChangeEventHandler, useCallback, useState } from "react";
import AuthInput from "./auth-input";

export default function SignUpForm() {
  const [formState, setFprmState] = useState({
    email: "",
    password: "",
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setFprmState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <section className="_fc gap-4">
      <header className="_fc items-center">
        <h2 className="text-3xl text-center font-bold">Sign up with email</h2>
        <p className="text-xl text-center">
          Enter your email address to create an account.
        </p>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="_fc gap-4"
      >
        <div className="_fc items-center gap-2">
          <label htmlFor="">Your email</label>
          <AuthInput
            onChange={onChange}
            name="email"
            value={formState.email}
            type="email"
          />
        </div>
        <div className="_fc items-center gap-2">
          <label htmlFor="">Password</label>
          <AuthInput
            onChange={onChange}
            name="password"
            type="password"
            value={formState.password}
          />
        </div>
      </form>
    </section>
  );
}
