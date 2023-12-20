export enum Roles {
  Admin = 'admin',
  Producer = 'producer',
  Common = 'common',
}

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export class Role {
  name: Roles;
  actions: Actions[];
}
