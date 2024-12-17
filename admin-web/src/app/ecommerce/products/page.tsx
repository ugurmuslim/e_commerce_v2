import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { cookies } from "next/headers";
import List from "@/components/Products/List";
import { mapFilters } from "@/utils/backend-communication";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

async function fetchProducts(searchParams) {
  "use server";
  const jwt =
    (cookies().get("Authentication" as any) as { value: string } | undefined)
      ?.value ?? "";
  let queryString: string | null = "";
  if (searchParams.length > 0) {
    queryString = mapFilters(queryString);
  }

  const productCountResponse = await fetch(
    "http://api-gateway:3000/api/v1/e-commerce/products/count",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwt}`,
      },
      credentials: "include",
    },
  );

  const productsResponse = await fetch(
    `http://api-gateway:3000/api/v1/e-commerce/products?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwt}`,
      },
      credentials: "include",
    },
  );

  const productsCount = await productCountResponse.json();
  const products = await productsResponse.json();
  return {
    productsCount: productsCount.data,
    products: products.data,
  };
}

export default async function Home({ searchParams }) {
  const products = await fetchProducts(searchParams);
  return (
    <>
      <DefaultLayout>
        <List
          productsCount={products.productsCount}
          products={products.products}
        />
      </DefaultLayout>
    </>
  );
}
