import { Cart } from 'src/core/domain/cart/cart';
import { CartRepositoryPort } from 'src/core/domain/cart/port/persistance/cart.repository';
import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { CartEntity } from '../entity/cart.entity';
import { CartMapper } from '../mapper/cart.mapper';

@EntityRepository(CartEntity)
export class CartRepository extends Repository<CartEntity> implements CartRepositoryPort {

  private tableAlias = 'carts';

  public async getAllItem() : Promise<Cart> {
    return null;
  };

  public async storeItem(payload : Cart) : Promise<Cart> {

    const cartEntity : CartEntity = CartMapper.toEntity(payload);

    const insertResult: InsertResult = await this
      .createQueryBuilder(this.tableAlias)
      .insert()
      .into(CartEntity)
      .values(cartEntity)
      .execute();

      cartEntity.id = insertResult.identifiers[0].id;
      
      const result = CartMapper.toDomain(cartEntity);

    return result;
  };

  public async updateQty(payload: {id : number, qty : number }) : Promise<Cart> {
    return null;
  };

}