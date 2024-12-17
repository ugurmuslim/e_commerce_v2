import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import {
  DEFAULT_CONNECTION,
  SHARED_CONNECTION,
} from '@app/common/constants/connections';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: DEFAULT_CONNECTION,
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: SHARED_CONNECTION,
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('SHARED_MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(
    models: ModelDefinition[],
    connectionName: string = DEFAULT_CONNECTION,
  ) {
    return MongooseModule.forFeature(models, connectionName);
  }
}
