"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import Link from "next/link";
import TableTwo from "@/components/Tables/TableTwo";

interface ProductsProps {
    productsCount: number;
    products: products;
}


type products = {
    totalCount: number,
    totalPages: number,
    currentPage: number
    data: {
        id: number,
        name: string,
        price: number,
        stock: number,
        status: string,
    }
}

const List: React.FC<ProductsProps> = ({productsCount, products}) => {
    return (
        <>
            <Breadcrumb pageName="Ürünler"/>
            <div className="flex justify-end mb-10">
                <div className="flex gap-4">
                    <Link
                        href="products/create"
                        className="inline-flex items-center justify-center bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Toplu Oluştur
                    </Link>
                    <Link
                        href="products/create"
                        className="inline-flex items-center justify-center bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Oluştur
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-10">
                <TableTwo products={products}/>
            </div>
        </>
    );
};

export default List;
