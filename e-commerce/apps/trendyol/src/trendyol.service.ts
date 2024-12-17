import { Injectable } from '@nestjs/common';
import { fetchTrendyol } from './utils/fetch';

@Injectable()
export class TrendyolService {
  constructor() {}

  async getBrands() {
    try {
      return await fetchTrendyol({ url: 'brands' });
    } catch (error) {
      console.error(error);
    }
  }

  async getCategories() {
    try {
      return await fetchTrendyol({ url: 'product-categories' });
    } catch (error) {
      console.error(error);
    }
  }

  async getCategoryAttributes(id: number) {
    try {
      return await fetchTrendyol({
        url: `product-categories/${id}/attributes`,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
