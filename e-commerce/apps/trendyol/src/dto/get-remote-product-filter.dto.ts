import {
  IsBoolean,
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetRemoteProductFilterDto {
  @IsOptional()
  @IsBoolean()
  approved?: boolean; // Ürün onaylı ya da onaysız kontrolü

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  startDate?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  endDate?: number;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsString()
  dateQueryType?: string;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsNumber()
  supplierId?: number;

  @IsOptional()
  @IsString()
  stockCode?: string;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @IsString()
  productMainId?: string;

  @IsOptional()
  @IsBoolean()
  onSale?: boolean;

  @IsOptional()
  @IsBoolean()
  rejected?: boolean;

  @IsOptional()
  @IsBoolean()
  blacklisted?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  brandIds?: string[];

  @IsOptional()
  @IsBoolean()
  sync?: boolean;
}
