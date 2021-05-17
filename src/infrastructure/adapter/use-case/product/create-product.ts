import { ProductRepositoryPort } from "@domain/product/port/persistance/product.repository";
import { CreateProductPort } from "@domain/product/port/use-case/create-product";
import { Product } from "@domain/product/product";
import { UseCase } from "@libs/contract/use-case";

export class CreateProduct implements UseCase<CreateProductPort,Product> {

  constructor(private readonly productRepository: ProductRepositoryPort) {}
  
  async execute(payload : CreateProductPort) : Promise<Product> {
    const product: Product = await Product.create(payload);
    return this.productRepository.storeProduct(product);
  };

}