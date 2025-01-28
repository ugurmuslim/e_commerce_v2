import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'orders' })
export class SharedOrdersDocument extends AbstractDocument {
  @Prop()
  ecommerceBrandId: string;

  @Prop()
  orderNumber: string;

  @Prop()
  platform: string;

  @Prop()
  customerEmail: string;

  @Prop()
  totalPrice: number;

  @Prop()
  grossAmount: number;

  @Prop()
  customerFirstName: string;

  @Prop()
  customerLastName: string;

  @Prop({
    type: {
      id: Number,
      firstName: String,
      lastName: String,
      company: String,
      address1: String,
      address2: String,
      city: String,
      cityCode: Number,
      district: String,
      districtId: Number,
      postalCode: String,
      countryCode: String,
      neighborhoodId: Number,
      neighborhood: String,
      phone: String,
      fullAddress: String,
      fullName: String,
    },
  })
  shipmentAddress: Record<string, any>;

  @Prop([
    {
      quantity: Number,
      barcode: String,
    },
  ])
  lines: Array<Record<string, any>>;
}

export const SharedOrdersSchema =
  SchemaFactory.createForClass(SharedOrdersDocument);
