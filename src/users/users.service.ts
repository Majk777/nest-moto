import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { SafeUser } from 'src/common/types/safe-user';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async saveRefreshToken(userID: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    console.log(hashedToken);
    return this.prismaService.user.update({
      where: { id: userID },
      data: { refreshToken: hashedToken },
    });
  }

  async createUser(data: CreateUserDto): Promise<SafeUser> {
    // console.log(data);
    try {
      return await this.prismaService.user.create({
        data: {
          email: data.email,
          password: await bcrypt.hash(data.password, 10),
          name: data.name,
        },
        select: {
          email: true,
          name: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new UnprocessableEntityException('User already exists');
      }
      throw error;
    }
  }
}
