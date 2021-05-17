import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AddItem } from '@use-case/cart/add-item';
import { AddItemPort } from '@domain/cart/port/use-case/add-item';
import { CartTokens } from "@domain/cart/token";


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