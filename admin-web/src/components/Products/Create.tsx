"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import React, { useEffect, useState } from "react";
import {
  Attributes,
  CurrencyType,
  EcommerceProductFormData,
} from "@/utils/formDatas";
import {
  fetchAttributes,
  mapFilters,
  postProducts,
} from "@/utils/backend-communication";
import FileUpload from "@/components/FileUpload";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ProductCreateValidationSchema,
  validateForm,
} from "@/utils/FormValidations";
import "@/css/custom.css";

const initialFormData = {
  title: "",
  barcode: null,
  description: "",
  categoryId: null,
  brandId: null,
  quantity: 2,
  listPrice: 20,
  salePrice: 30,
  images: [],
  attributes: [],
  vatRate: 20,
  dimensionalWeight: 0,
  currencyType: CurrencyType.TRY,
};

interface Errors {
  title: string;
  description: string;
  barcode: string;
  categoryId: string;
  brandId: string;
  quantity: string;
  listPrice: string;
  salePrice: string;
  vatRate: string;
  dimensionalWeight: string;
  currencyType: string;
}

const Create = (product: { product: EcommerceProductFormData }) => {
  const [formData, setFormData] = useState<EcommerceProductFormData>(
    product.product ?? initialFormData,
  );
  const [errors, setErrors] = useState<Errors>({});
  const [attributes, setAttributes] = useState<Attributes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!formData.categoryId) {
        return;
      }
      try {
        const searchQuery = [{ id: formData.categoryId }];
        const response = await fetchAttributes(mapFilters(searchQuery));
        const attributes = await response.json();
        setAttributes(attributes.data);
      } catch (error) {
        toast.error(`Kategori özellikleri alınamadı`);
      }
    };
    fetchData();
  }, [formData.categoryId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let { name, value } = e.target;
    if (name.includes("attributes")) {
      const splitName = name.split(".");
      const attributeName = splitName[1]; // Get the name of the attribute
      const attributeId = Number(splitName[2]); // Get the name of the attribute
      const attributeIndex = formData.attributes.findIndex(
        (attr) => attr.name === attributeName,
      );

      if (attributeIndex !== -1) {
        const updatedAttributes = [...formData.attributes];
        updatedAttributes[attributeIndex] = {
          name: attributeName,
          id: attributeId,
          attributeValues: value,
        };
        formData.attributes = updatedAttributes;
      } else {
        formData.attributes.push({
          name: attributeName,
          id: attributeId,
          attributeValues: value,
        });
      }

      value = formData.attributes; // Update the value with the updated attributes array
      name = "attributes";
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        !(await validateForm(
          formData,
          ProductCreateValidationSchema,
          setErrors,
        ))
      ) {
        return;
      }
      const response = await postProducts({ data: [formData] });
      const data = await response.json();
      if (data.success) {
        setFormData(initialFormData);
        toast.success("Product created successfully!");
      } else {
        toast.error(
          `${data.message}  Failed to create product. Please try again.`,
        );
      }
    } catch (error) {
      toast.error(`An unexpected error occurred. ${error.message}`);
    }
  };
  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Ürün Oluştur" />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9 ">
            <div className="rounded-sm border border-stroke bg-white p-6.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Ürün ismi
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    onChange={handleInputChange}
                    value={formData.title}
                    placeholder="Ürün ismi"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.title && (
                    <div className="error-message">{errors.title}</div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Barkod
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="barcode"
                    onChange={handleInputChange}
                    value={formData.barcode}
                    placeholder="Barkod"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {errors.barcode && (
                  <div className="error-message">{errors.barcode}</div>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Kategori
                </label>
                <div className="relative">
                  <SelectGroupTwo
                    type={"categories"}
                    handleInputChange={handleInputChange}
                    selectedValue={{
                      id: formData.categoryId,
                      name: formData.categoryName,
                    }}
                  />
                </div>
                {errors.categoryId && (
                  <div className="error-message">{errors.categoryId}</div>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Marka
                </label>
                <div className="relative">
                  <SelectGroupTwo
                    type={"brands"}
                    handleInputChange={handleInputChange}
                    selectedValue={{
                      id: formData.brandId,
                      name: formData.brandName,
                    }}
                  ></SelectGroupTwo>
                </div>
                {errors.brandId && (
                  <div className="error-message">{errors.brandId}</div>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Miktar
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="quantity"
                    onChange={handleInputChange}
                    value={formData.quantity}
                    placeholder="Ürün ismi"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {errors.quantity && (
                  <div className="error-message">{errors.quantity}</div>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Liste Fiyatı
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="listPrice"
                    onChange={handleInputChange}
                    value={formData.listPrice}
                    placeholder="Liste Fiyatı"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {errors.listPrice && (
                  <div className="error-message">{errors.listPrice}</div>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Satış Fiyatı
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="salePrice"
                    onChange={handleInputChange}
                    value={formData.salePrice}
                    placeholder="Satış Fiyatı"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {errors.salePrice && (
                  <div className="error-message">{errors.salePrice}</div>
                )}
              </div>
              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Para Birimi
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="currencyType"
                    onChange={handleInputChange}
                    value={formData.currencyType}
                    placeholder="Currency Type"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {errors.currencyType && (
                  <div className="error-message">{errors.currencyType}</div>
                )}
              </div>
            </div>
            {/* <!-- File upload --> */}
          </div>

          <div className="flex flex-col gap-9">
            {/* <!-- Textarea Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Açıklama
                  </label>
                  <textarea
                    rows={6}
                    name="description"
                    onChange={handleInputChange}
                    value={formData.description}
                    placeholder="Ürün hakkkında açıklama yazınız"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                  {errors.description && (
                    <div className="error-message">{errors.description}</div>
                  )}
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    KDV
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="vatRate"
                      onChange={handleInputChange}
                      value={formData.vatRate}
                      placeholder="KDV"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.vatRate && (
                    <div className="error-message">{errors.vatRate}</div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Ağırlık
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="dimensionalWeight"
                      onChange={handleInputChange}
                      value={formData.dimensionalWeight}
                      placeholder="Ağırlık"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.dimensionalWeight && (
                    <div className="error-message">
                      {errors.dimensionalWeight}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <FileUpload />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {attributes?.map((attribute, key) =>
            !attribute.allowCustom ? (
              <div key={key}>
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  {attribute.attribute.name}
                </label>
                <SelectGroupTwo
                  type={`attributes.${attribute.attribute.name}.${attribute.attribute.id}`}
                  handleInputChange={handleInputChange}
                  parentData={
                    Array.isArray(attribute.attributeValues)
                      ? attribute.attributeValues
                      : []
                  }
                  selectedValue={
                    formData.attributes.find(
                      (attr) => attr.id == attribute.attribute.id,
                    ) && {
                      id: formData.attributes.find(
                        (attr) => attr.id == attribute.attribute.id,
                      )?.value.id,
                      name: formData.attributes.find(
                        (attr) => attr.id == attribute.attribute.id,
                      )?.value.name,
                    }
                  }
                />
              </div>
            ) : (
              <div key={key}>
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  {attribute.attribute.name}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name={`attributes.${attribute.attribute.name}.${attribute.attribute.id}`}
                    onChange={handleInputChange}
                    value={
                      formData.attributes.find(
                        (attr) => attr.id == attribute.attribute.id,
                      )?.value
                    }
                    placeholder={attribute.attribute.name}
                    required={attribute.required}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            ),
          )}
        </div>
        <div className="mt-10">
          <input
            type="submit"
            value="Oluştur"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </>
  );
};

export default Create;
