import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import React from "react";

const Align = () => {
  return (
    <div>
      <h2>Ecommerce / Trendyol</h2>

      <SelectGroupTwo type={"categories"} />

      <h2>Trendyol</h2>

      <SelectGroupTwo type={"categories"} />
    </div>
  );
};

export default Align;
