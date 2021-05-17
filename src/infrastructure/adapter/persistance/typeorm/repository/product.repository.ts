import { ProductRepositoryPort } from "src/core/domain/product/port/persistance/product.repository";
import { Product } from "src/core/domain/product/product";
import { EntityRepository, InsertResult, Repository } from "typeorm";
import { ProductEntity } from "../entity/product.entity";
import { ProductMapper } from '../mapper/product.mapper';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> implements ProductRepositoryPort{

  private tableAlias = 'products'

  public async findProduct(id : number) : Promise<Product> {
    const productEntity : ProductEntity = await this
      .createQueryBuilder(this.tableAlias)
      .where(`${this.tableAlias}.id = :args`, { args: id })
      .getOne();

    const result = ProductMapper.toDomain(productEntity);

    return result;
  };

  public async findProducts() : Promise<Product[]> {
    return null;
  };

  public async storeProduct(payload : Product) : Promise<Product> {
    const productEntity : ProductEntity = ProductMapper.toEntity(payload);

    const insertResult: InsertResult = await this
      .createQueryBuilder(this.tableAlias)
      .insert()
      .into(ProductEntity)
      .values(productEntity)
      .execute();

    productEntity.id = insertResult.identifiers[0].id;

    const result = ProductMapper.toDomain(productEntity);

    return result;
  };

  public async updateProduct(payload : Product) : Promise<Product> {
    const productEntity : ProductEntity = ProductMapper.toEntity(payload);
    await this.update(productEntity.id,productEntity);
    
    return this.findProduct(productEntity.id);
  };

}