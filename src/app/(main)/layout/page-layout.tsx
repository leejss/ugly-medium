import { PropsWithChildren } from "react";
import PageNav from "./page-nav";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageNav />
      {children}
    </>
  );
}
