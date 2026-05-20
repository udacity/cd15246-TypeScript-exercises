# Build a Discriminated Union for User Roles

Your application has three types of users: regular Users, Admins with special permissions, and Guests with limited access and expiration.

Use a discriminated union to model these roles. Each role has a `role` property that acts as the discriminant, allowing TypeScript to narrow the type based on its value.

## Requirements

1. Complete the `User`, `Admin`, and `Guest` interfaces — each with a `role` discriminant property
2. Define `UserAccount` as a union of all three types
3. Implement `getDisplayName` to return the name for users/admins, or `"Guest"` for guests
4. Implement `hasPermission` that returns `true` only for admins with that permission
5. Implement `isActive` that returns `false` for expired guests, `true` otherwise

## Files

- `src/index.ts` — starter code with TODO markers

## Verify

Run `npm test` to verify your solution.
