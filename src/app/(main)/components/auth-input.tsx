import { ChangeEventHandler } from "react";

interface AuthInputProps {
  type: "text" | "password" | "email";
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
}

export default function AuthInput({
  type,
  value,
  onChange,
  name,
}: AuthInputProps) {
  return (
    <div className="flex rounded-md bg-neutral-200 px-2 py-1 focus-within:_shadow-border">
      <input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        className="flex-1 text-lg bg-inherit outline-none"
      />
    </div>
  );
}
