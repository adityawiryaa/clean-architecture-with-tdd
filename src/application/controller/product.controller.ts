import { CreateProductPort } from "@domain/product/port/use-case/create-product";
import { ProductTokens } from "@domain/product/token";
import { CreateProduct } from "@infrastructure/adapter/use-case/product/create-product";
import { Body, Controller, Inject, Post } from "@nestjs/common";

@Controller('product')
export class ProductController {
  
  constructor(
    @Inject(ProductTokens.CreateProductUseCase)
    private readonly createProduct: CreateProduct,
  ){}

  @Post('create')
  public async create(@Body() payload : CreateProductPort) {
    return this.createProduct.execute(payload);
  };

}