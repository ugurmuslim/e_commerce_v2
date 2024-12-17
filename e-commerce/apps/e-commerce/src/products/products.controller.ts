import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventPattern } from '@nestjs/microservices';
import { ProductFilterDto } from '../dto/product-filter-dto';
import { CategoryFilterDto } from '../dto/category-filter-dto';
import { BrandFilterDto } from '../dto/brand-filter-dto';
import { AttributesFilterDto } from '../dto/attributes-filter-dto';
import {
  CreateProductRequestDto,
  CurrentUser,
  JwtAuthGuard,
  TRENDYOL_PRODUCT_CREATED,
  UserDto,
} from '@app/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts(
    @CurrentUser() currentUser: UserDto,
    @Query() filter: ProductFilterDto,
  ) {
    return await this.productsService.getProducts(currentUser._id, filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get('show/:barcode')
  async getProduct(@Param('barcode') barcode: string) {
    return await this.productsService.getProduct(barcode);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProducts(
    @CurrentUser() currentUser: UserDto,
    @Body() data: CreateProductRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const products = await this.productsService.createProducts(
      currentUser._id,
      data,
      file,
    );

    return {
      success: true,
      createdProducts: products.length,
    };
  }

  @EventPattern(TRENDYOL_PRODUCT_CREATED)
  async syncProductsWithOtherServices(@Body() data: any) {
    return await this.productsService.createProducts(
      data.ecommerceBrandId,
      data.products,
    );
  }

  @Get('brands')
  async getBrands(@Query() filter: BrandFilterDto) {
    return await this.productsService.getBrands(filter);
  }

  @Get('categories')
  async getCategories(@Query() filter: CategoryFilterDto) {
    return await this.productsService.getCategories(filter);
  }

  @Get('categories/:id')
  async getCategory(@Param('id') id: number) {
    return await this.productsService.getCategory(id);
  }

  @Get('attributes')
  async getAttributes(@Query() filter: AttributesFilterDto) {
    const attributes = await this.productsService.getAttributes(filter);
    return attributes ? attributes.categoryAttributes : [];
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  async getCount(@CurrentUser() currentUser: UserDto) {
    return this.productsService.getCount(currentUser._id);
  }
}
