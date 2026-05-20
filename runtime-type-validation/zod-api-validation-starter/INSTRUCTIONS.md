# Exercise: Zod API Validation

Build runtime validation for an API using Zod schemas.

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

## Hints

- Use `z.string().email()` for email validation
- Use `z.enum(["user", "admin", "guest"])` for the role
- Use `UserSchema.nullable()` for the optional data field
- Use `schema.parse()` for throwing validation
- Use `schema.safeParse()` for non-throwing validation
- Use `z.infer<typeof YourSchema>` to derive types

## Files

- `src/index.ts` - Add your code here
- `__tests__/validation.test.ts` - Run tests to verify

## Run Tests

```bash
npm test
```
