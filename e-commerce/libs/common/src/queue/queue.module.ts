import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {
    AUTH_SERVICE,
    ECOMMERCE_SERVICE, N11_SERVICE, TRENDYOL_SERVICE,
} from '@app/common';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: AUTH_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
                        queue: 'auth',
                    },
                }),
                inject: [ConfigService],
            },
            {
                name: TRENDYOL_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
                        queue: 'trendyol',
                    },
                }),
                inject: [ConfigService],
            },
            {
                name: N11_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
                        queue: 'n11',
                    },
                }),
                inject: [ConfigService],
            },
            {
                name: ECOMMERCE_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
                        queue: 'e-commerce',
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class QueueModule {
}
