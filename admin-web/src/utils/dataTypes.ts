export enum CurrencyType {
  TRY = "TRY",
}

export interface EcommerceProductFormData {
  title: string;
  description: string;
  barcode: string | null;
  categoryId: number | null;
  categoryName?: string;
  brandId: number | null;
  quantity: number;
  listPrice: number;
  salePrice: number;
  attributes: Attributes[]; // You can modify this type based on the structure of attributes
  vatRate?: number;
  dimensionalWeight?: number;
  currencyType?: CurrencyType;
  images: { url: string }[];
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
  attributeId: number;
  attributeName: string;
  attributeValue: string;
  attributeValueId: number;
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

interface Address {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2?: string;
  city: string;
  cityCode: number;
  country: string;
  countryCode: string;
  phone: string;
  zipCode: string;
}

interface PackageHistory {
  status: string;
  date: number;
}

interface LineItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
}

export interface OrderItem {
  agreedDeliveryDate: number;
  cargoProviderName: string;
  cargoTrackingNumber: string;
  commercial: boolean;
  containsDangerousProduct: boolean;
  customerEmail: string;
  customerFirstName: string;
  customerId: number;
  customerLastName: string;
  deliveryAddressType: string;
  deliveryType: string;
  estimatedDeliveryEndDate: number;
  estimatedDeliveryStartDate: number;
  fastDelivery: boolean;
  giftBoxRequested: boolean;
  grossAmount: number;
  groupDeal: boolean;
  id: number;
  invoiceAddress: Address;
  lastModifiedDate: number;
  lines: LineItem[];
  orderNumber: string;
  originShipmentDate: number;
  packageHistories: PackageHistory[];
  shipmentAddress: Address;
  shipmentPackageStatus: string;
  status: string;
  totalDiscount: number;
  totalPrice: number;
  totalTyDiscount: number;
  warehouseId: number;
}

export interface PaginatedData<T> {
  currentPage: number;
  data: T[];
  totalCount: number;
  totalPages: number;
}
