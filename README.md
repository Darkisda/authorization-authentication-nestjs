<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

## Autenticação e Autorização em NestJS

Neste repositório está um exemplo simples em como implementar uma autorização baseada em cargos fixos.

Neste exemplo existe dentro do diretório `auth` alguns arquivos que refletem regras de negócios de autorização de uma empresa básica, são estas:

- Admin
  - Pode fazer de tudo no sistema.
- Producer
  - Pode lidar com todos os recursos de produtos
- Common
  - Lida apenas com informações sobre o teu perfil e visualizar os perfis de outros usuários.

Essas regras estão de forma mais simples e acoplada dentro do arquivo `casl.factory.ts`.

Para realmente conseguir interceptar e validar as requisições existe o guard `policy.guard.ts` e o `policy.decorator.ts` que em conjunto lidam com as políticas de autorização de cada recurso.

Também se tem uma autenticação simples com JWT. Todas as rotas são protegidas por autenticação, exceto duas no controller `products.controller.ts` que são rotas públicas por meio do decorator `@Public()`.

Toda a questão e autenticação se vem do `AuthGuard` que disponibiliza um payload no header sobre as informações do papel do usuário.

## Instalação

```bash
$ pnpm install
```

## Rodando a aplicação

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
