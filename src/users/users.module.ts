import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [UsersService], // export UsersService to be used in other modules DODAŁEM SAMODZIELNIE !!!
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
