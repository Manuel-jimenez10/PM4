import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { OrderDetails } from "./orderDetails.entity";

@Entity({
    name: "orders",
})

export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @OneToOne(() => OrderDetails, (details) => details.order)
    orderDetails: OrderDetails
}

