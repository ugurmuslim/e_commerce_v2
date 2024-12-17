import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'attributes' })
export class SharedAttributesDocument extends AbstractDocument {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  displayName: string;

  @Prop({ type: Object })
  categoryAttributes: CategoryAttributes[];
}

export interface CategoryAttributes {
  allowCustom: boolean;
  attribute: {
    id: number;
    name: string;
  };
  attributeValues: {
    id: number;
    name: string;
  }[];
  categoryId: number;
  required: boolean;
  varianter: boolean;
  slicer: boolean;
}

export const SharedAttributesSchema = SchemaFactory.createForClass(
  SharedAttributesDocument,
);
