import { Inject, Injectable } from '@nestjs/common';
import { fetchTrendyol, generateBasicAuth } from '../utils/fetch';
import { BrandSettingsRepository } from '@app/common/brand-settings/repositories/brand-settings.repository';
import { BrandSettingsDocument } from '@app/common/brand-settings/models/brand-settings.schema';
import { CreateTrendyolOrderDto } from '../dto/create-order.dto';
import { ECOMMERCE_SERVICE, TRENDYOL_ORDER_CREATED } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersRepository } from '../repositories/orders.repository';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly brandSettingsRepository: BrandSettingsRepository,
    private readonly productService: ProductsService,
    @Inject(ECOMMERCE_SERVICE) private readonly ecommerceClient: ClientProxy,
  ) {}

  async getRemote() {
    const brandSettings = await this.brandSettingsRepository.find({});
    const now = Date.now();
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
          console.log('order', order);
          await this.ordersRepository.create({
            ...order,
            ecommerceBrandId: brandSetting.ecommerceBrandId,
          });
        }
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
