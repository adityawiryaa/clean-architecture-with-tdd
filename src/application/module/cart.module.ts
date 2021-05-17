import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CartController } from '@application/controller/cart.controller';
import { ProductRepository } from '@infrastructure/adapter/persistance/typeorm/repository/product.repository';
import { CartRepository } from '@infrastructure/adapter/persistance/typeorm/repository/cart.repository';
import { AddItem } from '@infrastructure/adapter/use-case/cart/add-item';
import { ProductTokens } from '@domain/product/token';
import { CartTokens } from '@domain/cart/token';

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
