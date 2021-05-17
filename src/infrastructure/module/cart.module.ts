import { ProductRepository } from '@infrastructure/persistance/typeorm/repository/product.repository';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateProduct } from '@use-case/product/create-product';
import { ProductController } from '@application/controller/product.controller';
import { AddItem } from '@use-case/cart/add-item';
import { CartRepository } from '@infrastructure/persistance/typeorm/repository/cart.repository';
import { CartController } from '@application/controller/cart.controller';
import { CartTokens } from '@domain/cart/token';
import { ProductTokens } from '@domain/product/token';

const persistanceProvider: Provider[] = [
  {
    provide : ProductTokens.Repository,
    useFactory: connection => connection.getCustomRepository(ProductRepository),
    inject: [Connection]
  },{
    provide : CartTokens.Repository,
    useFactory: connection => connection.getCustomRepository(CartRepository),
    inject: [Connection]
  },
];

const useCaseProvider: Provider[] = [
  {
    provide: CartTokens.AddItemUseCase,
    useFactory: (productRepository,cartRepository) => new AddItem(productRepository,cartRepository),
    inject: [
      ProductTokens.Repository,
      CartTokens.Repository
    ]
  }
];

@Module({
  imports: [],
  controllers: [CartController],
  providers: [
    ...persistanceProvider,
    ...useCaseProvider,
  ],
})
export class CartModule {}
