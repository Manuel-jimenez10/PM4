import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../roles.enum";
import { RolesGuard } from "../guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateProductDto } from "./dto/products.dto";

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController{
    constructor(private readonly productsService: ProductsService){}
    
    @Get()
    getProducts(@Query('page') page: number, @Query('limit') limit: number){
        if (page && limit){

            return this.productsService.getProducts(page, limit)
        }
        return this.productsService.getProducts(1, 5);
    }
    
    @Get('seeder')
    addProducts(){
        return this.productsService.addProduct();
    }

    @Get(':id')
    getProduct(@Param('id') id: string){
        return this.productsService.getProduct(id); 
    }
    
    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateUser(@Param('id') id: string, @Body() product: UpdateProductDto){
    return this.productsService.updateProduct(id, product);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id: string){
        return this.productsService.deleteProduct(id);
    }
}