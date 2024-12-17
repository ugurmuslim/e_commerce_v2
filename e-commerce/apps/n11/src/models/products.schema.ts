import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'products' })
export class ProductsDocument extends AbstractDocument {
  @Prop()
  ecommerceBrandId: string;

  @Prop()
  id: number;

  @Prop()
  brandId?: string;

  @Prop()
  catalogId: number;

  @Prop()
  stockCode: string;

  @Prop()
  title: string;

  @Prop()
  barcode: string;

  @Prop()
  productMainId: string;

  @Prop()
  categoryId: number;

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
  attributeId: number;
  attributeValueId?: string | number;
  customAttributeValue?: string | number;
  attributeName: string
}

export const ProductSchema = SchemaFactory.createForClass(ProductsDocument);

