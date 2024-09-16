import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Categories } from '../../entities/categories.entity';

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  imgUrl: string;

  @IsNotEmpty()
  category: Categories;
}
