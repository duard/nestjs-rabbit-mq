import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config/configuration';
import { DatabaseConfig } from './config/db.config';
import { validationSchema } from './config/validation';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [TypeOrmModule],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    const dbConfig = this.configService.get('database');

    console.log(`CONFIG SERVICE`, dbConfig);
  }
}
