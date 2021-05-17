import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CartController } from '@application/controller/cart.controller';
import { CartTokens } from 'src/core/domain/cart/token';
import { ProductTokens } from 'src/core/domain/product/token';
import { ProductRepository } from '@infrastructure/adapter/persistance/typeorm/repository/product.repository';
import { CartRepository } from '@infrastructure/adapter/persistance/typeorm/repository/cart.repository';
import { AddItem } from '@infrastructure/adapter/use-case/cart/add-item';

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
