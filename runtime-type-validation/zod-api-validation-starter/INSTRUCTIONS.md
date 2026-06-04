# Zod API Validation

Build runtime validation for an API using Zod schemas.

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/runtime-type-validation/zod-api-validation-starter

# 2. Install dependencies
npm install

# 3. Run the tests to see them fail
npm test
```

## Requirements

1. Define a `UserSchema` using `z.object()` with:
   - `id` (number)
   - `name` (string)
   - `email` (string with email validation)
   - `role` (enum: `'user' | 'admin' | 'guest'`)

2. Define an `ApiResponseSchema` that wraps data with:
   - `status` (string)
   - `data` (UserSchema or null)

3. Use `z.infer<>` to derive TypeScript types from the schemas.

4. Implement `parseUserResponse` that validates and returns parsed data.

5. Implement `safeParseUsers` that handles invalid data gracefully.

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. Use `z.string().email()` for email validation
2. Use `z.enum(["user", "admin", "guest"])` for the role
3. Use `UserSchema.nullable()` for the optional data field
4. Use `schema.parse()` for throwing validation
5. Use `schema.safeParse()` for non-throwing validation
6. Use `z.infer<typeof YourSchema>` to derive types
7. Run `npm test` after each change to verify your implementation
