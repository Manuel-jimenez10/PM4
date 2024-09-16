import { Injectable } from "@nestjs/common";

export type Product = {
    id:number
    name: string
    description: string
    price: number
    stock: boolean
    imgUrl: string
}

@Injectable()
export class ProductsRepository{
    products: Product[] = [
        {
            id: 1,
            name: "Smartphone",
            description: "A high-end smartphone with a great camera and display.",
            price: 799.99,
            stock: true,
            imgUrl: "https://example.com/smartphone.jpg"
          },
          {
            id: 2,
            name: "Laptop",
            description: "A powerful laptop suitable for gaming and professional use.",
            price: 1299.99,
            stock: true,
            imgUrl: "https://example.com/laptop.jpg"
          },
          {
            id: 3,
            name: "Wireless Headphones",
            description: "Noise-cancelling over-ear headphones with excellent sound quality.",
            price: 199.99,
            stock: true,
            imgUrl: "https://example.com/headphones.jpg"
          },
          {
            id: 4,
            name: "Smartwatch",
            description: "A smartwatch with fitness tracking and notification features.",
            price: 149.99,
            stock: true,
            imgUrl: "https://example.com/smartwatch.jpg"
          },
          {
            id: 5,
            name: "Tablet",
            description: "A tablet with a high-resolution screen and long battery life.",
            price: 499.99,
            stock: true,
            imgUrl: "https://example.com/tablet.jpg"
          }
    ]

    getProducts(page: number, limit: number){
      const start = (page - 1) * limit;
      const end = start + +limit;
      
      const products = this.products.slice(start, end);

      return products
  }

  getProduct(id: string){
  const product = this.products.find((product) => product.id === +id);

  return product;
  }

  addProduct(product: Product){
    const id = this.products.length + 1;
    product.id = id;

    return this.products.push(product);
  }

  updateProduct(id: string, product: Product){
    const oldProduct = this.products.find((product) => product.id === +id);
    
    if (!oldProduct) {
      return 'El producto no existe';
    }
    const updateProduct = {...oldProduct, ...product};

    const index = this.products.findIndex((product) => product.id === +id);
    this.products[index] = updateProduct;

    return updateProduct;
  }

  deleteProduct(id: number){
    const index = this.products.findIndex((product) => product.id === +id);
    const product = this.products[index];

    this.products.splice(index, 1);

    return product;
  }
}