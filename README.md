## Gateway Architecture

Anyone starting a new project wonders if there is a universal template for structuring a microservice or monolith that won't lead to problems in the future, and that template is [Gateway Architecture](https://github.com/pavlokobyliatskyi/gateway-architecture).

You are probably already familiar with the project structure proposed by [NestJS](https://docs.nestjs.com/modules) itself, or with other examples of project structures available online, such as [Best Way to Structure Your Directory/Code (NestJS)](https://medium.com/the-crowdlinker-chronicle/best-way-to-structure-your-directory-code-nestjs-a06c7a641401), [NestJS boilerplate. Auth, TypeORM, Mongoose, Postgres, MongoDB, Mailing, I18N, Docker](https://github.com/brocoders/nestjs-boilerplate), or [Node.js framework NestJS project structure](https://github.com/CatsMiaow/nestjs-project-structure). Yes, these structures look well-organized and promise a lot, until you start writing code and encounter your first [circular dependency](https://docs.nestjs.com/fundamentals/circular-dependency).

The main idea of [Gateway Architecture](https://github.com/pavlokobyliatskyi/gateway-architecture) is to centralize all entry points, such as [controllers](https://docs.nestjs.com/controllers), in one place within the gateway module. Additionally, everything should be kept simple in accordance with the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle) and adhere to unidirectional communication.

```
gateway/
├── decorators
├── dtos
├── exceptions
├── graphql
│   ├── dataloaders
│   └── resolvers
│       ├── dtos
│       └── users
├── guards
├── interceptors
├── pipes
└── rest
    └── controllers
        └── users
```

If you decide to transition from [REST](https://en.wikipedia.org/wiki/REST) to [GraphQL](https://graphql.org/), you can do so easily since all queries are centralized in one place. A new team member will also be able to adapt quickly.

Below is a module for working with users. As you can see, there are no controllers here. Additionally, in this repository, the [user service](https://github.com/pavlokobyliatskyi/gateway-architecture/tree/main/apps/users-service) includes a [slug module](https://github.com/pavlokobyliatskyi/gateway-architecture/tree/main/apps/users-service/src/slug) that contains only one service and nothing more.

```
users/
├── dtos
├── entities
├── enums
├── interfaces
├── models
├── repositories
├── services
├── types
├── utils
└── users.module.ts
```

How can we differentiate contracts used for inter-service communication from contracts for API endpoints? I have come to the following conclusion: contracts between services are formatted in this style: `UsersServiceCreateUserCommandContract`:

- **UsersService** - the name of the service, which can also be (...Gateway, ...App, etc.)
- **CreateUser** - the name of the path
- **Command** - the type of path, which can also be (Query, Event, etc.)
- **Contract** - designation indicating that this is a contract

For API contracts, the format looks like this: `ApiUsersCreateUserContract`. If needed, a version can be added, for example, `ApiV1UsersCreateUserContract`, or the prefix can be capitalized, such as `API`:

- **Api** - a prefix indicating contracts for working with the API
- **Users** - the path, for example (/users, /posts, etc.)
- **CreateUser** - a general name that may not be part of the [address](https://en.wikipedia.org/wiki/URL)
- **Contract** - designation indicating that this is a contract

```
libs/
└── contracts
    ├── api-gateway
    │   └── users
    │       └── create-user.contract.ts
    └── users-service
        └── users
            ├── commands
            │   └── create-user.command.contract.ts
            └── queries
                └── get-users.query.contract.ts
```

I hope you have grasped the main idea, highlighted the important points, and will apply them in your development.