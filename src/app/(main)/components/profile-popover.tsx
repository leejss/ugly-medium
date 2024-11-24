"use client";

import PopoverContent from "@/components/popover/popover.content";
import PopoverRoot from "@/components/popover/popover.root";
import PopoverTrigger from "@/components/popover/popover.trigger";
import type { SessionData } from "@/lib/session";
import Signout from "./sign-out";

interface ProfilePopoverProps {
  sessionData: SessionData;
}

export default function ProfilePopover({ sessionData }: ProfilePopoverProps) {
  const { session, user } = sessionData;
  return (
    <PopoverRoot>
      <PopoverTrigger>Profile</PopoverTrigger>
      <PopoverContent
        sideOffset={20}
        className="flex flex-col justify-center p-4 border"
      >
        <p>{user.email}</p>
        <Signout sessionId={session.id} />
      </PopoverContent>
    </PopoverRoot>
  );
}
