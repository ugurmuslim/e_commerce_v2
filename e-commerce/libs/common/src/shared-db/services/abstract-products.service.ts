import { IRepository } from '@app/common/shared-db/interfaces/IRepository';
import { ProductFilterDto } from '@app/common/dto/product-filter-dto';
import { IProductsService } from '@app/common/shared-db/interfaces/IProductsService';

export abstract class AbstractProductsService<T extends IRepository>
  implements IProductsService
{
  protected abstract readonly productsRepository: T;

  async getProducts(ecommerceBrandId: string, filter: ProductFilterDto) {
    const filterQuery = {
      ...filter,
      ecommerceBrandId: ecommerceBrandId,
    };
    return await this.productsRepository.filter(filterQuery);
  }

  async getProduct(barcode: string) {
    const a = await this.productsRepository.findOne({ barcode: barcode });
    return await this.productsRepository.findOne({ barcode: barcode });
  }

  async getCount(ecommerceBrandId: string) {
    return await this.productsRepository.count({
      ecommerceBrandId: ecommerceBrandId,
    });
  }
}
