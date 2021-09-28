import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AbilityFactory } from './ability.factory';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: process.env.AUTH_JWT_EXPIRES },
    }),
  ],
  providers: [AuthService, JwtStrategy, AbilityFactory],
  exports: [AuthService, JwtStrategy, AbilityFactory],
})
export class AuthModule {}
