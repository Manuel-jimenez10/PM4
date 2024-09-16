import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { LoginUserDTO } from "./dtos/login.dto";
import { Users } from "../entities/users.entity";

@Injectable()
export class AuthService{
    constructor (private userService: UsersService,
    private jwtService: JwtService,
    ) {}

    async signUp(user: Partial<Users>){
        const {email, password} = user;
        const foundUser = await this.userService.getUserByEmail(email);

        if(foundUser) {
            throw new BadRequestException('User already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        if(!hashedPassword) {
            throw new BadRequestException('Encription error');
        }

       const newUser = await this.userService.addUser({
            ...user,
            password: hashedPassword,
        });

        const {isAdmin, ...cleanUser} = newUser

        return cleanUser
    }

    async signIn(credentials: LoginUserDTO){
        const {email, password} = credentials;
        const foundUser = await this.userService.getUserByEmail(email);
        
        if(!foundUser){
            throw new BadRequestException('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        if(!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        const userPayload = {
            id: foundUser.id,
            email: foundUser.email,
            isAdmin: foundUser.isAdmin
        }

        const token = this.jwtService.sign(userPayload);

        return {
            message: 'User logged in succesfully',
            token: token,
        }
    }
}