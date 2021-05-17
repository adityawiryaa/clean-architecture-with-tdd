import { Product } from '@domain/product/product';
import { AddItemPort } from '@domain/cart/port/use-case/add-item';
import { Cart } from '@domain/cart/cart';
import { AddItem } from '@use-case/cart/add-item';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepositoryPort } from '@domain/product/port/persistance/product.repository';
import { ProductRepository } from '@infrastructure/persistance/typeorm/repository/product.repository';
import { CartRepository } from '@infrastructure/persistance/typeorm/repository/cart.repository';
import { CartRepositoryPort } from '@domain/cart/port/persistance/cart.repository';
import { CartTokens } from '@domain/cart/token';
import { ProductTokens } from '@domain/product/token';

describe('use-case/cart' , () => {
  
  let productRepository: ProductRepositoryPort;
  let cartRepository: CartRepositoryPort;

  let addItemUseCase: AddItem;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide : ProductTokens.Repository,
          useClass: ProductRepository,
        },
        {
          provide : CartTokens.Repository,
          useClass: CartRepository,
        },
        {
          provide: CartTokens.AddItemUseCase,
          useFactory: (productRepository,cartRepository) => new AddItem(productRepository,cartRepository),
          inject: [
            ProductTokens.Repository,
            CartTokens.Repository
          ]
        }
      ]
    }).compile();

    productRepository = module.get<ProductRepository>(ProductTokens.Repository);
    cartRepository = module.get<CartRepository>(CartTokens.Repository);
    addItemUseCase = module.get<AddItem>(CartTokens.AddItemUseCase);
  });


  describe('execute', () => {

    it('should be add new product to cart items', async () => {

      const product : Product = new Product({
        id : 1,
        name: 'PS3',
        price : 200000,
        stock : 10,
        description : '-'
      });

      const payload : AddItemPort = {
        productId : 1,
        qty : 5,
      };

      const cart : Cart = new Cart({
        product: product,
        price: product.getPrice(),
        qty : payload.qty,
        subTotal : product.getPrice() * payload.qty,
      });

      jest.spyOn(productRepository, 'findProduct').mockImplementation(async () => product);

      jest.spyOn(cartRepository, 'storeItem').mockImplementation(async () => cart);

      try {
        const result : Cart = await addItemUseCase.execute(payload);

        expect(result.getQty()).toBe(cart.getQty());
        expect(result.getPrice()).toBe(cart.getPrice());
        expect(result.getSubTotal()).toBe(cart.getSubTotal());
        expect(result.getProduct()).toBe(cart.getProduct());

      }catch(e){
        console.log(e);
      }

    });

  });

});