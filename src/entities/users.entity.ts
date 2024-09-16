import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";


@Entity({
    name: 'users',
})
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string


@Column({
    type: 'varchar',
    length: 50,
    nullable: false,
})
name: string;

@Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
})
email: string;

@Column({
    type: 'text',
    nullable: false,
})
password: string;

@Column({
    type: 'int',
}) 
phone: number;

@Column({
    type: 'varchar',
    length: 50,
})
country: string;

@Column({
    type: 'text',
})
address: string;

@Column({
    type: 'varchar',
    length: 50,
})
city: string;

@Column({
    type: 'boolean',
    default: false,
})
isAdmin: boolean;

@OneToMany(() => Orders, (order) => order.user)
orders: Orders[];
}