import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'history' })
export class HistoryDocument extends AbstractDocument {
  @Prop()
  ecommerceBrandId: string;
  @Prop()
  batchId: string;
  @Prop()
  status: Status;
}


type Status = 'COMPLETED' | 'FAIL' | 'PENDING';

export const HistorySchema = SchemaFactory.createForClass(HistoryDocument)
