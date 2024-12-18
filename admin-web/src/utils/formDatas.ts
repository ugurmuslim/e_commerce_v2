export enum CurrencyType {
  TRY = "TRY",
}

export interface EcommerceProductFormData {
  title: string;
  description: string;
  barcode: string | null;
  categoryId: number | null;
  brandId: number | null;
  quantity: number;
  listPrice: number;
  salePrice: number;
  images: string[]; // Assuming images are URLs or file names
  attributes: Attributes[]; // You can modify this type based on the structure of attributes
  vatRate?: number;
  dimensionalWeight?: number;
  currencyType?: CurrencyType;
}

export const initialProductFormData = {
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

export interface Attributes {
  id: number;
  name: string;
  allowCustom: boolean;
  attribute: {
    id: number;
    name: string;
  };
  attributeValues: {
    id: number;
    name: string;
  }[];
  categoryId: number;
  required: boolean;
  varianter: boolean;
  slicer: boolean;
}

export interface SignupFormData {
  email: string;
  password: string;
  brandName: string;
  rePassword: string;
}

export const initialSignupFormData = {
  email: "",
  password: "",
  rePassword: "",
  brandName: "",
};
