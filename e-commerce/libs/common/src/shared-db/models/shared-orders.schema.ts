import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'orders' })
export class SharedOrdersDocument extends AbstractDocument {
  @Prop()
  ecommerceBrandId: string


  @Prop([
    {
      quantity: Number,
      barcode: String,
    },
  ])
  lines: Array<Record<string, any>>;
}



export const SharedOrdersSchema = SchemaFactory.createForClass(SharedOrdersDocument);

