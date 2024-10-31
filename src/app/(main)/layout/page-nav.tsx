import Link from "next/link";

export default function PageNav() {
  return (
    <nav className="h-12 flex justify-between items-center px-4 border-b">
      <div>Logo</div>
      <div className="flex items-center gap-2">
        <Link href={"/write"}>Write</Link>
        <div>Profile</div>
      </div>
    </nav>
  );
}
