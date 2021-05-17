import { AddItemPort } from "@domain/cart/port/use-case/add-item";
import { CartTokens } from "@domain/cart/token";
import { AddItem } from "@infrastructure/adapter/use-case/cart/add-item";
import { Body, Controller, Inject, Post } from "@nestjs/common";


@Controller('cart')
export class CartController {
  
  constructor(
    @Inject(CartTokens.AddItemUseCase)
    private readonly addItem: AddItem,
  ){}

  @Post('add-item')
  public async create(@Body() payload : AddItemPort) {
    return this.addItem.execute(payload);
  };

}