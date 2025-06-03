import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RtJwtStrategy } from './strategies/rtjwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: await ConfigService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: await ConfigService.getOrThrow('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: await ConfigService.getOrThrow('JWT_REFRESH_SECRET'),
        signOptions: {
          expiresIn: await ConfigService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }), // Registering refresh token strategy
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    ConfigService,
    JwtStrategy,
    RtJwtStrategy,
  ],
})
export class AuthModule {}
