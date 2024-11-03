import Link from "next/link";

export default function WriteNav() {
  return (
    <nav className="container mx-auto h-12 flex items-center justify-between">
      <Link href={"/"}>Logo</Link>
      <div className="flex items-center gap-2">
        <div>Profile</div>
      </div>
    </nav>
  );
}
