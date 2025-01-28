import {
  IsArray,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class OrderSyncDto {
  @IsString()
  orderNumber: string;

  @IsString()
  platform: string;

  @IsString()
  customerLastName: string;

  @IsString()
  customerFirstName: string;

  @IsString()
  customerEmail: string;

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  grossAmount: number;

  @ValidateNested()
  @Type(() => AddressDto)
  shipmentAddress: AddressDto;

  @IsArray()
  @ValidateNested()
  lines: LineItemDto[];
}

class LineItemDto {
  @IsNumber()
  quantity: number;

  @IsString()
  barcode: string;
}

export class OrderSyncRequestDto {
  @IsArray()
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => OrderSyncDto) // Ensure transformation to CreateProductDto
  @IsDefined()
  data: OrderSyncDto[];
}
