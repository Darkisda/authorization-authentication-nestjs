import { Role } from './role.entity';

export class Auth {
  token: string;
  refresh: string;
  role: Role;
}
