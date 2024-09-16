import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dtos/orders.dto";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('ORDERS')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto){
    const {userId, products} = order;
    return this.ordersService.addOrder(userId, products);
    }
    
    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Param('id') id: string){
    return this.ordersService.getOrder(id);
    }

}