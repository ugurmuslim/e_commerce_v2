import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'attributes' })
export class AttributesDocument extends AbstractDocument {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  displayName: string;

  @Prop({ type: Object })
  categoryAttributes: CategoryAttributes;
}

interface CategoryAttributes {
  allowCustom: boolean;
  attribute: {
    sharedAttributeId: number;
    id: number;
    name: string;
  };
  attributeValues: {
    sharedAttributeValueId: number;
    id: number;
    name: string;
  }[];
  categoryId: number;
  required: boolean;
  varianter: boolean;
  slicer: boolean;
  attributeOrder: number;
}

export const AttributesSchema =
  SchemaFactory.createForClass(AttributesDocument);
