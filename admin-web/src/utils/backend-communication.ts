import { EcommerceProductFormData } from "@/utils/formDatas";

const getCookie = (cookieName: string) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
  return cookie ? cookie.split("=")[1] : null;
};

export const mapFilters = (query: any) => {
  const queryParams = query.reduce((acc, item) => {
    for (const key in item) {
      const value = item[key];
      if (Array.isArray(value)) {
        // Represent arrays in `key[]=value` format
        value.forEach((v) => acc.push([`${key}[]`, v]));
      } else {
        acc.push([key, value]);
      }
    }
    return acc;
  }, []);

  return new URLSearchParams(queryParams).toString();
};
export const fetchProducts = async (queryString: string) => {
  return await fetch(
    `http://localhost:3000/api/v1/e-commerce/products?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${getCookie("Authentication")}`,
      },
      credentials: "include",
    },
  );
};

export const postProducts = async (body: {
  data: EcommerceProductFormData[];
}) => {
  return await fetch(`http://localhost:3000/api/v1/e-commerce/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `Authentication=${getCookie("Authentication")}`,
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
};

export const fetchCategories = async (
  queryString = "",
  authentication?: string | null,
) => {
  if (authentication === null) {
    authentication = getCookie("Authentication");
  }
  console.log(11111111111111);
  const response = await fetch(
    `http://localhost:3000/api/v1/e-commerce/categories?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${authentication}`,
      },
      credentials: "include",
    },
  );

  return response;
};

export const fetchCategory = async (
  id: number,
  authentication?: string | null,
) => {
  console.log(22222222222222);
  if (authentication === null) {
    authentication = getCookie("Authentication");
  }
  const response = await fetch(
    `http://localhost:3000/api/v1/e-commerce/categories/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${authentication}`,
      },
      credentials: "include",
    },
  );
  return response;
};

export const fetchBrands = async (
  queryString = "",
  authentication?: string | null,
) => {
  if (authentication === null) {
    authentication = getCookie("Authentication");
  }
  const response = await fetch(
    `http://localhost:3000/api/v1/e-commerce/products/brands?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${authentication}`,
      },
      credentials: "include",
    },
  );
  return response;
};

export const fetchAttributes = async (
  queryString = "",
  authentication?: string | null,
) => {
  if (authentication === null) {
    authentication = getCookie("Authentication");
  }
  const response = await fetch(
    `http://localhost:3000/api/v1/e-commerce/products/attributes?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${authentication}`,
      },
      credentials: "include",
    },
  );
  return response;
};
