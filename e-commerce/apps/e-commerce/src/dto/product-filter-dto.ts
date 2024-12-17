import {IsNumber, IsOptional, IsString} from "class-validator";

export class ProductFilterDto {

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    barcode?: string;

    @IsOptional()
    @IsNumber()
    page?: number;
}
