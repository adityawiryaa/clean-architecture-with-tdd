import { Product } from 'src/core/domain/product/product';

export type AddItemPayload = {

  qty : number;
  product : Product;

};