import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateProductDto } from '@app/common';

export class CreateN11ProductDto extends CreateProductDto {
  @IsNumber()
  cargoCompanyId: number;

  @IsString()
  @IsNotEmpty()
  barcode: string;

  @IsString()
  ecommerceBrandId: string;
}
