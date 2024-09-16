import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";

@Entity({
    name: 'orderDetails'
})
export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('decimal', {precision: 10, scale: 2, nullable: false})
    price: number
    
    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn({name: 'order_id'})
    order: Orders;

    @ManyToMany(() => Products)
    @JoinTable({name: 'details_products'})
    products: Products[];
}