import { Get, Param, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { ProductFilterDto } from '@app/common/dto/product-filter-dto';
import { IProductsController } from '@app/common/shared-db/interfaces/IProductsContoller';
import { IProductsService } from '@app/common/shared-db/interfaces/IProductsService';

export abstract class AbstractProductsController<T extends IProductsService>
  implements IProductsController
{
  protected abstract readonly productsService: T;

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

  @Get('count')
  @UseGuards(JwtAuthGuard)
  async getCount(@CurrentUser() currentUser: UserDto) {
    return this.productsService.getCount(currentUser._id);
  }
}
