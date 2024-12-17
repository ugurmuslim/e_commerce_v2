import { Module } from '@nestjs/common';
import { BrandSettingsRepository } from '@app/common/brand-settings/repositories/brand-settings.repository';
import { DatabaseModule } from '@app/common';
import { BrandSettingsDocument, BrandSettingsSchema } from '@app/common/brand-settings/models/brand-settings.schema';


@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: BrandSettingsDocument.name, schema: BrandSettingsSchema },
    ]),
  ],
  providers: [BrandSettingsRepository],
  exports: [BrandSettingsRepository],
})
export class BrandSettingsModule {}
