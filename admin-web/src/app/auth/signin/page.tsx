import React from "react";
import { Metadata } from "next";
import Signin from "@/components/Auth/Signin";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default async function Home() {
  return (
    <DefaultLayout>
      <Signin />
    </DefaultLayout>
  );
}
