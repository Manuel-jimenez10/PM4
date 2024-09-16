import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dtos/login.dto";
import { CreateUserDto } from "../users/dtos/users.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('/signup')
    signUp(@Body() user: CreateUserDto){
      const  { confirmPassword, isAdmin, ...cleanUser} = user;
    return this.authService.signUp(cleanUser); 
    }

    @Post('/signin')
    signIn(@Body() credentials: LoginUserDTO){
        return this.authService.signIn(credentials);
    }
}