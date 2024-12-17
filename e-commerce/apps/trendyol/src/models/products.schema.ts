import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'products' })
export class ProductsDocument extends AbstractDocument {
  @Prop()
  ecommerceBrandId: string;

  @Prop({ isRequired: false })
  id?: string;

  @Prop()
  brandId?: number;

  @Prop()
  title: string;

  @Prop({ unique: true })
  barcode?: string;

  @Prop()
  productMainId?: string;

  @Prop()
  categoryId: number;

  @Prop()
  quantity: number;

  @Prop()
  stockCode?: string;

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
  cargoCompanyId?: number;

  @Prop()
  images: Images[];

  @Prop()
  attributes: Attributes[];

  @Prop({ type: Object })
  status?: {
    synced: boolean;
    message?: string;
  };
}

interface Images {
  url: string;
}

interface Attributes {
  id: number;
  name: string;
  attributeValues: {
    id: number;
    name: string;
  };
}

export const ProductSchema = SchemaFactory.createForClass(ProductsDocument);
