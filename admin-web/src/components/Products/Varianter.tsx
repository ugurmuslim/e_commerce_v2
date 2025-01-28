"use client";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "@/css/custom.css";

const Varianter = () => {
  return (
    <div className="relative grid w-full grid-cols-1 gap-9">
      <div className="w-full rounded-sm border border-stroke bg-white p-6.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mt-10 flex w-full flex-wrap gap-4">
          <div className="flex w-full flex-col sm:w-1/12">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Renk
            </label>
            <input
              type="text"
              name="title"
              placeholder="Ürün İsmi"
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex w-full flex-col sm:w-1/12">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Beden
            </label>
            <input
              type="text"
              name="barcode"
              placeholder="Barkod"
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex w-full flex-col sm:w-1/12">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Barkod
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="Miktar"
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex w-full flex-col sm:w-1/12">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Satış Fiyatı
            </label>
            <input
              type="text"
              name="listPrice"
              placeholder="Liste Fiyatı"
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex w-full flex-col sm:w-1/12">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Stok
            </label>
            <input
              type="text"
              name="salePrice"
              placeholder="Satış Fiyatı"
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex w-full flex-col sm:w-1/12">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              KDV
            </label>
            <input
              type="text"
              name="currencyType"
              placeholder="Para Birimi"
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex w-full flex-col sm:w-1/5">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Stok Kodu
            </label>
            <input
              type="text"
              name="currencyType"
              placeholder="Para Birimi"
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex w-full flex-col sm:w-1/5">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              İşlem
            </label>
            <input
              type="text"
              name="currencyType"
              placeholder="Para Birimi"
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Varianter;
