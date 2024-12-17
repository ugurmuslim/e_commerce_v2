import {Module} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {OrdersController} from './orders.controller';
import {SharedOrdersRepository} from '@app/common/shared-db/repositories/shared-orders.repository';
import {DatabaseModule, QueueModule} from '@app/common';
import {
    SharedOrdersDocument,
    SharedOrdersSchema,
} from '@app/common/shared-db/models/shared-orders.schema';
import {SHARED_CONNECTION} from '@app/common/constants/connections';
import {ProductsModule} from '../products/products.module';

@Module({
    imports: [
        QueueModule,
        ProductsModule,
        DatabaseModule.forFeature(
            [{name: SharedOrdersDocument.name, schema: SharedOrdersSchema}],
            SHARED_CONNECTION,
        ),
    ],
    controllers: [OrdersController],
    providers: [OrdersService, SharedOrdersRepository],
})
export class OrdersModule {
}
