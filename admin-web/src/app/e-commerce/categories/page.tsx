import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { cookies } from "next/headers";
import List from "@/components/Products/List";
import { mapFilters } from "@/utils/backend-communication";
import Align from "@/components/Categories/Align";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Home() {
  return (
    <>
      <DefaultLayout>
        <Align />
      </DefaultLayout>
    </>
  );
}
