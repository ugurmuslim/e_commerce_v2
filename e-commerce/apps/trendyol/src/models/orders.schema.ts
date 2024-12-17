import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'orders' })
export class OrdersDocument extends AbstractDocument {
  @Prop()
  id: number;

  @Prop()
  orderNumber: string;

  @Prop()
  ecommerceBrandId: string;

  @Prop()
  grossAmount: number;

  @Prop()
  totalDiscount: number;

  @Prop()
  totalTyDiscount: number;

  @Prop()
  customerFirstName: string;

  @Prop()
  customerLastName: string;

  @Prop()
  customerEmail: string;

  @Prop()
  customerId: number;

  @Prop()
  cargoTrackingNumber: number;

  @Prop()
  cargoProviderName: string;

  @Prop()
  cargoSenderNumber: string;

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
  invoiceAddress: Record<string, any>;

  @Prop([
    {
      quantity: Number,
      salesCampaignId: Number,
      productSize: String,
      merchantSku: String,
      productName: String,
      productCode: Number,
      productOrigin: String,
      merchantId: Number,
      amount: Number,
      discount: Number,
      tyDiscount: Number,
      discountDetails: [
        {
          lineItemPrice: Number,
          lineItemDiscount: Number,
          lineItemTyDiscount: Number,
        },
      ],
      currencyCode: String,
      productColor: String,
      id: Number,
      sku: String,
      vatBaseAmount: Number,
      barcode: String,
      orderLineItemStatusName: String,
      price: Number
    },
  ])
  lines: Array<Record<string, any>>;

  @Prop([
    {
      createdDate: Number,
      status: String,
    },
  ])
  packageHistories: Array<Record<string, any>>;

  @Prop()
  status: string;

  @Prop()
  shipmentPackageStatus: string;

  @Prop()
  deliveryType: string;

  @Prop()
  estimatedDeliveryStartDate: number;

  @Prop()
  estimatedDeliveryEndDate: number;

  @Prop()
  totalPrice: number;

  @Prop()
  deliveryAddressType: string;

  @Prop()
  agreedDeliveryDate: number;

  @Prop()
  fastDelivery: boolean;

  @Prop()
  originShipmentDate: number;

  @Prop()
  lastModifiedDate: number;

  @Prop()
  commercial: boolean;

  @Prop()
  warehouseId: number;

  @Prop()
  groupDeal: boolean;

  @Prop()
  invoiceLink: string;

  @Prop()
  giftBoxRequested: boolean;

  @Prop()
  containsDangerousProduct: boolean;
}

export const OrdersSchema = SchemaFactory.createForClass(OrdersDocument);
