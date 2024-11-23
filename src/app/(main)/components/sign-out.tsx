"use client";

import { signOutAction } from "../actions/auth-action";

interface SignoutProps {
  sessionId: string;
}

export default function Signout({ sessionId }: SignoutProps) {
  return (
    <div>
      <button
        onClick={async () => {
          await signOutAction(sessionId);
        }}
      >
        Sign out
      </button>
    </div>
  );
}
