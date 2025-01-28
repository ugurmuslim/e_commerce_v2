import { EcommerceProductFormData } from "@/utils/dataTypes";

const getCookie = (cookieName: string) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
  return cookie ? cookie.split("=")[1] : null;
};

export const mapFilters = (query: Record<string, string>[]) => {
  const queryParams = query.reduce((acc: [string, string][], item) => {
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

export const fetchUser = async (authentication?: string | null) => {
  if (!authentication) {
    authentication = getCookie("Authentication");
  }

  const response = await fetch(`http://localhost:3000/api/v1/e-commerce/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `Authentication=${authentication}`,
    },
    credentials: "include",
  });
  return response;
};

export const fetchOrders = async (queryString: string, platform: string) => {
  return await fetch(
    `http://localhost:3000/api/v1/${platform}/orders?${queryString}`,
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

export const fetchItems = async (
  queryString: string,
  platform: string,
  type: string,
) => {
  console.log(
    111,
    `http://localhost:3000/api/v1/${platform}/${type}?${queryString}`,
  );
  return await fetch(
    `http://localhost:3000/api/v1/${platform}/${type}?${queryString}`,
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

export const fetchItem = async (id: string, platform: string, type: string) => {
  console.log(`http://localhost:3000/api/v1/${platform}/${type}/${id}`);
  return await fetch(`http://localhost:3000/api/v1/${platform}/${type}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `Authentication=${getCookie("Authentication")}`,
    },
    credentials: "include",
  });
};

export const sendToPlatforms = async (body, platform: string, type: string) => {
  return await fetch(
    `http://localhost:3000/api/v1/${platform}/${type}/send-to-platforms`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${getCookie("Authentication")}`,
      },
      body: JSON.stringify(body),

      credentials: "include",
    },
  );
};

export const syncWithPlatformRemote = async (
  platform: string,
  type: string,
) => {
  return await fetch(
    `http://localhost:3000/api/v1/${platform}/${type}/remote?sync=true`,
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
