import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "../entities/orderDetails.entity";
import { Orders } from "../entities/orders.entity";
import { Products } from "../entities/products.entity";
import { Users } from "../entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService{
    constructor(
        @InjectRepository(Orders)
        private ordersRepositoy: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private OrderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Products) 
        private productsRepository: Repository<Products>,
    ) {}

   async addOrder(userId: string, products: Products[]){
        let total = 0;
        const user = await this.usersRepository.findOneBy({id: userId});

        if (!user){
            throw new NotFoundException('User not found');
        }

        const order = new Orders();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.ordersRepositoy.save(order);

        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({
                    id: element.id,
                });
                if (!product) {
                    throw new NotFoundException();
                }
                total += Number(product.price);

                await this.productsRepository.update(
                    {id: element.id},
                    {stock: product.stock - 1},
                );
                console.log(product.price);
                console.log();
                return product;
            }),
        );
        const orderDetail = new OrderDetails();

        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;

        await this.OrderDetailsRepository.save(orderDetail);

        return await this.ordersRepositoy.find({
            where: {id: newOrder.id},
            relations: {
                orderDetails: true,
            },
        });
    }

    getOrder(id: string){
        const order = this.ordersRepositoy.findOne({
            where: {id},
            relations: ['user', 'orderDetails', ],
        });

        

        if(!order) {
            return 'Order not found';
        }

        return order;
    }
} 