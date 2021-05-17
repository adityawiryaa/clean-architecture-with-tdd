import { Product } from '@domain/product/product';

export type AddItemPayload = {

  qty : number;
  product : Product;

};