import { Module } from '@nestjs/common';
import { ProductModule } from './product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@application/interceptor/http-exception-filter';
import { CartModule } from './cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProductModule,
    CartModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule {}
