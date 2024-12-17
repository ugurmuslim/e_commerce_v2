import {Metadata} from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Summary from "@/components/Dashboard/Summary";
import {cookies} from "next/headers";

export const metadata: Metadata = {
    title:
        "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Home for TailAdmin Dashboard Template",
};

async function fetchProductsCount() {
    'use server'
    const jwt = (cookies().get('Authentication' as any) as { value: string } | undefined)?.value ?? '';
    const productCountResponse = await fetch(
        'http://api-gateway:3000/api/v1/e-commerce/products/count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Cookie": `Authentication=${jwt}`,
            },
            credentials: 'include',
        },
    );

    const productsResponse = await fetch(
        'http://api-gateway:3000/api/v1/e-commerce/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Cookie": `Authentication=${jwt}`,
            },
            credentials: 'include',
        },
    );

    const orderCountResponse = await fetch(
        'http://api-gateway:3000/api/v1/e-commerce/orders/count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Cookie": `Authentication=${jwt}`,
            },
            credentials: 'include',
        },
    );

    const productsCount = await productCountResponse.json();
    const ordersCount = await orderCountResponse.json();
    const products = await productsResponse.json();

    return {
        productsCount: productsCount,
        ordersCount: ordersCount,
        products: products,
    }

}

export default async function Home() {
    const counts = await fetchProductsCount();
    return (
        <>
            <DefaultLayout>
                <Summary
                    productsCount={counts.productsCount}
                    ordersCount={counts.ordersCount}
                    products={counts.products}
                />
            </DefaultLayout>
        </>
    );
}
