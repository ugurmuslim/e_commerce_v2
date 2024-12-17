import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

class Address {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  neighborhood: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  gsm: string;

  @Prop()
  tcId: string;

  @Prop()
  postalCode: string;

  @Prop()
  taxId?: string;

  @Prop()
  taxHouse?: string;

  @Prop()
  invoiceType?: number;
}

const AddressSchema = SchemaFactory.createForClass(Address);

class PackageHistory {
  @Prop({ required: true })
  createdDate: number;

  @Prop({ required: true })
  status: string;
}

const PackageHistorySchema = SchemaFactory.createForClass(PackageHistory);

class LineItem {
  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  productId: number;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  stockCode: string;

  @Prop({ type: [{ name: String, value: String }] })
  variantAttributes: Array<{ name: string; value: string }>;

  @Prop()
  customTextOptionValues: any[];

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  dueAmount: number;

  @Prop()
  installmentChargeWithVAT: number;

  @Prop()
  sellerCouponDiscount: number;

  @Prop()
  sellerDiscount: number;

  @Prop()
  mallDiscount: number;

  @Prop()
  sellerInvoiceAmount: number;

  @Prop()
  totalMallDiscountPrice: number;

  @Prop({ required: true })
  orderLineId: number;

  @Prop()
  orderItemLineItemStatusName: string;

  @Prop()
  totalSellerDiscountPrice: number;
}

const LineItemSchema = SchemaFactory.createForClass(LineItem);

@Schema({ versionKey: false, collection: 'orders' })
export class OrdersDocument extends AbstractDocument {
  @Prop({ required: true })
  orderNumber: string;


  @Prop({ required: true })
  ecommerceBrandId: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop({ required: true })
  customerfullName: string;

  @Prop({ required: true })
  customerId: number;

  @Prop()
  taxId: string;

  @Prop()
  taxOffice: string;

  @Prop({ required: true })
  tcIdentityNumber: string;

  @Prop()
  cargoSenderNumber: string;

  @Prop()
  cargoTrackingNumber: string;

  @Prop()
  cargoTrackingLink: string;

  @Prop({ required: true })
  shipmentCompanyId: number;

  @Prop({ required: true })
  cargoProviderName: string;

  @Prop({ required: true })
  shipmentMethod: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  totalDiscountAmount: number;

  @Prop({ required: true, type: [PackageHistorySchema] })
  packageHistories: PackageHistory[];

  @Prop()
  agreedDeliveryDate: number;

  @Prop()
  lastModifiedDate: number;

  @Prop({ required: true })
  shipmentPackageStatus: string;

  @Prop({ required: true })
  sellerId: number;

  @Prop({ required: true, type: AddressSchema })
  billingAddress: Address;

  @Prop({ required: true, type: AddressSchema })
  shippingAddress: Address;

  @Prop({ required: true, type: [LineItemSchema] })
  lines: LineItem[];
}

export const OrdersSchema = SchemaFactory.createForClass(OrdersDocument);
