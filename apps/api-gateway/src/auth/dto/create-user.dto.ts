import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  // Usamos los strings exactos de tu schema: USER o ADMIN
  @IsEnum(['USER', 'ADMIN'], { message: 'El rol debe ser USER o ADMIN' })
  @IsOptional()
  role?: 'USER' | 'ADMIN';
}