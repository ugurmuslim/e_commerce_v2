"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import Link from "next/link";
import ProductTable from "@/components/Tables/ProductTable";
import Table from "@/components/Tables/ItemTable";

type products = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  data: {
    id: number;
    name: string;
    price: number;
    stock: number;
    status: string;
  };
};

const listData = [
  {
    columnName: "Görsel",
    columnValueName: "images[0].url",
    columnClass: "col-span-1",
    columnType: "image",
  },
  {
    columnName: "Ürün İsmi",
    columnValueName: "title",
    columnClass: "col-span-2",
  },
  {
    columnName: "Kategori",
    columnValueName: "categoryName",
    columnClass: "col-span-1",
  },
  {
    columnName: "Liste Fiyatı",
    columnValueName: "salePrice",
    columnClass: "col-span-1",
  },
  {
    columnName: "Satış Fiyatı",
    columnValueName: "quantity",
    columnClass: "col-span-1",
  },
  {
    columnName: "Onaylı",
    columnValueName: "rejected",
    columnClass: "col-span-1",
  },
];

const List: React.FC = ({ showCreateButtons }) => {
  return (
    <>
      {showCreateButtons && (
        <div className="mb-10 flex justify-end">
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
      )}
      <Breadcrumb pageName="Ürünler" />
      <div className="flex flex-col gap-10">
        <Table listData={listData} dataName={"products"} />
      </div>
    </>
  );
};

export default List;
