import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'categories' })
export class CategoriesDocument extends AbstractDocument {
  @Prop()
  id: number

  @Prop()
  name: string

  @Prop()
  sharedCategoryId: number

  @Prop()
  parentId?: number

  @Prop()
  subCategories?: CategoriesDocument[]

}


export const CategoriesSchema = SchemaFactory.createForClass(CategoriesDocument);

