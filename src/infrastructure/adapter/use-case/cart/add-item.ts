import { Cart } from "@domain/cart/cart";
import { CartRepositoryPort } from "@domain/cart/port/persistance/cart.repository";
import { AddItemPort } from "@domain/cart/port/use-case/add-item";
import { ProductRepositoryPort } from "@domain/product/port/persistance/product.repository";
import { Product } from "@domain/product/product";
import { Code } from "@libs/common/code";
import { Exception } from "@libs/common/exception";
import { UseCase } from "@libs/contract/use-case";

export class AddItem implements UseCase<AddItemPort,Cart> {

  constructor(
    private readonly productRepository : ProductRepositoryPort,
    private readonly cartRepository : CartRepositoryPort
  ){}
  
  public async execute(payload: AddItemPort) : Promise<Cart> {
    const product: Product = await this.productRepository.findProduct(payload.productId);
    if(!product) {
      throw Exception.new({code : Code.BAD_REQUEST_ERROR, overrideMessage: `product with id ${payload.productId} not found.`});
    };
    
    const cart: Cart = await Cart.addItem({
      product: product,
      qty: payload.qty
    });
    
    product.deductStock(payload.qty);

    this.productRepository.updateProduct(product);

    return this.cartRepository.storeItem(cart);
  
  };
  
}