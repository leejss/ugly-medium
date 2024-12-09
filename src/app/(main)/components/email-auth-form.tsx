"use client"

import { ChangeEventHandler, FormEventHandler, useCallback, useState } from "react"
import AuthInput from "./auth-input"
import { AuthAction } from "../actions"
import Button from "@/components/base-button"

interface EmailAuthFormProps {
  type: "sign-in" | "sign-up"
}

export default function EmailAuthForm({ type }: EmailAuthFormProps) {
  const [formState, setFprmState] = useState({
    email: "",
    password: "",
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setFprmState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const onSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        if (type === "sign-in") {
          await AuthAction.signInAction(formState)
        }
        if (type === "sign-up") {
          await AuthAction.signUpAction(formState)
        }
        throw new Error("Invalid type")
      } catch (error) {
        console.error("Error", error)
      }
    },
    [formState, type],
  )

  const title = type === "sign-in" ? "Sign in" : "Sign up"
  return (
    <section className="_fc gap-4">
      <header className="_fc items-center">
        <h2 className="text-center text-3xl font-bold">{title} with email</h2>
        <p className="text-center text-xl">
          Enter your email address and password to {type.toLowerCase()}
        </p>
      </header>
      <form onSubmit={onSubmit} className="_fc gap-4">
        <div className="_fc items-center gap-2">
          <label htmlFor="">Your email</label>
          <AuthInput onChange={onChange} name="email" value={formState.email} type="email" />
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
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </section>
  )
}
