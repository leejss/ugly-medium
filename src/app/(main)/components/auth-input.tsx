interface AuthInputProps {
  type: "text" | "password" | "email";
}

export default function AuthInput({ type }: AuthInputProps) {
  return (
    <div className="flex rounded-md bg-neutral-200 px-2 py-1 focus-within:_shadow-border">
      <input type={type} className="flex-1 text-lg bg-inherit outline-none" />
    </div>
  );
}
