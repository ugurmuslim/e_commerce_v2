import { Controller, Get, Query, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryFilterDto } from '../dto/category-filter-dto';
import { AttributesFilterDto } from '../dto/attributes-filter-dto';
import { CategoryAttributes } from '@app/common/shared-db/models/shared-attributes.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(@Query() filter: CategoryFilterDto) {
    return await this.categoriesService.getCategories(filter);
  }

  @Get(':id')
  async getCategory(@Param('id') id: number) {
    return await this.categoriesService.getCategory(id);
  }

  @Get('attributes')
  async getAttributes(
    @Query() filter: AttributesFilterDto,
  ): Promise<CategoryAttributes[] | undefined> {
    const attributes = await this.categoriesService.getAttributes(filter);
    return attributes?.categoryAttributes;
  }
}
