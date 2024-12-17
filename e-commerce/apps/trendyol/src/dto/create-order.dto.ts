import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DiscountDetailsDto {
  @IsNumber()
  lineItemPrice: number;

  @IsNumber()
  lineItemDiscount: number;

  @IsNumber()
  lineItemTyDiscount: number;
}

export class FastDeliveryOptionsDto {
  @IsString()
  type: string;
}

export class LineItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  salesCampaignId: number;

  @IsString()
  productSize: string;

  @IsString()
  merchantSku: string;

  @IsString()
  productName: string;

  @IsNumber()
  productCode: number;

  @IsString()
  productOrigin: string;

  @IsNumber()
  merchantId: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  tyDiscount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DiscountDetailsDto)
  discountDetails: DiscountDetailsDto[];

  @IsString()
  currencyCode: string;

  @IsString()
  productColor: string;

  @IsNumber()
  id: number;

  @IsString()
  sku: string;

  @IsNumber()
  vatBaseAmount: number;

  @IsString()
  barcode: string;

  @IsString()
  orderLineItemStatusName: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FastDeliveryOptionsDto)
  fastDeliveryOptions?: FastDeliveryOptionsDto[];
}

export class AddressDto {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  address1: string;

  @IsString()
  @IsOptional()
  address2: string;

  @IsString()
  city: string;

  @IsNumber()
  cityCode: number;

  @IsString()
  district: string;

  @IsNumber()
  districtId: number;

  @IsString()
  postalCode: string;

  @IsString()
  countryCode: string;

  @IsNumber()
  neighborhoodId: number;

  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsString()
  fullAddress: string;

  @IsString()
  fullName: string;
}

export class PackageHistoryDto {
  @IsNumber()
  createdDate: number;

  @IsString()
  status: string;
}

export class CreateTrendyolOrderDto {
  @ValidateNested()
  @Type(() => AddressDto)
  shipmentAddress: AddressDto;

  @IsString()
  orderNumber: string;

  @IsNumber()
  grossAmount: number;

  @IsNumber()
  totalDiscount: number;

  @IsNumber()
  totalTyDiscount: number;

  @IsOptional()
  @IsString()
  taxNumber: string;

  @ValidateNested()
  @Type(() => AddressDto)
  invoiceAddress: AddressDto;

  @IsString()
  customerFirstName: string;

  @IsString()
  customerEmail: string;

  @IsNumber()
  customerId: number;

  @IsString()
  customerLastName: string;

  @IsNumber()
  id: number;

  @IsNumber()
  cargoTrackingNumber: number;

  @IsString()
  cargoProviderName: string;

  @IsString()
  cargoSenderNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  lines: LineItemDto[];

  @IsNumber()
  orderDate: number;

  @IsString()
  tcIdentityNumber: string;

  @IsString()
  currencyCode: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackageHistoryDto)
  packageHistories: PackageHistoryDto[];

  @IsString()
  shipmentPackageStatus: string;

  @IsString()
  status: string;

  @IsNumber()
  whoPays: number;

  @IsString()
  deliveryType: string;

  @IsNumber()
  timeSlotId: number;

  @IsNumber()
  estimatedDeliveryStartDate: number;

  @IsNumber()
  estimatedDeliveryEndDate: number;

  @IsNumber()
  totalPrice: number;

  @IsString()
  deliveryAddressType: string;

  @IsNumber()
  agreedDeliveryDate: number;

  @IsBoolean()
  fastDelivery: boolean;

  @IsNumber()
  originShipmentDate: number;

  @IsNumber()
  lastModifiedDate: number;

  @IsBoolean()
  commercial: boolean;

  @IsString()
  @IsOptional()
  fastDeliveryType: string;

  @IsBoolean()
  deliveredByService: boolean;

  @IsBoolean()
  agreedDeliveryDateExtendible: boolean;

  @IsNumber()
  extendedAgreedDeliveryDate: number;

  @IsNumber()
  agreedDeliveryExtensionEndDate: number;

  @IsNumber()
  agreedDeliveryExtensionStartDate: number;

  @IsNumber()
  warehouseId: number;

  @IsBoolean()
  groupDeal: boolean;

  @IsString()
  @IsOptional()
  invoiceLink: string;

  @IsBoolean()
  micro: boolean;

  @IsBoolean()
  giftBoxRequested: boolean;

  @IsBoolean()
  '3pByTrendyol': boolean;

  @IsBoolean()
  containsDangerousProduct: boolean;
}
