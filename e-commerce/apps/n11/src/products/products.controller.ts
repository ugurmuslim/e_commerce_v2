import {
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
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
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateTrendyolProductDto } from '../../../trendyol/src/dto/create-trendyol-product.dto';
import { GetRemoteProductsFilterDto } from '../dto/get-remote-product-filter';
import { UpdateProductStockPriceDto } from '../dto/update-stock-price-filter';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
    @Payload() products: CreateTrendyolProductDto[],
  ): Promise<any> {
    return await this.productsService.createRemote(currentBrand, products);
  }

  @EventPattern(SYNC_PRODUCTS_WITH_ECOMMERCE)
  @UsePipes(AcknowledgePipe)
  @UseGuards(BrandSettingsGuard)
  async syncWithEcommerce(
    @CurrentEcommerceBrand() currentEcommerceBrand: BrandSettingsDocument,
    @Payload() products: CreateTrendyolProductDto[],
    @Ctx() context: RmqContext,
  ) {
    return await this.productsService.createProducts(
      currentEcommerceBrand,
      products,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProducts() {
    return this.productsService.getProducts();
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
