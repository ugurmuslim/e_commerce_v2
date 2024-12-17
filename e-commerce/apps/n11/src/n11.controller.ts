import { Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { N11Service } from './n11.service';
import { BrandSettingsGuard } from '@app/common/brand-settings/brand-settings.guard';
import { JwtAuthGuard } from '@app/common';
import { CurrentEcommerceBrand } from '@app/common/decorators/current-ecommerce-brand.decorator';
import { BrandSettingsDocument } from '@app/common/brand-settings/models/brand-settings.schema';

@Controller()
export class N11Controller {
  constructor(private readonly n11Service: N11Service) {}

  @Get('categories')
  @UseGuards(BrandSettingsGuard)
  @UseGuards(JwtAuthGuard)
  async getCategories(
    @CurrentEcommerceBrand() currentBrand: BrandSettingsDocument,
  ): Promise<any> {
    await this.n11Service.getCategories(currentBrand);
    return { message: 'Categories are fetched' };
  }

  @Get('category-attributes')
  @UseGuards(BrandSettingsGuard)
  @UseGuards(JwtAuthGuard)
  getAttributes(
    @CurrentEcommerceBrand() currentBrand: BrandSettingsDocument,
  ): Promise<any> {
    return this.n11Service.getAttributes(currentBrand);
  }

  @Get('shared-categories')
  @UseGuards(BrandSettingsGuard)
  @UseGuards(JwtAuthGuard)
  getSharedCategories(): Promise<any> {
    return this.n11Service.getSharedCategories();
  }

  @Post('category-association')
  @UseGuards(JwtAuthGuard)
  categoryAssociation(
    sharedCategoryId: number,
    categoryId: number,
  ): Promise<any> {
    return this.n11Service.categoryAssociation(sharedCategoryId, categoryId);
  }
}
