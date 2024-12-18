import React from "react";
import { Metadata } from "next";
import Signup from "@/components/Auth/Signup";

const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default async function Home() {
  return (
    <>
      <Signup />
    </>
  );
}
