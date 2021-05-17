import { Test, TestingModule } from "@nestjs/testing";
import { SinonSandbox, createStubInstance, createSandbox, spy } from 'sinon';
import { getConnection, getRepository, InsertQueryBuilder } from "typeorm";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from "@infrastructure/adapter/persistance/typeorm/repository/product.repository";
import { ProductEntity } from "@infrastructure/adapter/persistance/typeorm/entity/product.entity";
import { CartEntity } from "@infrastructure/adapter/persistance/typeorm/entity/cart.entity";
import { ProductMapper } from "@infrastructure/adapter/persistance/typeorm/mapper/product.mapper";
import { Product } from "@domain/product/product";
import { ProductTokens } from "@domain/product/token";


describe('persistance/product-repository', () => {
  let productRepository : ProductRepository;

  let sandbox: SinonSandbox;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory',
          dropSchema: true,
          entities: [
            ProductEntity,
            CartEntity
          ],
          synchronize: true,
          logging: false
        })
      ],
      providers: [
        {
          provide : ProductTokens.Repository,
          useClass: ProductRepository
        },
      ]
    }).compile();

    sandbox = createSandbox();
    productRepository = module.get<ProductRepository>(ProductTokens.Repository);
    
  });

  afterEach( () => {
    sandbox.restore();
    let conn = getConnection();
    return conn.close();
  });

  describe('store-product', () => {
    
    it('should store product into database',async () => {
      const payload: Product = await Product.create({
        name : 'MOUSE',
        price : 100000,
        stock : 100,
      });
      
      const productEntity = ProductMapper.toEntity(payload);
      const insertResult = await getRepository(ProductEntity).insert(productEntity);
      payload.id = insertResult.identifiers[0].id;

      const fakeQueryBuilder = createStubInstance(InsertQueryBuilder);
      fakeQueryBuilder.insert.returnsThis();
      fakeQueryBuilder.into.returnsThis();
      fakeQueryBuilder.values.returnsThis();
      fakeQueryBuilder.execute.resolves(insertResult);

      sandbox.stub(productRepository, 'createQueryBuilder').withArgs('products').returns(fakeQueryBuilder as any);

      const result = await productRepository.storeProduct(payload);
      expect(result).toEqual(payload);

    });

  });

});