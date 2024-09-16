import { Injectable } from "@nestjs/common";

export type User = {
id:number
email: string
name: string
password: string
address: string
phone: string
country?: string | undefined
city?: string | undefined
}

@Injectable()
export class UsersRepository{
    users: User[] = [
        {
            id: 1,
            email: "john.doe@example.com",
            name: "John Doe",
            password: "password123",
            address: "123 Main St",
            phone: "555-1234",
            country: "USA",
            city: "New York"
          },
          {
            id: 2,
            email: "jane.smith@example.com",
            name: "Jane Smith",
            password: "securepass456",
            address: "456 Elm St",
            phone: "555-5678",
            country: "Canada",
            city: "Toronto"
          },
          {
            id: 3,
            email: "alex.jones@example.com",
            name: "Alex Jones",
            password: "mypassword789",
            address: "789 Oak St",
            phone: "555-8765"
            // No country or city provided
          },
          {
            id: 4,
            email: "mary.johnson@example.com",
            name: "Mary Johnson",
            password: "johnson123",
            address: "321 Pine St",
            phone: "555-4321",
            country: "UK",
            city: "London"
          },
          {
            id: 5,
            email: "chris.brown@example.com",
            name: "Chris Brown",
            password: "brownpass456",
            address: "654 Maple St",
            phone: "555-6543",
            country: "Australia",
            city: "Sydney"
          }
    ]
    getUsers(page: number, limit: number){
        const start = (page - 1) * limit;
        const end = start + +limit;
        
        const users = this.users.slice(start, end);

        return users.map((password, ...users) => users);
    }

    getUser(id: string){
    const user = this.users.find((user) => user.id === +id);

    const {password, ...userWithoutPassword} = user;

    return userWithoutPassword;
    }

    addUser(user: User){
      const id = this.users.length + 1;
      user.id = id;

      this.users.push(user);

      const {password, ...userWithoutPassword} = user;

      return userWithoutPassword
    }

    updateUser(id: string, user: User){
      const oldUser = this.users.find((user) => user.id === +id);
      
      if (!oldUser) {
        return 'el usuario no existe';
      }
      const updateUser = {...oldUser, ...user};

      const index = this.users.findIndex((user) => user.id === +id);
      this.users[index] = updateUser;

      const {password, ...userWithoutPassword} = updateUser;

      return userWithoutPassword;
    }

    deleteUser(id: number){
      const index = this.users.findIndex((user) => user.id === +id);
      const user = this.users[index];

      this.users.splice(index, 1);

      const {password, ...userWithoutPassword} = user;

      return userWithoutPassword
    }
    getUserByEmail(email: string){
      return this.users.find((user) => user.email === email);
    }
}