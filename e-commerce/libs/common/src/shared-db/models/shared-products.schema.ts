import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'products' })
export class SharedProductsDocument extends AbstractDocument {
  @Prop()
  ecommerceBrandId: string;

  @Prop()
  brandId?: string;

  @Prop()
  brandName: string;

  @Prop()
  title: string;

  @Prop({ unique: true })
  barcode: string;

  @Prop()
  productMainId?: string;

  @Prop()
  categoryId: number;

  @Prop()
  categoryName: string;

  @Prop()
  quantity: number;

  @Prop()
  dimensionalWeight: number;

  @Prop()
  description: string;

  @Prop()
  currencyType: string;

  @Prop()
  listPrice: number;

  @Prop()
  salePrice: number;

  @Prop()
  vatRate: number;

  @Prop()
  images: Images[];

  @Prop()
  attributes: Attributes[];
}

interface Images {
  url: string;
}

interface Attributes {
  name: string;
  id: number;
  attributeValues: {
    id: number;
    name: string;
  };
}

export const SharedProductSchema = SchemaFactory.createForClass(
  SharedProductsDocument,
);