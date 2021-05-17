import { CreateCartPayload } from './type/create-cart';
import { AddItemPayload } from './type/add-item';
import { Product } from '@domain/product/product';
import { Exception } from '@libs/common/exception';
import { Code } from '@libs/common/code';

export class Cart {
  
  constructor(payload : CreateCartPayload) {
    this.id = payload.id || null;
    this.qty = payload.qty || 1;
    this.price = payload.price;
    this.subTotal = payload.subTotal;
    this.product = payload.product;
  };

  public id : number;
  public qty : number;
  public price : number;
  public subTotal : number;
  public product : Product;

  public getId() : number {
    return this.id;
  };

  public getQty() : number {
    return this.qty;
  };

  public getPrice() : number {
    return this.price;
  };

  public getSubTotal() : number {
    return this.subTotal;
  };

  public getProduct() : Product {
    return this.product;
  };

  public static async addItem(payload : AddItemPayload) {
    if(!payload.product) {
      throw Exception.new({code : Code.BAD_REQUEST_ERROR, overrideMessage : 'product cannot be null.'})
    };
    
    const cart = new Cart({
      product: payload.product,
      price: payload.product.getPrice(),
      qty: payload.qty,
      subTotal: payload.product.getPrice() * payload.qty,
    });

    return cart;
  }

}