import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'product-creation-errors' })
export class ProductCreationErrorsDocument extends AbstractDocument {
  @Prop()
  ecommerceBrandId: string;

  @Prop()
  brandId?: string;

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

  @Prop()
  message: string;

}

interface Images {
  url: string;
}

interface Attributes {
  attributeId: number;
  attributeValueId?: string | number;
  customAttributeValue?: string | number;
}

export const ProductCreationErrorsSchema = SchemaFactory.createForClass(ProductCreationErrorsDocument);

