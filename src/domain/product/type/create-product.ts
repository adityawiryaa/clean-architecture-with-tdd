export type CreateProductPayload = {
  id? : number;
  name: string;
  price: number;
  stock: number;
  description?: string;
}