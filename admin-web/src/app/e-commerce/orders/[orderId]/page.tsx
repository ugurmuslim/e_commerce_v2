import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ItemShow from "@/components/Items/Show";
import OrderShow from "@/components/Orders/Show";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Home() {
  return (
    <>
      <DefaultLayout>
        <OrderShow />
      </DefaultLayout>
    </>
  );
}
