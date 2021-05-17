import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({ name : 'carts' })
export class CartEntity {

  @PrimaryGeneratedColumn('increment' , { name : 'id' })
  id : number;

  @Column({ name : 'qty', type : 'int' , nullable : false })
  qty : number;

  @Column({ name : 'price', type : 'int' , nullable : false})
  price : number;

  @Column({ name : 'sub_total', type : 'int' , nullable : false })
  subTotal : number;

  @ManyToOne('ProductEntity', 'carts')
  @JoinColumn({name : 'product_id', referencedColumnName : 'id'})
  product : ProductEntity;

}