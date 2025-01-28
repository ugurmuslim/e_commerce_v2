import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderFilterDto {
  @IsOptional()
  @IsString()
  startedAt?: string;

  @IsOptional()
  @IsString()
  endedAt?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsNumber()
  page?: number;
}
