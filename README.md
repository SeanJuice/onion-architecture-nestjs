## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Instruction on Usage (adding a feature)

[NB] _adding new class in any directory, add the export in barrelfile (index.ts)_

[Part 1]

    - 1: create entity in prisma , run migrations and update Prisma cleint ( check Database below)
    - 2: create repository in infrastructure > repositoru inherit from baserepository
    - 3: create feature module in domain > modules
    - 4: add feature module in infrastructure > modules > app.module.ts
    - 5: import repository in *providers* on  feature module at 4
    - 6: create service in domain > services  import services in providers at 4
    - 5: create entities/interfaces  needed if needed  in domain > services
    - 7: inject repository in services and call functions in the repository

[Part 2]

    - 8: create controller in application > controllers
    - 9: add controller to feature module *controllers* in 4
    - 10: import service needed
    - 11: create end points in the controller
    - 12: create DTO's inside appliciton > dtos
    - 13: use DTO in controllers

# Database

- Change database in prisma schema ( add or delete or modify database)
- Migration
  > npx prisma migrate dev --name NameOfTheMigration
- After running migration Sync with PrismaClient
  > npx prisma generate
- Seed the data
  prisma db seed
  https://www.prisma.io/docs/guides/database/seed-database

# Architecture

** Onion Architecture**
The Onion architecture is a form of layered architecture and we can visualize these layers as concentric circles. Hence the name Onion architecture. The Onion architecture was first introduced by Jeffrey Palermo, to overcome the issues of the traditional N-layered architecture approach.

There are multiple ways that we can split the onion, but we are going to choose the following approach where we are going to split the architecture into 4 layers:
Domain Layer
Service Layer
Infrastructure Layer
Presentation/Application Layer

Link:
[Architecture Read 1](https://code-maze.com/onion-architecture-in-aspnetcore/)
[Architecture Read 2](https://www.linkedin.com/pulse/onion-architecture-aka-clean-santosh-poojari/?trk=articles_directory)

# RESOURCES

[1](https://sabinadams.hashnode.dev/basic-crud-operations-in-prisma#heading-findmany)
[2](https://dev.to/arctype/building-two-factor-authentication-with-nestjs-and-postgres-5f7k)
[3](https://dev.to/arctype/building-two-factor-authentication-with-nestjs-and-postgres-5f7k)
[4](https://nest-modules.github.io/mailer/docs/mailer.html)
