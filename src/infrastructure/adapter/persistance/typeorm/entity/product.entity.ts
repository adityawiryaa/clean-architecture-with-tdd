import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from './cart.entity';
@Entity({ name : 'products' })
export class ProductEntity {

  @PrimaryGeneratedColumn('increment' , { name : 'id' })
  id : number;

  @Column({ name : 'name', type : 'text' , nullable : false })
  name : string;

  @Column({ name : 'price', type : 'int' , nullable : false })
  price : number;

  @Column({ name : 'stock', type : 'int' , nullable : true ,default : 0 })
  stock : number;

  @Column({ name : 'description', type : 'text' , nullable : true })
  description : string;

  @OneToMany('CartEntity', 'product')
  carts? : CartEntity[];

}