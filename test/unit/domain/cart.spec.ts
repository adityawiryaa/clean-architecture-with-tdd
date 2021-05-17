import { Cart } from "@domain/cart/cart";
import { AddItemPayload } from "@domain/cart/type/add-item";
import { Product } from "@domain/product/product";
import { Exception } from '@libs/common/exception';
import { Code } from '@libs/common/code';

describe('domain/cart', () => {
  
  describe('add-item', () => {
    
    it('should be add product to cart using given data', async () => {

      const product: Product = new Product({
        id : 1,
        name: 'Laptop',
        price: 1000000,
        stock: 1,
        description: '-'
      });
      
      const payload : AddItemPayload = {
        product: product,
        qty: 10
      };

      const cart : Cart = new Cart({
        product: product,
        price: product.getPrice(),
        qty : payload.qty,
        subTotal : product.getPrice() * payload.qty
      });

      const result = await Cart.addItem(payload);

      expect(result.getQty()).toBe(cart.getQty());
      expect(result.getPrice()).toBe(cart.getPrice());
      expect(result.getSubTotal()).toBe(cart.getSubTotal());
      expect(result.getProduct()).toBe(cart.getProduct());

    });
    it('should be fail on empty product', async () => {
      const payload:  AddItemPayload = {
        product: null,
        qty: 10,
      };
      try {
        await Cart.addItem(payload);
      }catch(e) {
        expect(e).toBeInstanceOf(Exception);
        expect(e.code).toBe(Code.BAD_REQUEST_ERROR.code);
      };
    });

  });

});