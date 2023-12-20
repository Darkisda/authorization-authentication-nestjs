import { PolicyHandler } from '@auth/adapters';
import { SetMetadata } from '@nestjs/common';

export const POLICY_KEY = 'policy_key';
export const CheckPolicies = (...policies: PolicyHandler[]) =>
  SetMetadata(POLICY_KEY, policies);
