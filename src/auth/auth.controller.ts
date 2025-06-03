import { Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { LoggedInUser } from './logged-in-user.decorator';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} //konstruktor tutaj

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@LoggedInUser() user: User, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(user, res);
  }

  @Post('refresh')
  refreshAutToken() {
    return this.authService.refreshAutToken();
  }

  @Post('register')
  register() {
    return this.authService.register(req.body);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
  //stare do odblokowania
  // login(@LoggedInUser() user: User) {
  //   return user;
  // }

  // async login(@Req() req: Request): Promise<any> {
  //   const res = await req.user;
  //   return res;
  //   // return await req.user;
  //   // return 'login';
  // }
}
