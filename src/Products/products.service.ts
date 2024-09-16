import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../entities/products.entity";
import { Repository } from "typeorm";
import { Categories } from "../entities/categories.entity";
import * as data from "../data.json"

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories >,
    ){}
    
   async getProducts(page: number, limit: number): Promise<Products[]>{
        let products = await this.productsRepository.find({
            relations: {
                category: true,
            },
        });

        const start = (page -1) * limit;
        const end = start + +limit;

        products = products.slice(start, end);

        return products
    }

   async getProduct(id: string){
        const product = await this.productsRepository.findOneBy({id})
            
            if (!product) return 'Product not found';
    
            return product;    
        }

    async addProduct(){
        const categories = await this.categoriesRepository.find();

        data?.map(async(element) => {
            const category = categories.find(
                (category) => category.name === element.category,
            )

            const product = new Products();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.imgUrl = element.imgUrl;
            product.stock = element.stock;
            product.category = category;

            await this.productsRepository 
            .createQueryBuilder()
            .insert()
            .into(Products)
            .values(product)
            .orUpdate(['description', 'price', 'imgUrl', 'stock'],
                ['name'])
            .execute();
        })
        return 'Products added';
    }

   async updateProduct(id: string, product: Partial<Products>){
    const existingProduct = await this.productsRepository.findOneBy({ id });

    if (!existingProduct) {
      throw new NotFoundException('Producto no encontrado');
    }

    await this.productsRepository.update(id, product);

    const updatedProduct = await this.productsRepository.findOneBy({ id });

  if (!updatedProduct) {
    throw new BadRequestException('No se logró actualizar el producto');
  }
  return updatedProduct;
    }

  async  deleteProduct(id: string){
      return await  this.productsRepository.delete(id);
    }
}