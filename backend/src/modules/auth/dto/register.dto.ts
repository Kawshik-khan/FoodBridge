import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator'
import { Role } from '../../../common/enums/role.enum'

export class RegisterDto {
  @IsString()
  fullName!: string

  @IsEmail()
  email!: string

  @IsString()
  @MinLength(8)
  password!: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsEnum(Role)
  role?: Role
}
