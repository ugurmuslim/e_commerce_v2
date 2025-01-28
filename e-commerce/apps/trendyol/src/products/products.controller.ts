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
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { BrandSettingsGuard } from '@app/common/brand-settings/brand-settings.guard';
import {
  AcknowledgePipe,
  CurrentUser,
  JwtAuthGuard,
  SYNC_PRODUCTS_WITH_ECOMMERCE,
  UserDto,
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
import { ProductFilterDto } from '../../../e-commerce/src/dto/product-filter-dto';
import { AbstractProductsController } from '@app/common/shared-db/controllers/abstract-products.controller';

@Controller('products')
export class ProductsController extends AbstractProductsController<ProductsService> {
  constructor(protected readonly productsService: ProductsService) {
    super();
  }

  @Post('send-to-platforms')
  @UseGuards(BrandSettingsGuard)
  @UseGuards(JwtAuthGuard)
  async sendToPlatforms(
    @CurrentEcommerceBrand() currentEcommerceBrand: BrandSettingsDocument,
    @Body() barcodes: string[],
  ) {
    return await this.productsService.sendToPlatforms(
      currentEcommerceBrand,
      barcodes,
    );
  }

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
}
