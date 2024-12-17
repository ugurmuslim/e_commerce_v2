import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrderSyncDto {

  @IsString()
  ecommerceBrandId: string;

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