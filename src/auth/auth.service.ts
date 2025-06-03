import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findUser({ email });
      if (!user) {
        return null;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      // await bcrypt.compare(password, user.password);
      return user;
    } catch (error) {
      //   throw new UnauthorizedException(error);
      console.log(error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async refreshToken(userID: string, refToken: string) {
    // const user = await this.
  }

  async login(user: User): Promise<Tokens> {
    const tokens = await this.generateTokens(user.id, user.email);
    await this.updatedRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async generateTokens(userID: string, email: string) {
    const payload = { userID, email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshAuthToken() {}

  async register() {}
  async logout() {}
}
