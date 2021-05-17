import { Product } from "@domain/product/product";
import { ProductEntity } from "../entity/product.entity";

export class ProductMapper {

  public static toDomain(productEntity: ProductEntity): Product {
    return productEntity ? new Product({
      id: productEntity.id,
      name: productEntity.name,
      price: productEntity.price,
      stock: productEntity.stock,
      description: productEntity.description,
    }) : null;
  };

  public static toEntity(product: Product): ProductEntity {
    const productEntity: ProductEntity = new ProductEntity();
    productEntity.id = product.getId();
    productEntity.name = product.getName();
    productEntity.price = product.getPrice();
    productEntity.stock = product.getStock();
    productEntity.description = product.getDescription();
    return productEntity;
  };

}