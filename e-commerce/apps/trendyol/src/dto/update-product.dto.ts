import { IsString, IsNumber, IsArray, IsOptional, IsInt, IsUrl, MaxLength, IsEnum } from 'class-validator';

class ImageDto {
  @IsUrl()
  @MaxLength(2000)
  url: string;
}

class AttributeDto {
  @IsString()
  @MaxLength(50)
  attributeName: string;

  @IsString()
  @MaxLength(50)
  attributeValue: string;
}

export class UpdateProductDto {
  @IsString()
  @MaxLength(40)
  barcode: string;

  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(40)
  productMainId: string;

  @IsInt()
  brandId: number;

  @IsInt()
  categoryId: number;

  @IsInt()
  quantity: number;

  @IsString()
  @MaxLength(100)
  stockCode: string;

  @IsNumber()
  dimensionalWeight: number;

  @IsString()
  @MaxLength(30000)
  description: string;

  @IsString()
  currencyType: string;

  @IsNumber()
  listPrice: number;

  @IsNumber()
  salePrice: number;

  @IsInt()
  cargoCompanyId: number;

  @IsOptional()
  @IsInt()
  deliveryDuration?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  deliveryOption?: string;

  @IsArray()
  @IsOptional()
  images?: ImageDto[];

  @IsInt()
  vatRate: number;

  @IsOptional()
  @IsInt()
  shipmentAddressId?: number;

  @IsOptional()
  @IsInt()
  returningAddressId?: number;

  @IsArray()
  @IsOptional()
  attributes?: AttributeDto[];
}
