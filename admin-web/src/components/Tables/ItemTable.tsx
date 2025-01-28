import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchItems,
  mapFilters,
  sendToPlatforms,
  syncWithPlatformRemote,
} from "@/utils/backend-communication";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { toast, ToastContainer } from "react-toastify";
import { OrderItem, PaginatedData } from "@/utils/dataTypes";
import "react-toastify/dist/ReactToastify.css";

interface TableProps<T> {
  listData: {
    columnName: string;
    columnValueName: string;
    columnClass: string;
    columnType?: string;
  }[];
  dataName: string;
}

const Table: React.FC<TableProps<OrderItem>> = ({ listData, dataName }) => {
  const [searchQuery, setSearchQuery] = useState<
    Record<string, string | number>[]
  >([]);
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [items, setItems] = useState<PaginatedData<OrderItem>>([]);
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const debounceTimeout = useRef<null | ReturnType<typeof setTimeout>>(null);

  const getItems = async (
    query: Record<string, string | number>[],
    platform: string,
  ) => {
    try {
      const queryString = mapFilters(query);
      const response = await fetchItems(queryString, platform, dataName);
      setItems((await response.json()).data);
      router.push(`?${queryString}`);
    } catch (error) {
      console.log(error);
      toast("Error fetching items");
    }
  };

  useEffect(() => {
    const platform = window.location.pathname.split("/").filter(Boolean)[0];
    getItems(searchQuery, platform);
  }, []);

  useEffect(() => {
    const platform = window.location.pathname.split("/").filter(Boolean)[0];
    if (searchQuery.length > 0) {
      getItems(searchQuery, platform);
    }
  }, [searchQuery]);

  // Debounce search query handling
  useEffect(() => {
    const platform = window.location.pathname.split("/").filter(Boolean)[0];
    if (keystrokeCount >= 4) {
      getItems(searchQuery, platform);
      setKeystrokeCount(0); // Reset keystroke count after request
    }
  }, [keystrokeCount, searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery((_prevQuery) => [{ title: value }]);
    setKeystrokeCount((prev) => prev + 1);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setKeystrokeCount((prev) => prev + 1); // Triggers fetch after a pause in typing
    }, 500); // Delay for 500ms (you can adjust this)
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchQuery((prevQuery) => [
      ...prevQuery.filter((item) => item.title), // Keep the title value
      { page: page }, // Add page value
    ]);
  };

  const handleCheckboxChange = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const isAllSelected =
    items?.data?.length > 0 && selectedItems.length === items?.data?.length;

  const isItemSelected = (itemId: number) => selectedItems.includes(itemId);

  const handleBulkAction = async () => {
    try {
      const platform = window.location.pathname.split("/").filter(Boolean)[0];

      const response = await sendToPlatforms(
        isAllSelected ? [] : selectedItems,
        platform,
        dataName,
      );

      if (response.status === 200) {
        toast.success("Ürünler eşleştiriliyor");
      }
    } catch (error) {
      toast.error("Error sending items to platforms");
    }
  };

  const handleSyncRemote = async () => {
    try {
      const platform = window.location.pathname.split("/").filter(Boolean)[0];
      syncWithPlatformRemote(platform, dataName);
      toast.success("Ürünler güncelleniyor");
    } catch (error) {
      toast.error("Error sending items to platforms");
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(items?.data.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  return (
    <>
      <ToastContainer />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Top {dataName}
          </h4>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              onChange={handleSelectAll}
              checked={isAllSelected}
            />
            <span className="text-md font-medium">Hepsini seç</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-4 py-4">
              <button
                className="inline-flex items-center justify-center bg-primary px-4 py-2 text-center text-xs font-medium text-white hover:bg-opacity-90 sm:px-6 sm:py-2"
                onClick={handleBulkAction}
                disabled={selectedItems.length === 0}
              >
                {isAllSelected
                  ? "Bütün ürünleri platformlara gönder"
                  : selectedItems.length > 0
                    ? "Seçilen ürünleri platformlara gönder"
                    : "Platformlara gönder"}
              </button>
            </div>
            <div className="px-4 py-4">
              <button
                className="inline-flex items-center justify-center bg-primary px-4 py-2 text-center text-xs font-medium text-white hover:bg-opacity-90 sm:px-6 sm:py-2"
                onClick={handleSyncRemote}
              >
                Ürünleri platformdan çek
              </button>
            </div>
            {/* Category Dropdown */}
            <SelectGroupTwo type="categories"></SelectGroupTwo>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search products..."
              className="rounded-md border px-4 py-2"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex w-3 items-center">
            <p className="font-medium">Seçim</p>
          </div>
          {listData.map((data, key) => (
            <React.Fragment key={key}>
              <div className={data.columnClass + " flex items-center"}>
                <p className="font-medium">{data.columnName}</p>
              </div>
            </React.Fragment>
          ))}
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Aksiyon</p>
          </div>
        </div>

        {items &&
          items?.data?.map((item, key) => (
            <div
              className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
              key={key}
            >
              <div className="col-span-1 flex items-center ">
                <input
                  type="checkbox"
                  checked={isItemSelected(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              {listData.map((data, key) => (
                <React.Fragment key={key}>
                  <div className={data.columnClass + " flex items-center"}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      {data.columnType === "image" ? (
                        <>
                          <img
                            src={
                              data.columnValueName
                                .split(/\.|\[|\]/)
                                .filter(Boolean)
                                .reduce((obj, key) => obj?.[key], item) || "N/A"
                            }
                            width={60}
                            height={50}
                            alt="Product"
                          />
                        </>
                      ) : (
                        <p className="text-sm text-black dark:text-white">
                          {data.columnValueName
                            .split(/\.|\[|\]/)
                            .filter(Boolean)
                            .reduce((obj, key) => obj?.[key], item) || "N/A"}
                        </p>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
              <div className="col-span-1 flex items-center gap-2">
                <Link
                  href={`${dataName}/${item.barcode ? item.barcode : item._id}`}
                  className="inline-flex items-center justify-center bg-primary px-4 py-2 text-center text-xs font-medium text-white hover:bg-opacity-90 sm:px-6 sm:py-2"
                >
                  Görüntüle
                </Link>
              </div>
            </div>
          ))}

        {/* Pagination Controls */}
        <div className="flex justify-center py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 rounded-lg bg-gray-200 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${items?.totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === items?.totalPages}
            className="mx-2 rounded-lg bg-gray-200 px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
