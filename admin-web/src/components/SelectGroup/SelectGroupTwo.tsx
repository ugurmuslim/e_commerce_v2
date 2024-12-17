"use client";
import React, { useEffect, useState } from "react";
import {
  fetchBrands,
  fetchCategories,
  fetchCategory,
  mapFilters,
} from "@/utils/backend-communication";
import Select from "react-select";
import { selectStyles } from "@/components/SelectGroup/selectStyles";
import { toast } from "react-toastify";

interface SelectGroupTwoProps {
  type: string;
  handleInputChange: any;
  parentData?: any;
  selectedValue?: any;
}

interface InputValue {
  id: number;
  name: string;
}

const SelectGroupTwo: React.FC<SelectGroupTwoProps> = ({
  type,
  handleInputChange,
  parentData,
  selectedValue,
}) => {
  const [data, setData] = useState<[]>([]);
  const [preSelectedValue, setPreSelectedValue] =
    useState<InputValue>(selectedValue);

  useEffect(() => {
    if (type.includes("attributes")) {
      setData(parentData);
    }
  }, []);

  const selectOption = async (inputValue: InputValue) => {
    const { id } = inputValue;
    setPreSelectedValue(inputValue);
    try {
      switch (type) {
        case "categories":
          const response = await fetchCategory(id);
          const data = await response.json();
          if (data.data.subCategories.length > 0) {
            setData(data.data.subCategories);
          } else {
            setData([]);
          }
          handleInputChange({ target: { name: "categoryId", value: id } });
          break;
        case "brands":
          handleInputChange({ target: { name: "brandId", value: id } });
          break;
        default:
          handleInputChange({
            target: { name: type, value: { ...inputValue, attributeId: id } },
          });
          break;
      }
    } catch (error) {
      toast("Bir hata oluştu. Lütfen tekrar deneyiniz.");
    }
  };

  const loadOptions = async (inputValue: InputValue) => {
    const { name } = inputValue;
    let searchQuery: { id?: number; name: string }[] = [];
    if (name) {
      searchQuery = [{ name: inputValue.name }];
    }
    let response: any;
    try {
      switch (type) {
        case "categories":
          searchQuery = [{ name: inputValue.name }];
          response = await fetchCategories(mapFilters(searchQuery));
          break;
        case "brands":
          searchQuery = [{ name: inputValue.name }];
          response = await fetchBrands(mapFilters(searchQuery));
          break;
      }
      setData((await response.json()).data);
    } catch (error) {
      toast("Bir hata oluştu. Lütfen tekrar deneyiniz.");
    }
  };
  return (
    <div>
      <div className="relative  bg-white dark:bg-form-input">
        <Select
          placeholder="Bir seçim yapınız"
          options={data}
          value={preSelectedValue}
          onChange={(e: any) => selectOption(e)}
          onInputChange={(input, { action }) => {
            if (action === "input-change") {
              loadOptions({ name: input, id: 0 }); // Only trigger for user input
            }
          }}
          getOptionLabel={(e) => e.name}
          getOptionValue={(e) => e.id}
          styles={selectStyles}
        />
      </div>
    </div>
  );
};

export default SelectGroupTwo;
