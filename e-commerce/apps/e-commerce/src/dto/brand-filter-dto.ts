import {IsNumber, IsOptional, IsString} from "class-validator";

export class BrandFilterDto {

    @IsOptional()
    @IsString()
    name?: string;
}
