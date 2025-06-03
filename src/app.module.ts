import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
// import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //dostęp do zmiennych środowiskowych w każdym module,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggerModule.forRoot(),
    UsersModule,
    AuthModule,
    // PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
