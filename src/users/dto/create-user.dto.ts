// import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// export class createUserDto {
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   username: string;

//   @IsNotEmpty()
//   @MinLength(6)
//   password: string;
// }
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  id: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
