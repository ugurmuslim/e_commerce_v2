import { IsString, IsOptional, IsInt, IsBoolean, IsEnum, MaxLength, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  integrator: string; // Required field for the integrator's name

  @IsString()
  stockCode: string; // Required unique stock code for the product

  @IsOptional()
  @IsString()
  @IsEnum(['Active', 'Suspended'])
  status?: string; // Optional, product status (Active or Suspended)

  @IsOptional()
  @IsInt()
  preparingDay?: number; // Optional, must be greater than 0

  @IsOptional()
  @IsString()
  shipmentTemplate?: string; // Optional, delivery template name

  @IsOptional()
  @IsString()
  @IsEnum(['TL', 'USD', 'EUR'])
  currencyType?: string; // Optional, product price currency

  @IsOptional()
  @IsBoolean()
  deleteProductMainId?: boolean; // Optional, true if you want to delete productMainId

  @IsOptional()
  @IsString()
  productMainId?: string; // Optional, the main product ID

  @IsOptional()
  @IsBoolean()
  deleteMaxPurchaseQuantity?: boolean; // Optional, true if you want to delete maxPurchaseQuantity

  @IsOptional()
  @IsInt()
  maxPurchaseQuantity?: number; // Optional, maximum quantity allowed for purchase

  @IsOptional()
  @IsString()
  @MaxLength(30000)
  description?: string; // Optional, product description

  @IsInt()
  vatRate: number; // Required, VAT rate (0, 1, 10, 20)
}
