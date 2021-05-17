import { ProductRepository } from '@infrastructure/persistance/typeorm/repository/product.repository';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateProduct } from '@use-case/product/create-product';
import { ProductController } from '@application/controller/product.controller';
import { ProductTokens } from '@domain/product/token';

const persistanceProvider: Provider[] = [
  {
    provide : ProductTokens.Repository,
    useFactory: connection => connection.getCustomRepository(ProductRepository),
    inject: [Connection]
  }
];

const useCaseProvider: Provider[] = [
  {
    provide: ProductTokens.CreateProductUseCase,
    useFactory: (productRepository) => new CreateProduct(productRepository),
    inject: [
      ProductTokens.Repository,
    ]
  }
];

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ...persistanceProvider,
    ...useCaseProvider,
  ],
})
export class ProductModule {}
