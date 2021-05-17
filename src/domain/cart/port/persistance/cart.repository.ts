import { Cart } from "@domain/cart/cart";

export interface CartRepositoryPort {

  getAllItem() : Promise<Cart>;

  storeItem(payload : Cart) : Promise<Cart>;

  updateQty(payload: {id : number, qty : number }) : Promise<Cart>;

};