import {
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  Query,
  Put,
  Body,
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
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { GetRemoteProductsFilterDto } from '../dto/get-remote-product-filter';
import { UpdateProductStockPriceDto } from '../dto/update-stock-price-filter';
import { CreateN11ProductDto } from '../dto/create-n11-product.dto';
import { AbstractProductsController } from '@app/common/shared-db/controllers/abstract-products.controller';

@Controller('products')
export class ProductsController extends AbstractProductsController<ProductsService> {
  constructor(protected readonly productsService: ProductsService) {
    super();
  }

  @Get('remote')
  @UseGuards(BrandSettingsGuard)
  @UseGuards(JwtAuthGuard)
  async getRemote(
    @CurrentEcommerceBrand() currentBrand: BrandSettingsDocument,
    @Query() filter: GetRemoteProductsFilterDto,
  ): Promise<any> {
    return await this.productsService.getRemote(currentBrand, filter);
  }

  @Post('remote')
  @UseGuards(BrandSettingsGuard)
  @UseGuards(JwtAuthGuard)
  async createRemote(
    @CurrentEcommerceBrand() currentBrand: BrandSettingsDocument,
    @Payload() products: CreateN11ProductDto[],
  ): Promise<any> {
    return await this.productsService.createRemote(currentBrand, products);
  }

  @EventPattern(SYNC_PRODUCTS_WITH_ECOMMERCE)
  @UsePipes(AcknowledgePipe)
  @UseGuards(BrandSettingsGuard)
  async syncWithEcommerce(
    @CurrentEcommerceBrand() currentEcommerceBrand: BrandSettingsDocument,
    @Payload() products: CreateN11ProductDto[],
    @Ctx() context: RmqContext,
  ) {
    return await this.productsService.createProducts(
      currentEcommerceBrand,
      products,
    );
  }

  @Post('send-to-platforms')
  @UsePipes(AcknowledgePipe)
  @UseGuards(BrandSettingsGuard)
  async sendToPlatforms(
    @CurrentEcommerceBrand() currentEcommerceBrand: BrandSettingsDocument,
    @Body() barcodes: string[],
  ) {
    return await this.productsService.sendToPlatforms(
      currentEcommerceBrand,
      barcodes,
    );
  }

  @Put(':id')
  @UseGuards(BrandSettingsGuard)
  @UseGuards(JwtAuthGuard)
  async updateStockPrice(
    @CurrentEcommerceBrand() ecommerceBrand: BrandSettingsDocument,
    @Payload() product: UpdateProductStockPriceDto,
  ) {
    return this.productsService.updateProduct(ecommerceBrand, product);
  }
}
