import { PolicyHandler } from '@auth/adapters';
import { AppAbility, CaslFactory } from '@auth/casl';
import { POLICY_KEY } from '@auth/decorators/policy.decorator';
import { JwtPayload } from '@auth/entities';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslFactory: CaslFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(POLICY_KEY, context.getHandler()) ||
      [];

    const { payload } = context
      .switchToHttp()
      .getRequest<{ payload: JwtPayload }>();
    const ability = this.caslFactory.defineAbility(payload.auth.role);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
