import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateUserDto } from "./dtos/users.dto";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../roles.enum";
import { RolesGuard } from "../guards/roles.guard";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('USERS')
@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page: number, @Query('limit') limit: number){
        if (page && limit){

            return this.usersService.getUsers(page, limit)
        }
        return this.usersService.getUsers(1, 5);
    }


    @ApiBearerAuth()
    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente' })
    @UseGuards(AuthGuard)
    getUser(@Param('id') id: string){
        return this.usersService.getUser(id); 
    }
    
    @Post()
    addUser(@Body() user: CreateUserDto){
        return this.usersService.addUser(user)
    }
    

    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() user: CreateUserDto){
        const {confirmPassword, ...updatedUser} = user
    return this.usersService.updateUser(id, updatedUser);
    }
    
    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(id);
    }
}