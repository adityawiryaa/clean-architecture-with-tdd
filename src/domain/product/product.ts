import { Code } from "@libs/common/code";
import { Exception } from "@libs/common/exception";
import { CreateProductPayload } from "./type/create-product";
import { EditProductPayload } from "./type/edit-product";

export class Product {
  public id : number;
  public name : string;
  public stock : number;
  public price : number;
  public description : string;

  constructor(payload : CreateProductPayload) {
    this.id = payload.id || null;
    this.name = payload.name;
    this.stock = payload.stock;
    this.price = payload.price;
    this.description = payload.description || null;
  }

  // public async create(payload : CreateProductPayload) {
  //   return payload;
  // };

  public getId() : number {
    return this.id;
  };

  public getName() : string {
    return this.name;
  };

  public getStock() : number {
    return this.stock;
  };

  public getPrice() : number {
    return this.price;
  };

  public getDescription() : string {
    return this.description;
  };

  public static async create(payload : CreateProductPayload) {
    if(!payload.name || payload.name === ''){
      throw Exception.new({ code: Code.BAD_REQUEST_ERROR, overrideMessage: 'Name cannot be null.'});
    }
    if(!payload.price || payload.price < 0) {
      throw Exception.new({ code: Code.BAD_REQUEST_ERROR, overrideMessage: 'Price cannot be less than zero.'});
    }
    return new Product(payload);
  };

  public async edit(payload : EditProductPayload) {
    this.id = payload.id;
    this.name = payload.name || this.name;
    this.price = payload.price || this.price;
    this.stock = payload.stock || this.stock;
    this.description = payload.description || this.description;
  };

  public async delete() {
    return null;
  };

  public async deductStock(qty : number) { 
    this.stock = this.stock - qty;
  };
  
}