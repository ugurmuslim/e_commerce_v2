import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false, collection: 'products' })
export class ProductsDocument extends AbstractDocument {
  @Prop()
  approved?: boolean;

  @Prop()
  archived?: boolean;

  @Prop()
  ecommerceBrandId: string;

  @Prop({
    type: [
      {
        attributeId: Number,
        attributeName: String,
        attributeValue: String,
        attributeValueId: Number,
      },
    ],
  })
  attributes: {
    attributeId?: number;
    attributeName?: string;
    attributeValue?: string;
    attributeValueId?: number;
  }[];

  @Prop()
  barcode: string;

  @Prop()
  batchRequestId?: string;

  @Prop()
  brand?: string;

  @Prop()
  brandId: number;

  @Prop()
  categoryName?: string;

  @Prop()
  createDateTime?: number;

  @Prop()
  description: string;

  @Prop()
  dimensionalWeight: number;

  @Prop()
  gender?: string;

  @Prop()
  hasActiveCampaign?: boolean;

  @Prop()
  id?: string;

  @Prop({ type: [{ url: String }] })
  images: { url: string }[];

  @Prop()
  lastPriceChangeDate?: string;

  @Prop()
  lastStockChangeDate?: string;

  @Prop()
  lastUpdateDate?: number;

  @Prop()
  listPrice: number;

  @Prop()
  locked?: boolean;

  @Prop()
  onSale?: boolean;

  @Prop()
  pimCategoryId?: number;

  @Prop()
  platformListingId?: string;

  @Prop()
  productMainId?: string;

  @Prop()
  quantity: number;

  @Prop()
  salePrice: number;

  @Prop()
  stockCode?: string;

  @Prop()
  stockUnitType?: string;

  @Prop()
  supplierId?: number;

  @Prop()
  title: string;

  @Prop()
  vatRate: number;

  @Prop()
  version?: number;

  @Prop()
  rejected?: boolean;

  @Prop({ type: [String], default: [] })
  rejectReasonDetails?: string[];

  @Prop()
  blacklisted?: boolean;

  @Prop()
  productUrl?: string;

  @Prop({ type: Object })
  status?: {
    synced: boolean;
    message?: string;
  };
}

export const ProductSchema = SchemaFactory.createForClass(ProductsDocument);
