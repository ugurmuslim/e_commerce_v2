import { ProductFilterDto } from '@app/common/dto/product-filter-dto';
import { UserDto } from '@app/common';

export interface IProductsController {
  /**
   * Fetches a list of products based on the provided filter and user ID.
   * @param currentUser - The ID of the current user.
   * @param filter - Filters to apply to the product list.
   * @returns A promise resolving to a list of products.
   */
  getProducts(currentUser: UserDto, filter: ProductFilterDto): Promise<any[]>;

  /**
   * Fetches a single product by its barcode.
   * @param barcode - The barcode of the product to fetch.
   * @returns A promise resolving to the product details.
   */
  getProduct(barcode: string): Promise<any>;

  /**
   * Fetches the total count of products for a given user.
   * @param currentUser - The ID of the current user.
   * @returns A promise resolving to the count of products.
   */
  getCount(currentUser: UserDto): Promise<number>;
}
