import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'brand-settings' })
export class BrandSettingsDocument extends AbstractDocument {
  @Prop()
  ecommerceBrandId: string;

  @Prop()
  apiKey: string;

  @Prop()
  secretKey: string;

  @Prop()
  supplierId: number;

  @Prop()
  token: string;
}

export const BrandSettingsSchema = SchemaFactory.createForClass(BrandSettingsDocument);

