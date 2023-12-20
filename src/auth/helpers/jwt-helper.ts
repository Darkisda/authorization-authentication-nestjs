import { jwtConstant } from '@auth/constants';
import { JwtPayload } from '@auth/entities';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHelper {
  constructor(private readonly jwtService: JwtService) {}

  async verifyTokenFromRequest(request: Request): Promise<JwtPayload> {
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: jwtConstant.secret,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
