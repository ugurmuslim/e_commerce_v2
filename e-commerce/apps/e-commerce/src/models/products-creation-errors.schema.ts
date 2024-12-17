import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SharedProductsDocument } from '@app/common/shared-db/models/shared-products.schema';

@Schema({ versionKey: false, collection: 'product-creation-errors' })
export class ProductCreationErrorsDocument extends SharedProductsDocument {
  @Prop()
  message: string;
}

export const ProductCreationErrorsSchema = SchemaFactory.createForClass(
  ProductCreationErrorsDocument,
);
