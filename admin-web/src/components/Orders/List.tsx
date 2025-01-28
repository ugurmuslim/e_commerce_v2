"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import Table from "@/components/Tables/ItemTable";

const listData = [
  {
    columnName: "Getiri",
    columnValueName: "grossAmount",
    columnClass: "col-span-2",
  },
  {
    columnName: "Müşteri",
    columnValueName: "customerFirstName",
    columnClass: "col-span-2",
  },
  {
    columnName: "Adres",
    columnValueName: "shipmentAddress.address1",
    columnClass: "col-span-2",
  },
];

const OrderList: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Siparişler" />
      <div className="flex flex-col gap-10">
        <Table listData={listData} dataName={"orders"} />
      </div>
    </>
  );
};

export default OrderList;
