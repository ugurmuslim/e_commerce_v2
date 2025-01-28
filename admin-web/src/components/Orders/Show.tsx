"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import Table from "@/components/Tables/ItemTable";
import ItemShow from "@/components/Items/Show";

const listData = [
  {
    label: "Ürünler",
    key: "lines",
    values: [
      {
        label: "Ürün Adı",
        key: "productName",
      },
      {
        label: "Miktar",
        key: "quantity",
      },
      {
        label: "Kampanya ID",
        key: "salesCampaignId",
      },
      {
        label: "Ürün Boyutu",
        key: "productSize",
      },
      {
        label: "Satıcı SKU",
        key: "merchantSku",
      },
      {
        label: "İndirim Detayları",
        key: "discountDetails",
        values: [
          {
            label: "Ürün Fiyatı",
            key: "lineItemPrice",
          },
          {
            label: "Ürün İndirimi",
            key: "lineItemDiscount",
          },
          {
            label: "TY İndirimi",
            key: "lineItemTyDiscount",
          },
          {
            label: "ID",
            key: "_id.$oid",
          },
        ],
        multiple: true,
      },
    ],
    multiple: true, // Indicates this key has multiple items to display
  },
  { label: "Sipariş Numarası", key: "orderNumber" },
  {
    label: "Müşteri Adı ve Soyadı",
    combinedKeys: ["customerFirstName", "customerLastName"], // Combined keys
  },
  {
    label: "Gönderim Adresi ve Şehir",
    combinedKeys: ["shipmentAddress.address1", "shipmentAddress.city"], // Combined keys
  },
  { label: "Müşteri E-posta", key: "customerEmail" },
  { label: "Brüt Tutar", key: "grossAmount" },
  { label: "Toplam Fiyat", key: "totalPrice" },
  { label: "Toplam İndirim", key: "totalDiscount" },
  { label: "Kargo Sağlayıcı", key: "cargoProviderName" },
  { label: "Kargo Takip Numarası", key: "cargoTrackingNumber" },
  { label: "Teslimat Türü", key: "deliveryType" },
  { label: "Teslimat Adres Türü", key: "deliveryAddressType" },
  {
    label: "Tahmini Teslim Başlangıç Tarihi",
    key: "estimatedDeliveryStartDate",
  },
  { label: "Tahmini Teslim Bitiş Tarihi", key: "estimatedDeliveryEndDate" },
  { label: "Fatura Adresi", key: "invoiceAddress.address1" },
  { label: "Hızlı Teslimat", key: "fastDelivery" },
  { label: "Tehlikeli Ürün İçeriyor", key: "containsDangerousProduct" },
  { label: "Sipariş Durumu", key: "status" },
  { label: "Gönderim Paket Durumu", key: "shipmentPackageStatus" },
  { label: "Orijinal Gönderim Tarihi", key: "originShipmentDate" },
  { label: "Anlaşılmış Teslim Tarihi", key: "agreedDeliveryDate" },
  { label: "Grup Anlaşması", key: "groupDeal" },
  { label: "Hediye Kutusu Talebi", key: "giftBoxRequested" },
];

const OrderShow: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Sipariş" />
      <div className="flex flex-col gap-10">
        <ItemShow listData={listData} dataName={"orders"} />
      </div>
    </>
  );
};

export default OrderShow;
