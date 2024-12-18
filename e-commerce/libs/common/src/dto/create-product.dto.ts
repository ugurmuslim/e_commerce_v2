import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class AttributesDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  name: string;

  @IsOptional()
  customAttributeValue?: string | number;

  @IsOptional()
  attributeValues: {
    id: number;
    name: string;
  };
}

export class CreateProductDto {
  @IsString()
  @IsOptional()
  _id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  barcode?: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsOptional()
  dimensionalWeight: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  currencyType: string;

  @IsNumber()
  @IsNotEmpty()
  listPrice: number;

  @IsNumber()
  @IsNotEmpty()
  salePrice: number;

  @IsNumber()
  @IsNotEmpty()
  vatRate: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];

  @IsArray()
  @Type(() => AttributesDto)
  attributes: AttributesDto[];

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  brandId?: number;
}

export class CreateProductRequestDto {
  @IsArray()
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => CreateProductDto) // Ensure transformation to CreateProductDto
  @IsDefined()
  data: CreateProductDto[];
}
