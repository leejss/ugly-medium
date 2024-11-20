import Link from "next/link";
import SignIn from "./components/sign-in";

export default function PageNav() {
  // If session exists, show profile and sign out
  return (
    <nav className="h-12 flex justify-between items-center px-4 border-b">
      <Link href={"/"}>Logo</Link>
      <div className="flex items-center gap-2">
        <Link href={"/write"}>Write</Link>
        <div>
          <SignIn />
        </div>
        <div>Profile</div>
      </div>
    </nav>
  );
}
