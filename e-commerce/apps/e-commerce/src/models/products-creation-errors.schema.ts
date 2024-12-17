import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ProductsDocument } from '../../../trendyol/src/models/products.schema';

@Schema({ versionKey: false, collection: 'product-creation-errors' })
export class ProductCreationErrorsDocument extends ProductsDocument {
  @Prop()
  message: string;
}

export const ProductCreationErrorsSchema = SchemaFactory.createForClass(
  ProductCreationErrorsDocument,
);
