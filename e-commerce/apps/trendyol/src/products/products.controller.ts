import {
  Controller,
  Get,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { BrandSettingsGuard } from '@app/common/brand-settings/brand-settings.guard';
import {
  AcknowledgePipe,
  JwtAuthGuard,
  SYNC_PRODUCTS_WITH_ECOMMERCE,
} from '@app/common';
import { CurrentEcommerceBrand } from '@app/common/decorators/current-ecommerce-brand.decorator';
import { BrandSettingsDocument } from '@app/common/brand-settings/models/brand-settings.schema';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateTrendyolProductDto } from '../dto/create-trendyol-product.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { GetRemoteProductFilterDto } from '../dto/get-remote-product-filter.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('remote')
  @UseGuards(BrandSettingsGuard)
  @UseGuards(JwtAuthGuard)
  async getRemote(
    @CurrentEcommerceBrand() currentBrand: BrandSettingsDocument,
    @Query() filter: GetRemoteProductFilterDto,
  ) {
    return await this.productsService.getRemote(currentBrand, filter);
  }

  @MessagePattern(SYNC_PRODUCTS_WITH_ECOMMERCE)
  @UsePipes(AcknowledgePipe)
  @UseGuards(BrandSettingsGuard)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @Post('remote')
  @UseGuards(BrandSettingsGuard)
  @UseGuards(JwtAuthGuard)
  async createRemote(
    @CurrentEcommerceBrand() currentBrand: BrandSettingsDocument,
    @Payload() products: CreateTrendyolProductDto[],
  ): Promise<any> {
    return await this.productsService.createRemote(currentBrand, products);
  }

  @Put('remote')
  @UseGuards(BrandSettingsGuard)
  @UseGuards(JwtAuthGuard)
  async updateRemote(
    @CurrentEcommerceBrand() currentBrand: BrandSettingsDocument,
    @Payload() products: UpdateProductDto[],
  ): Promise<any> {
    return await this.productsService.updateProduct(currentBrand, products);
  }

  async syncWithEcommerce(
    @CurrentEcommerceBrand() currentEcommerceBrand: BrandSettingsDocument,
    @Body() data: CreateTrendyolProductDto[],
    @Ctx() context: RmqContext,
  ) {
    const validationErrors = await validate(
      plainToClass(CreateTrendyolProductDto, data),
    );

    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${JSON.stringify(validationErrors)}`);
    }

    await this.productsService.createProducts(currentEcommerceBrand, data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProducts() {
    return this.productsService.getProducts();
  }
}
