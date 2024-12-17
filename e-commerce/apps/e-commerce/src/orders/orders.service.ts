import {Injectable} from '@nestjs/common';
import {OrderSyncDto} from '@app/common/dto/order-sync.dto';
import {ProductsService} from '../products/products.service';
import {SharedOrdersRepository} from '@app/common/shared-db/repositories/shared-orders.repository';

@Injectable()
export class OrdersService {
    constructor(
        private readonly productsService: ProductsService,
        private readonly ordersRepository: SharedOrdersRepository,
    ) {
    }

    async syncOrders(data: OrderSyncDto) {
        await this.ordersRepository.create(data);
        for (const item of data.lines) {
            this.productsService.updateProductQuantity(
                item.barcode,
                item.quantity,
                data.ecommerceBrandId,
            );
        }
    }

    async getCounts(ecommerceBrandId: string) {
        return await this.ordersRepository.count({ecommerceBrandId: ecommerceBrandId});
    }

}
