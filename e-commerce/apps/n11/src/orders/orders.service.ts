import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { BrandSettingsRepository } from '@app/common/brand-settings/repositories/brand-settings.repository';
import { ProductsService } from '../products/products.service';
import { AbstractOrdersService } from '@app/common';
import { fetchN11 } from '../utils/fetch';
import { OrdersDocument } from '../models/orders.schema';

@Injectable()
export class OrdersService extends AbstractOrdersService<OrdersRepository> {
  constructor(
    protected readonly ordersRepository: OrdersRepository,
    private readonly brandSettingsRepository: BrandSettingsRepository,
    private readonly productService: ProductsService,
  ) {
    super();
  }

  async getRemote() {
    const brandSettings = await this.brandSettingsRepository.find({});
    const now = Date.now();
    for (const brandSetting of brandSettings) {
      const orders: { content: OrdersDocument[] } = await fetchN11({
        url: `rest/delivery/v1/shipmentPackages`,
        auth: brandSetting.apiKey,
        secretyKey: brandSetting.secretKey,
      });
      for (const order of orders?.content) {
        const orderInDb = await this.ordersRepository.findOne({
          orderNumber: order.orderNumber,
        });

        if (!orderInDb) {
          await this.ordersRepository.create({
            ...order,
            ecommerceBrandId: brandSetting.ecommerceBrandId,
          });

          for (const product of order.lines) {
            this.productService.updateProductQuantity(
              product.stockCode,
              product.quantity,
              brandSetting.ecommerceBrandId,
            );
          }
        }
      }
    }
  }
}
