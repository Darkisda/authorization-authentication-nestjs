import { SignUpParams } from '@auth/dto';
import { User } from '../entities/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  signUp(Params: SignUpParams): Promise<void>;
}
