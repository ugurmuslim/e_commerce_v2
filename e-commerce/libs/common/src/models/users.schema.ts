import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'brands' })
export class UsersDocument extends AbstractDocument {
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  roles?: string[];
    }

export const UsersSchema = SchemaFactory.createForClass(UsersDocument);