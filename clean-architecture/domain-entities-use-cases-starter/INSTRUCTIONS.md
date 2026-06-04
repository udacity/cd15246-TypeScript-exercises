# Domain Entities and Use Cases

Build the domain layer of an authentication system using clean architecture. You'll create entities (User, Session) and use cases (RegisterUser, LoginUser, LogoutUser). The domain layer should have NO external dependencies — pure TypeScript business logic.

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/clean-architecture/domain-entities-use-cases-starter

# 2. Install dependencies
npm install

# 3. Run the tests to see them fail
npm test
```

## Requirements

1. Complete the `User` and `Session` entity interfaces with all required fields
2. Complete the `UserRepository` and `SessionRepository` interface methods
3. Implement `RegisterUserUseCase` — check for duplicate email, hash password, create user
4. Implement `LoginUserUseCase` — find user by email, verify password, create session

## Files

- `src/index.ts` — starter code with TODO markers
- `tsconfig.json` — pre-configured with strict mode
- `__tests__/domain.test.ts` — verification tests

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. The domain layer should have no imports from external libraries — pure TypeScript only
2. Use interfaces for the repository pattern so domain code doesn't depend on infrastructure
3. Password hashing can be simulated with a simple prefix + reverse (not real crypto)
4. A use case orchestrates entities and repositories — it doesn't contain business logic in the entity methods
5. Run `npm test` after each change to verify your implementation
