import {
  IsOptional,
  IsString,
  IsInt,
  IsArray,
  IsEnum,
  IsNumber, IsBoolean,
} from 'class-validator';

export class GetRemoteProductsFilterDto {
  @IsOptional()
  @IsNumber()
  id?: number; // N11 Ürün Kodu ile listeleme

  @IsOptional()
  @IsString()
  productMainId?: string; // Ürün grup kodu ile listeleme

  @IsOptional()
  @IsString()
  stockCode?: string; // Satıcı ürün kodu ile listeleme

  @IsOptional()
  @IsEnum(['On_Sale', 'Out_Of_Stock'])
  saleStatus?: 'On_Sale' | 'Out_Of_Stock'; // Ürün satış durumu

  @IsOptional()
  @IsEnum([
    'Active',
    'InCatalogApproval',
    'Suspended',
    'CatalogRejected',
    'Prohibited',
    'Unlisted'
  ])
  productStatus?:
    | 'Active'
    | 'InCatalogApproval'
    | 'Suspended'
    | 'CatalogRejected'
    | 'Prohibited'
    | 'Unlisted'; // Ürün onay durumu

  @IsOptional()
  @IsString()
  brandName?: string; // Marka ismi ile listeleme

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds?: number[]; // Kategori ID bilgisi ile listeleme

  @IsOptional()
  @IsInt()
  page?: number; // Varsayılan 0

  @IsOptional()
  @IsInt()
  size?: number; // Varsayılan 20 maksimum 250

  @IsOptional()
  @IsBoolean()
  sync?: boolean;
}
