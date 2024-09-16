import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../../decorators/matchPassword.decorator';

export class CreateUserDto {

  /**
   * @description Este parámetro recibe el nombre como un string, no puede estar vacío y debe tener una longitud mínima de 3 y máxima de 80 caracteres.
   * @example "Manuel"
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  /**
   * @description Este parámetro recibe el email, debe ser un email válido y no puede estar vacío.
   * @example "example@mail.com"
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @description Este parámetro recibe la contraseña, debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial: !@#$%^&*, con una longitud mínima de 8 y máxima de 15 caracteres.
   * @example "Password123!"
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character: !@#$%^&*',
  })
  @Length(8, 15)
  password: string;

  /**
   * @description Este parámetro recibe la confirmación de la contraseña, debe coincidir con la propiedad password y no puede estar vacío.
   * @example "Password123!"
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * @description Este parámetro recibe la dirección como un string, no puede estar vacío y debe tener una longitud mínima de 3 y máxima de 80 caracteres.
   * @example "123 Main St"
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;

  /**
   * @description Este parámetro recibe el número de teléfono, debe ser un número y no puede estar vacío.
   * @example 1234567890
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * @description Este parámetro recibe el nombre del país como un string, no puede estar vacío y debe tener una longitud mínima de 5 y máxima de 20 caracteres.
   * @example "Venezuela"
   */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  country: string;

  /**
   * @description Este parámetro recibe el nombre de la ciudad como un string, no puede estar vacío y debe tener una longitud mínima de 5 y máxima de 20 caracteres.
   * @example "New York"
   */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  city: string;

  /**
   * @ignore
   */
  @IsEmpty()
  isAdmin?: boolean;
}
