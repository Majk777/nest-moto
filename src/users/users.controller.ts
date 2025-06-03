import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.req';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
// import { User } from '@prisma/client';
import { SafeUser } from 'src/common/types/safe-user';
import { AuthGuard } from '@nestjs/passport';
import { LoggedInUser } from 'src/auth/logged-in-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() req: CreateUserDto): Promise<SafeUser> {
    return this.usersService.createUser(req);
  }

  // brakuje loginu do usera?

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  myAccount(@LoggedInUser() data: JwtPayload) {
    console.log('LOGGED: KURWA JUSER CHUJE!!!!!!!!!!', data);
    return data;
  }
  // @Post(
  // createUser(@Body() req: CreateUserDto): void {
  //   return this.usersService.createUser(req);
  // }
}
