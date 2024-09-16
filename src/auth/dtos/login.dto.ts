import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class LoginUserDTO {
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
}