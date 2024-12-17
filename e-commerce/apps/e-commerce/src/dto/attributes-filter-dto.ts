import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class AttributesFilterDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  categoryAttributesNotEmpty?: boolean;
}
