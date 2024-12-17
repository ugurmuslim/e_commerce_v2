import { Injectable } from '@nestjs/common';
import { fetchN11 } from './utils/fetch';
import { BrandSettingsDocument } from '@app/common/brand-settings/models/brand-settings.schema';
import { CategoriesRepository } from './repositories/categories.repository';
import { AttributesRepository } from './repositories/attributes.repository';
import { SharedCategoriesRepository } from '@app/common/shared-db/repositories/shared-categories.repository';

@Injectable()
export class N11Service {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly attributesRepository: AttributesRepository,
    private readonly sharedCategoriesRepository: SharedCategoriesRepository,
  ) {}

  async getCategories(currentBrand: BrandSettingsDocument) {
    const categories = await fetchN11({
      url: 'cdn/categories',
      auth: currentBrand.apiKey,
    });

    for (const category of categories.categories) {
      await this.categoriesRepository.create(category);
    }
  }

  async getAttributes(currentBrand: BrandSettingsDocument) {
    const categories = await this.categoriesRepository.find({});

    await this.nestedAttributes(categories, currentBrand);
  }

  async nestedAttributes(categories, currentBrand) {
    for (const category of categories) {
      const attributes = await fetchN11({
        url: `cdn/category/${category.id}/attribute`,
        auth: currentBrand.apiKey,
      });
      if (category.name == 'Mayo' || category.id == 1000490) {
        console.log('attributes', attributes);
      }

      const mappedAttributes = attributes.categoryAttributes?.map(
        (attribute) => {
          return {
            allowCustom: attribute.isCustomValue,
            attribute: {
              id: attribute.attributeId,
              name: attribute.attributeName,
            },
            attributeValues: attribute.attributeValues.slice(0, 500),
            categoryId: category.id,
            required: attribute.isMandatory,
            varianter: attribute.isVariant,
            slicer: attribute.isSlicer,
            attributeOrder: attribute.attributeOrder,
          };
        },
      );

      await this.attributesRepository.create({
        id: category.id,
        name: category.name,
        displayName: category.name,
        categoryAttributes: mappedAttributes,
      });
      if (category.subCategories?.length > 0) {
        await this.nestedAttributes(category.subCategories, currentBrand);
      }
    }
  }

  async categoryAssociation(sharedCategoryId: number, catregoryId) {
    const sharedCategory = await this.sharedCategoriesRepository.find({
      id: sharedCategoryId,
    });

    if (!sharedCategory) {
      throw new Error('Shared category not found');
    }

    await this.categoriesRepository.findOneAndUpdate(
      {
        id: catregoryId,
      },
      { sharedCategoryId: sharedCategoryId },
    );
  }

  async getSharedCategories() {
    return await this.sharedCategoriesRepository.find({});
  }
}
