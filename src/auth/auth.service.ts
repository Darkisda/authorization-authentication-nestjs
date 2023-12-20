import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserNotFound } from '@users/errors';
import { UserMemoryRepository } from '@users/repositories';
import { SignInParams } from './dto';
import { JwtPayload } from './entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UserMemoryRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(params: SignInParams) {
    try {
      const { email, password } = params;
      const user = await this.repository.findByEmail(email);
      if (user.credentials.password !== password) {
        throw new UnauthorizedException('Credenciais erradas');
      }
      const payload: JwtPayload = { auth: user.authorization };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
