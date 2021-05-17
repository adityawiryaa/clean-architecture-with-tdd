import { AddItem } from "@infrastructure/adapter/use-case/cart/add-item";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AddItemPort } from 'src/core/domain/cart/port/use-case/add-item';
import { CartTokens } from "src/core/domain/cart/token";


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