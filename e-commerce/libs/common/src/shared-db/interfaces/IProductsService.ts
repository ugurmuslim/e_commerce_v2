import { IRepository } from '@app/common/shared-db/interfaces/IRepository';
import { ProductFilterDto } from '@app/common/dto/product-filter-dto';

export interface IProductsService {
  /**
   * Fetches a list of products based on the provided filter and ecommerce brand ID.
   * @param ecommerceBrandId - The ID of the ecommerce brand.
   * @param filter - Filters to apply to the product list.
   * @returns A promise resolving to a list of products.
   */
  getProducts(
    ecommerceBrandId: string,
    filter: ProductFilterDto,
  ): Promise<any[]>;

  /**
   * Fetches a single product by its barcode.
   * @param barcode - The barcode of the product to fetch.
   * @returns A promise resolving to the product details.
   */
  getProduct(barcode: string): Promise<any>;

  /**
   * Fetches the total count of products for a given ecommerce brand.
   * @param ecommerceBrandId - The ID of the ecommerce brand.
   * @returns A promise resolving to the count of products.
   */
  getCount(ecommerceBrandId: string): Promise<number>;
}
