import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CaslFactory } from './casl';
import { jwtConstant } from './constants';
import { JwtHelper } from './helpers';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtHelper, CaslFactory],
  exports: [JwtHelper, CaslFactory],
})
export class AuthModule {}
