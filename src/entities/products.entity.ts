import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";
import { OrderDetails } from "./orderDetails.entity";

@Entity({
    name: 'products'
})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    price: number

    @Column('int',{nullable: false})
    stock: number;

    @Column({type: 'varchar', length: 255, default: 'default-image-url.jpg'})
    imgUrl: string;

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({name: 'category_id'})
    category: Categories

    @ManyToMany(() => OrderDetails, (details) => details.products)
    @JoinTable({
        name: 'order_details_products',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'order_details_id' }
    })
    orderDetails: OrderDetails[];
}