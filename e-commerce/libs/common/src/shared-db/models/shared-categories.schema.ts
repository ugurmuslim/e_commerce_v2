import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'categories' })
export class SharedCategoriesDocument extends AbstractDocument {
  @Prop()
  id: number

  @Prop()
  name: string

  @Prop()
  parentId?: number

  @Prop()
  subCategories?: SharedCategoriesDocument[]

}


export const SharedCategoriesSchema = SchemaFactory.createForClass(SharedCategoriesDocument);

