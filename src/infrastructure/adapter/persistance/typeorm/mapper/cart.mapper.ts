import { CartEntity } from "../entity/cart.entity";
import { ProductMapper } from "./product.mapper";
import { ProductEntity } from "../entity/product.entity";
import { Cart } from "@domain/cart/cart";
import { Product } from "@domain/product/product";

export class CartMapper {

  public static toDomain(cartEntity: CartEntity): Cart {
    const product: Product = ProductMapper.toDomain(cartEntity.product);
    return cartEntity ? new Cart({
      id: cartEntity.id,
      qty: cartEntity.qty,
      price: cartEntity.price,
      subTotal: cartEntity.subTotal,
      product: product
    }) : null;
  };

  public static toEntity(cart: Cart): CartEntity {
    const productEntity: ProductEntity = ProductMapper.toEntity(cart.getProduct());
    const cartEntity: CartEntity = new CartEntity();
    cartEntity.id = cart.getId();
    cartEntity.qty = cart.getQty();
    cartEntity.price = cart.getPrice();
    cartEntity.subTotal = cart.getSubTotal();
    cartEntity.product = productEntity;
    return cartEntity;
  };

}