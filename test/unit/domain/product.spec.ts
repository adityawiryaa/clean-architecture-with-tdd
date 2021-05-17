import { Product } from "@domain/product/product"
import { CreateProductPayload } from "@domain/product/type/create-product";
import { Exception } from '@libs/common/exception';
import { Code } from '@libs/common/code';

describe('domain/product', () => {

  describe('create', () => {

    it('it should be success create Product', async () => {
      const payload : CreateProductPayload = {
        name: 'Laptop',
        price: 1000000,
        stock: 1,
        description: '-'
      };
      // const product : Product = new Product();
      // const result = await product.create(payload);
      const result = await Product.create(payload);

      expect(result.getName()).toBe(payload.name);
      expect(result.getPrice()).toBe(payload.price);
      expect(result.getStock()).toBe(payload.stock);
      expect(result.getDescription()).toBe(payload.description);
    });

    it('it should be fail because empty Name', async () => {
      const payload : CreateProductPayload = {
        name: '',
        price: 1000000,
        stock: 1,
        description: '-'
      };
      try {
        await Product.create(payload);
      }catch(e) {
        expect(e).toBeInstanceOf(Exception);
        expect(e.code).toBe(Code.BAD_REQUEST_ERROR.code);
      };
    });

    it('it should be fail because price cant less than Zero', async () => {
      const payload : CreateProductPayload = {
        name: 'PC',
        price: -1,
        stock: 1,
        description: '-'
      };
      try {
        await Product.create(payload);
      }catch(e) {
        expect(e).toBeInstanceOf(Exception);
        expect(e.code).toBe(Code.BAD_REQUEST_ERROR.code);
      };
    });

  });

  describe('edit', () => {
    
    const product: Product = new Product({
      id : 1,
      name: 'Laptop',
      price: 1000000,
      stock: 1,
      description: '-'
    });

    it('should be edit product by id', async () => {
      await product.edit({
        id : 1,
        name: 'HP',
        stock: 20,
      });
      expect(product.getName()).toBe('HP');
      expect(product.getStock()).toBe(20);
    });

  });


})