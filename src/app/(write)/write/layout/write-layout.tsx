import { PropsWithChildren } from "react";
import WriteNav from "./write-nav";

export default function WriteLayout({ children }: PropsWithChildren) {
  return (
    <>
      <WriteNav />
      <main className="container mx-auto">{children}</main>
    </>
  );
}
