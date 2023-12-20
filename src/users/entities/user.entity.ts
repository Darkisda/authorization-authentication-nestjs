import { Auth, Credential } from '@auth/entities';

export class User {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  authorization: Auth;
  credentials: Credential;
}
