import { Product } from "@domain/product/product";

export type CreateCartPayload = {
  id? : number,
  qty : number,
  price : number,
  subTotal : number,
  product : Product,
};