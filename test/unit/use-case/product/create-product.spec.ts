import { CreateProductPort } from "@domain/product/port/use-case/create-product";
import { CreateProduct } from "@use-case/product/create-product";
import { Product } from '@domain/product/product';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '@infrastructure/persistance/typeorm/repository/product.repository';
import { ProductRepositoryPort } from '@domain/product/port/persistance/product.repository';
import { ProductTokens } from "@domain/product/token";

describe('use-case/create-product', () => {

  let createProductUseCase : CreateProduct;
  let productRepository: ProductRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide : ProductTokens.Repository,
          useClass: ProductRepository
        },
        {
          provide: ProductTokens.CreateProductUseCase,
          useFactory: (repository) => new CreateProduct(repository),
          inject: [
            ProductTokens.Repository,
          ]
        }
      ]
    }).compile();

    productRepository = module.get<ProductRepository>(ProductTokens.Repository);
    createProductUseCase = module.get<CreateProduct>(ProductTokens.CreateProductUseCase);

  });

  describe('execute', () => {

    it('should be create new product use given data', async () => {
      const incrementId = 1;
      const payload : CreateProductPort =  {
        name : 'PC',
        price : 500000,
        stock : 20,
        description : '-' 
      };

      jest.spyOn(productRepository, 'storeProduct').mockImplementation(async () => expectedProduct);

      const expectedProduct : Product = new Product({id : incrementId,...payload});

      const resultProduct = await createProductUseCase.execute(payload);
      expect(resultProduct).toBe(expectedProduct);
    });

  });

}); 