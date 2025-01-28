import { Inject, Injectable } from '@nestjs/common';
import { fetchTrendyol, generateBasicAuth } from '../utils/fetch';
import { BrandSettingsRepository } from '@app/common/brand-settings/repositories/brand-settings.repository';
import { BrandSettingsDocument } from '@app/common/brand-settings/models/brand-settings.schema';
import { CreateTrendyolOrderDto } from '../dto/create-order.dto';
import {
  AbstractOrdersService,
  ECOMMERCE_SERVICE,
  TRENDYOL_ORDER_CREATED,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersRepository } from '../repositories/orders.repository';
import { ProductsService } from '../products/products.service';
import { OrdersDocument } from '../models/orders.schema';

@Injectable()
export class OrdersService extends AbstractOrdersService<OrdersRepository> {
  constructor(
    protected readonly ordersRepository: OrdersRepository,
    private readonly brandSettingsRepository: BrandSettingsRepository,
    private readonly productService: ProductsService,
    @Inject(ECOMMERCE_SERVICE) private readonly ecommerceClient: ClientProxy,
  ) {
    super();
  }

  async getRemote() {
    const brandSettings = await this.brandSettingsRepository.find({});
    const now = Date.now();
    const ordersToEmit: Partial<OrdersDocument & { platform: string }>[] = [];
    for (const brandSetting of brandSettings) {
      const orders = await fetchTrendyol({
        url: `suppliers/${brandSetting.supplierId}/orders`,
        auth: generateBasicAuth(brandSetting.apiKey, brandSetting.secretKey),
      });

      for (const order of orders.content) {
        const orderInDb = await this.ordersRepository.findOne({
          orderNumber: order.orderNumber,
        });

        if (!orderInDb) {
          await this.ordersRepository.create({
            ...order,
            ecommerceBrandId: brandSetting.ecommerceBrandId,
          });

          ordersToEmit.push({
            lines: order.lines,
            orderNumber: order.orderNumber,
            totalPrice: order.totalPrice,
            customerEmail: order.customerEmail,
            platform: 'trendyol',
            grossAmount: order.grossAmount,
            customerFirstName: order.customerFirstName,
            customerLastName: order.customerLastName,
            shipmentAddress: order.shipmentAddress,
            ecommerceBrandId: brandSetting.ecommerceBrandId,
          });
        }
      }
      if (ordersToEmit.length > 0) {
        this.ecommerceClient.emit(TRENDYOL_ORDER_CREATED, {
          ecommerceBrandId: brandSetting.ecommerceBrandId,
          data: ordersToEmit,
        });
      }
    }
  }

  async syncOrder(
    ecommerceBrand: BrandSettingsDocument,
    data: CreateTrendyolOrderDto,
  ) {
    await this.ordersRepository.create({
      ...data,
      ecommerceBrandId: ecommerceBrand.ecommerceBrandId,
    });
    for (const item of data.lines) {
      this.productService.updateProductQuantity(
        item.barcode,
        item.quantity,
        ecommerceBrand.ecommerceBrandId,
      );

      this.ecommerceClient.emit(TRENDYOL_ORDER_CREATED, {
        lines: data.lines,
        orderNumber: data.orderNumber,
        ecommerceBrandId: ecommerceBrand.ecommerceBrandId,
      });
    }
  }
}
