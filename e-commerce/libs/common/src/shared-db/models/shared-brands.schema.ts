import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'brands' })
export class SharedBrandsDocument extends AbstractDocument {
  @Prop()
  id: number;

  @Prop()
  name: string;
}

export const SharedBrandsSchema =
  SchemaFactory.createForClass(SharedBrandsDocument);
