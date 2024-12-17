import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Create from "@/components/Products/Create";
import { cookies } from "next/headers";
import { mapFilters } from "@/utils/backend-communication";

export const metadata: Metadata = {
  title: "Ecommerce | Ürün Oluştur",
  description: "Ürün oluştur",
};

export default async function Home() {
  return (
    <>
      <DefaultLayout>
        <Create />
      </DefaultLayout>
    </>
  );
}
