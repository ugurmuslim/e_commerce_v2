import { IsString, IsNumber } from 'class-validator';

export class UpdateProductStockPriceDto {
  @IsString()
  _id: string;

  @IsString()
  stockCode: string;

  @IsNumber()
  listPrice: number;

  @IsNumber()
  salePrice: number;

  @IsNumber()
  quantity: number;

  @IsString()
  currencyType: string;
}
