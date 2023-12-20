import { SignUpParams } from '@auth/dto';
import { Actions, Roles } from '@auth/entities';
import { Injectable } from '@nestjs/common';
import { User } from '@users/entities';
import { UserNotFound } from '@users/errors';
import { UserRepository } from './user.repository';

@Injectable()
export class UserMemoryRepository implements UserRepository {
  private users: User[] = [
    {
      firstName: 'admin',
      lastName: 'admin',
      isAdmin: true,
      authorization: {
        role: {
          name: Roles.Admin,
          actions: [Actions.Manage],
        },
        refresh: '',
        token: '',
      },
      credentials: {
        email: 'admin@email.com',
        password: 'Qwe123',
        salt: '',
      },
    },
    {
      firstName: 'common',
      lastName: 'user',
      isAdmin: false,
      authorization: {
        role: {
          name: Roles.Common,
          actions: [Actions.Read],
        },
        refresh: '',
        token: '',
      },
      credentials: {
        email: 'common@email.com',
        password: 'Qwe123',
        salt: '',
      },
    },
    {
      firstName: 'producer',
      lastName: 'user',
      isAdmin: false,
      authorization: {
        role: {
          name: Roles.Producer,
          actions: [
            Actions.Create,
            Actions.Read,
            Actions.Update,
            Actions.Delete,
          ],
        },
        refresh: '',
        token: '',
      },
      credentials: {
        email: 'producer@email.com',
        password: 'Qwe123',
        salt: '',
      },
    },
  ];

  constructor() {}

  findAll(): Promise<User[]> {
    return new Promise((resolve) => resolve(this.users));
  }

  findByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.credentials.email === email);
      if (!user) {
        reject(new UserNotFound('Usuário não encontrado'));
      }
      resolve(user);
    });
  }

  signUp(Params: SignUpParams): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
