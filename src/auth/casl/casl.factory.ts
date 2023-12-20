import { Actions, Role, Roles } from '@auth/entities';
import {
  AbilityBuilder,
  AbilityTuple,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Product } from '@products/entities';
import { User } from '@users/entities';

export type Subjects = InferSubjects<typeof Product | typeof User> | 'all';
export type AppAbility = PureAbility<AbilityTuple<Actions, Subjects>>;

@Injectable()
export class CaslFactory {
  defineAbility(role: Role) {
    const { build, can } = new AbilityBuilder<AppAbility>(PureAbility);
    if (role.name === Roles.Admin) {
      can(Actions.Manage, 'all');
    } else if (role.name === Roles.Producer) {
      can(Actions.Create, Product);
      can(Actions.Read, Product);
      can(Actions.Update, Product);
      can(Actions.Delete, Product);
    } else if (role.name === Roles.Common) {
      can(Actions.Read, User);
    } else {
      can(Actions.Read, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
