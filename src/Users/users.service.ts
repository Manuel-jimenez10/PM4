import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../entities/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>){}


   async getUsers(page: number, limit: number){
        let users = await this.usersRepository.find();

        const start = (page -1) * limit;
        const end = start + +limit;

        users = users.slice(start, end);

        return users.map(({password, isAdmin, ...user}) => user)
    }
    
  async  getUser(id: string){
        let user = await this.usersRepository.findOne({
        where: {id},
        relations:{
            orders: true
        }
        })
        
        if (!user) throw new NotFoundException('User not found') 

        const {password, isAdmin, ...userWithoutPassword} = user

        return userWithoutPassword;
    }

   async addUser(user: Partial<Users>){
     const newUser = await this.usersRepository.save(user);
     const {password, ...userWithoutPassword} = newUser;
     return userWithoutPassword;
    }

    
  async updateUser(id: string, user: Partial<Users>) {
    // Verificar si el usuario existe antes de actualizar
    const existingUser = await this.usersRepository.findOneBy({ id });

    if (!existingUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    }


    // Realizar la actualización
    await this.usersRepository.update(id, user);

    // Verificar si la actualización fue exitosa
    const updatedUser = await this.usersRepository.findOneBy({ id });

    if (!updatedUser) {
      throw new BadRequestException('No se logró actualizar el usuario');
    }

    // Excluir las propiedades 'password' y 'isAdmin' de la respuesta
    const { password, isAdmin, ...userWithoutSensitiveData } = updatedUser;

    return userWithoutSensitiveData;
  }

    async deleteUser(id: string){
        const user = await this.usersRepository.findOneBy({id});

        this.usersRepository.remove(user);

        const {password, isAdmin, ...userWithoutPassword} = user;

        return userWithoutPassword;
    }

   async getUserByEmail(email: string){
    const user = await this.usersRepository.findOneBy({email});    
    return user || null
}
}