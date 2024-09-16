import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetails } from "../entities/orderDetails.entity";
import { Orders } from "../entities/orders.entity";
import { Products } from "../entities/products.entity";
import { Users } from "../entities/users.entity";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderDetails, Orders, Users, Products]),
    ],
    providers: [OrdersService],
    controllers: [OrdersController]
})

export class OrdersModule{}