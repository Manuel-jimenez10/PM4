import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from '../../entities/products.entity';

export class CreateOrderDto {
  /**
   * @description Este parámetro recibe el ID del usuario que realiza la orden. Debe ser un UUID válido y no puede estar vacío.
   * @example "1fec6756-878e-4f2b-ad25-43e5113791cb"
   */
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * @description Este parámetro recibe una lista de productos incluidos en la orden. Debe ser un arreglo con al menos un producto.
   * @example [{ "id": "123e4567-e89b-12d3-a456-426614174000", "name": "Product Name", "price": 29.99 }]
   */
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
