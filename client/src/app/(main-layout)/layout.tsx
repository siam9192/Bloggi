import Container from "@/components/container/Container";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";
import { LayoutProps } from "../../../.next/types/app/layout";
import { headers } from "next/headers";
import { parse } from "url";

async function layout({ children }: LayoutProps) {
  const containerDisabledPaths = ["/blogs/read/"];
  const headersList = await headers();
  const referer = headersList.get("referer");

  let pathname = "";
  if (referer) {
    const { pathname: extractedPathname } = parse(referer);
    pathname = extractedPathname || "";
  }

  const isContainerDisabled =
    pathname && containerDisabledPaths.some((item) => pathname.includes(item));

  return (
    <>
      <Header />
      {/* <Container>{children}</Container> */}
      {children}
      <Footer />
    </>
  );
}

export default layout;
