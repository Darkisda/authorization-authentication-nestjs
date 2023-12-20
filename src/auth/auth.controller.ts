import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInParams } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() params: SignInParams) {
    return await this.authService.signIn(params);
  }
}
