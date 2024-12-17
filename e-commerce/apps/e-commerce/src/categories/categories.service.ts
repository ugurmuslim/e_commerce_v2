import { Injectable } from '@nestjs/common';
import { SharedAttributesRepository } from '@app/common/shared-db/repositories/shared-attributes.repository';
import { SharedCategoriesRepository } from '@app/common/shared-db/repositories/shared-categories.repository';
import { CategoryFilterDto } from '../dto/category-filter-dto';
import { AttributesFilterDto } from '../dto/attributes-filter-dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly attributesRepository: SharedAttributesRepository,
    private readonly categoriesRepository: SharedCategoriesRepository,
  ) {}

  async getCategories(filterQuery: CategoryFilterDto) {
    const filter: any = {};

    if (filterQuery.name) {
      filter.name = { $regex: new RegExp(filterQuery.name, 'i') }; // Case-insensitive regex
    }

    const categories = await this.categoriesRepository.find(filter);

    return categories;
  }

  async getAttributes(filterQuery: AttributesFilterDto) {
    return await this.attributesRepository.findOne(filterQuery);
  }

  async getCategory(id: number) {
    const category = await this.categoriesRepository.findOne({ id });

    if (!category) {
      return null;
    }

    const subCategories = await this.categoriesRepository.find({
      parentId: category.id,
    });

    return {
      ...category,
      subCategories,
    };
  }
}
