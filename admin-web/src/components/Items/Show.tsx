import React, { useEffect, useRef, useState } from "react";
import { fetchItem, mapFilters } from "@/utils/backend-communication";
import { toast } from "react-toastify";
import { OrderItem, PaginatedData } from "@/utils/dataTypes";
import NestedDetail from "@/components/Items/NestedDetail";

interface ItemProps<T> {
  listData: {
    label: string;
    key: string;
    multiple?: boolean;
  }[];
  dataName: string;
}

const ItemShow: React.FC<ItemProps<OrderItem>> = ({ listData, dataName }) => {
  const platform = window.location.pathname.split("/").filter(Boolean)[0];
  const [item, setItem] = useState<PaginatedData<OrderItem>>();

  const getItem = async () => {
    try {
      const response = await fetchItem(
        "6763cacedf28af86869c2ba9",
        platform,
        dataName,
      );
      // console.log((await response.json()).data);
      setItem((await response.json()).data);
    } catch (error) {
      toast("Error fetching items");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getItem();
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("item", item);
  }, [item]);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Sipariş Detayları</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {item &&
          listData.map((data, index) => (
            <NestedDetail data={data} index={index} item={item} />
          ))}
      </div>
    </div>
  );
};

export default ItemShow;
