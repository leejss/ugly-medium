import Portal from "@/app/component/portal"
import { useState } from "react"
import { X } from "lucide-react"
import EmailAuthForm from "./email-auth-form"

interface AuthDialogProps {
  onClose: () => void
}

const VIEW_STATES = {
  SIGN_IN: "SIGN_IN",
  SIGN_IN_WITH_EMAIL: "SIGN_IN_WITH_EMAIL",
  CREATE_ACCOUNT: "CREATE_ACCOUNT",
  SIGN_UP: "SIGN_UP",
}

export default function AuthDialog({ onClose }: AuthDialogProps) {
  const [view, setView] = useState<string>(VIEW_STATES["SIGN_IN"])
  const renderView = () => {
    if (view === "SIGN_IN") {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <button
              className="_base-button w-[300px] rounded-full"
              onClick={() => {
                setView(`SIGN_IN_WITH_EMAIL`)
              }}
            >
              Sign in with email
            </button>
            <a className="_base-button w-[300px] rounded-full text-center" href="/api/login/github">
              Sign in with github
            </a>
          </div>

          <div className="flex justify-center gap-[1ch]">
            <span className="">No account?</span>
            <button
              className="font-bold text-green-600"
              onClick={() => {
                setView("CREATE_ACCOUNT")
              }}
            >
              Create one
            </button>
          </div>
        </div>
      )
    }

    if (view === "SIGN_IN_WITH_EMAIL") {
      return <EmailAuthForm type="sign-in" />
    }

    if (view === "CREATE_ACCOUNT") {
      return (
        <div className="flex flex-col items-center">
          <div className="flex flex-col">
            <button
              className="_base-button w-[300px] rounded-full"
              onClick={() => {
                setView("SIGN_UP")
              }}
            >
              Sign up with email
            </button>
          </div>
          <div className="flex gap-[1ch]">
            <span className="">Already have an account?</span>
            <button
              className="font-bold text-green-600"
              onClick={() => {
                setView("SIGN_IN")
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      )
    }

    if (view === "SIGN_UP") {
      return (
        <div>
          <EmailAuthForm type="sign-up" />
        </div>
      )
    }

    throw new Error("Invalid view state")
  }
  return (
    <Portal>
      <div aria-label="dialog-container" className="fixed inset-0 z-10">
        <div
          className="fixed inset-0 z-[1] bg-black/65 backdrop-blur-sm"
          aria-label="dialog-overlay"
        ></div>
        <div
          aria-label="dialog"
          className="absolute left-[50%] top-[50%] z-[2] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center rounded-md bg-white px-4 py-10"
        >
          {renderView()}
          <div className="absolute right-4 top-4">
            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>
      </div>
    </Portal>
  )
}
