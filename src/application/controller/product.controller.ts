import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateProductPort } from '@domain/product/port/use-case/create-product';
import { CreateProduct } from '@use-case/product/create-product';
import { ProductTokens } from "@domain/product/token";


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