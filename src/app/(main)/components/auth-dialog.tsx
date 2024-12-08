import Portal from "@/app/component/portal";
import { useState } from "react";
import { X } from "lucide-react";
import EmailAuthForm from "./email-auth-form";

interface AuthDialogProps {
  onClose: () => void;
}

const VIEW_STATES = {
  SIGN_IN: "SIGN_IN",
  SIGN_IN_WITH_EMAIL: "SIGN_IN_WITH_EMAIL",
  CREATE_ACCOUNT: "CREATE_ACCOUNT",
  SIGN_UP: "SIGN_UP",
};

export default function AuthDialog({ onClose }: AuthDialogProps) {
  const [view, setView] = useState<string>(VIEW_STATES["SIGN_IN"]);
  const renderView = () => {
    if (view === "SIGN_IN") {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <button
              className="_base-button rounded-full w-[300px]"
              onClick={() => {
                setView(`SIGN_IN_WITH_EMAIL`);
              }}
            >
              Sign in with email
            </button>
            <a
              className="_base-button text-center rounded-full w-[300px]"
              href="/api/login/github"
            >
              Sign in with github
            </a>
          </div>

          <div className="flex gap-[1ch] justify-center">
            <span className="">No account?</span>
            <button
              className="text-green-600 font-bold"
              onClick={() => {
                setView("CREATE_ACCOUNT");
              }}
            >
              Create one
            </button>
          </div>
        </div>
      );
    }

    if (view === "SIGN_IN_WITH_EMAIL") {
      return <EmailAuthForm type="sign-in" />;
    }

    if (view === "CREATE_ACCOUNT") {
      return (
        <div className="flex flex-col items-center">
          <div className="flex flex-col">
            <button
              className="_base-button rounded-full w-[300px]"
              onClick={() => {
                setView("SIGN_UP");
              }}
            >
              Sign up with email
            </button>
          </div>
          <div className="flex gap-[1ch]">
            <span className="">Already have an account?</span>
            <button
              className="text-green-600 font-bold"
              onClick={() => {
                setView("SIGN_IN");
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      );
    }

    if (view === "SIGN_UP") {
      return (
        <div>
          <EmailAuthForm type="sign-up" />
        </div>
      );
    }

    throw new Error("Invalid view state");
  };
  return (
    <Portal>
      <div aria-label="dialog-container" className="inset-0 z-10 fixed">
        <div
          className="z-[1] fixed inset-0 backdrop-blur-sm bg-black/65"
          aria-label="dialog-overlay"
        ></div>
        <div
          aria-label="dialog"
          className="absolute px-4 py-10 rounded-md z-[2] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white flex flex-col justify-center items-center"
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
  );
}
