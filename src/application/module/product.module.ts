import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ProductController } from '@application/controller/product.controller';
import { ProductTokens } from 'src/core/domain/product/token';
import { ProductRepository } from '@infrastructure/adapter/persistance/typeorm/repository/product.repository';
import { CreateProduct } from '@infrastructure/adapter/use-case/product/create-product';

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
