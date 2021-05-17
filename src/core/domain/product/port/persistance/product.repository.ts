import { Product } from "src/core/domain/product/product";

export interface ProductRepositoryPort {

  findProduct(id : number) : Promise<Product>;

  findProducts() : Promise<Product[]>;

  storeProduct(payload : Product) : Promise<Product>;

  updateProduct(payload : Product) : Promise<Product>;

};