"use client";

import PopoverContent from "@/components/popover/popover.content";
import PopoverRoot from "@/components/popover/popover.root";
import PopoverTrigger from "@/components/popover/popover.trigger";

export default function ProfilePopover() {
  return (
    <PopoverRoot>
      <PopoverTrigger>Profile</PopoverTrigger>
      <PopoverContent className="flex flex-col w-[200px] p-4 border">
        <div>Signout</div>
        <div>My write</div>
      </PopoverContent>
    </PopoverRoot>
  );
}
