import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProducts, mapFilters } from "@/utils/backend-communication";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { toast } from "react-toastify";

interface TableProps {
  products: products;
}

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

const TableTwo = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [updatedProducts, setProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(products.currentPage);
  const router = useRouter();
  const debounceTimeout = useRef<null | number>(null);
  console.log(products);
  const getProducts = async (query) => {
    try {
      const queryString = mapFilters(query);
      const response = await fetchProducts(queryString);
      setProducts((await response.json()).data);
      router.push(`?${queryString}`);
    } catch (error) {
      toast("Error fetching products");
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      getProducts(searchQuery);
    }
  }, [searchQuery]);

  // Debounce search query handling
  useEffect(() => {
    if (keystrokeCount >= 4) {
      getProducts(searchQuery);
      setKeystrokeCount(0); // Reset keystroke count after request
    }
  }, [keystrokeCount, searchQuery]);

  const handleInputChange = (e) => {
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

  const handlePageChange = (page) => {
    console.log(searchQuery.find((s) => s.title));
    setCurrentPage(page);
    setSearchQuery((prevQuery) => [
      ...prevQuery.filter((item) => item.title), // Keep the title value
      { page: page }, // Add page value
    ]);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
        <div className="flex items-center space-x-4">
          {/* Category Dropdown */}
          <SelectGroupTwo type="categories"></SelectGroupTwo>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            className="rounded-md border px-4 py-2"
            value={searchQuery.title}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Ürün İsmi</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Kategori</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Liste Fiyat</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Satış Fiyatı</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Aksiyon</p>
        </div>
      </div>

      {updatedProducts?.data?.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img
                  src={product.images[0]?.url}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.title}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.categoryName}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.salePrice} {product.currencyType}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.quantity} {product.currencyType}
            </p>
          </div>
          <div className="col-span-1 flex items-center gap-2">
            <Link
              href={`products/create/${product.barcode}`}
              className="inline-flex items-center justify-center bg-primary px-4 py-2 text-center text-xs font-medium text-white hover:bg-opacity-90 sm:px-6 sm:py-2"
            >
              Değiştir
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
        <span className="px-4 py-2">{`Page ${currentPage} of ${updatedProducts.totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === updatedProducts.totalPages}
          className="mx-2 rounded-lg bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableTwo;