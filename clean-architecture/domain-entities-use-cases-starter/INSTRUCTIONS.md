# Exercise: Domain Entities and Use Cases

Build the domain layer of an authentication system using clean architecture. You'll create entities (User, Session) and use cases (RegisterUser, LoginUser, LogoutUser). The domain layer should have NO external dependencies — pure TypeScript business logic.

## Requirements

1. Complete the `User` and `Session` entity interfaces with all required fields
2. Complete the `UserRepository` and `SessionRepository` interface methods
3. Implement `RegisterUserUseCase` — check for duplicate email, hash password, create user
4. Implement `LoginUserUseCase` — find user by email, verify password, create session

## Files

- `src/index.ts` — starter code with TODO markers
- `tsconfig.json` — pre-configured with strict mode
- `__tests__/domain.test.ts` — verification tests

## Verify

Run `npm test` to verify your solution.
