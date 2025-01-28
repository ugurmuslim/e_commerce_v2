import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Create from "@/components/Products/Create";
import { cookies } from "next/headers";
import { EcommerceProductFormData } from "@/utils/dataTypes";

export const metadata: Metadata = {
  title: "Ecommerce | Ürün Güncelleme",
  description: "Ürün Güncelleme",
};

async function fetchProduct(barcode: string) {
  "use server";
  const jwt =
    (cookies().get("Authentication" as any) as { value: string } | undefined)
      ?.value ?? "";

  const productsResponse = await fetch(
    `http://api-gateway:3000/api/v1/e-commerce/products/show/${barcode}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwt}`,
      },
      credentials: "include",
    },
  );

  const product = await productsResponse.json();

  return product.data;
}

export default async function Home(data: { params: any }) {
  const product: EcommerceProductFormData = await fetchProduct(
    data.params.barcode,
  );

  return (
    <>
      <DefaultLayout>
        <Create product={product} />
      </DefaultLayout>
    </>
  );
}
