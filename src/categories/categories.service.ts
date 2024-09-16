import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "../entities/categories.entity";
import { Repository } from "typeorm";
import * as data from "../../src/data.json"

@Injectable()
export class CategoriesService {
    constructor ( @InjectRepository(Categories)
     private categoriesRepository: Repository<Categories>) {}

   async  getCategories() {
         return await this.categoriesRepository.find();
     }

     addCategories(){
    data?.map(async (element) => {
        await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category})
        .onConflict('("name") DO NOTHING')
        .execute();
       })

       return 'Categories added';
     }

}