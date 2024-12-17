import { IsArray, IsOptional, IsString } from 'class-validator';

export class CategoryFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  ids?: number[];
}
