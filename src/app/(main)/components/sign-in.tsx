"use client";

import { useCallback, useState } from "react";
import AuthDialog from "./auth-dialog";

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const onClickSignIn = () => {
    setIsOpen(true);
  };

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button onClick={onClickSignIn}>Sign In</button>
      {isOpen && <AuthDialog onClose={onClose} />}
    </>
  );
}
