import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    ProductsModule,
    UsersModule,
    CategoriesModule,
    OrdersModule,
    AuthModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      secret: process.env.CLAVE_SECRETA,
      signOptions: {
        expiresIn: '1h',
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule{}