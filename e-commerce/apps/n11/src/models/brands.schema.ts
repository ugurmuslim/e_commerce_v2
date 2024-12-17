import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'brands' })
export class BrandsDocument extends AbstractDocument {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const BrandsSchema = SchemaFactory.createForClass(BrandsDocument);

