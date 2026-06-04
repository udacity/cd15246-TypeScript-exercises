# Build a Discriminated Union for User Roles

Your application has three types of users: regular Users, Admins with special permissions, and Guests with limited access and expiration.

Use a discriminated union to model these roles. Each role has a `role` property that acts as the discriminant, allowing TypeScript to narrow the type based on its value.

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/structural-type-design/discriminated-user-roles-starter

# 2. Install dependencies
npm install

# 3. Run the tests to see them fail
npm test
```

## Requirements

1. Complete the `User`, `Admin`, and `Guest` interfaces — each with a `role` discriminant property
2. Define `UserAccount` as a union of all three types
3. Implement `getDisplayName` to return the name for users/admins, or `"Guest"` for guests
4. Implement `hasPermission` that returns `true` only for admins with that permission
5. Implement `isActive` that returns `false` for expired guests, `true` otherwise

## Files

- `src/index.ts` — starter code with TODO markers

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. Use a literal type for the discriminant: `role: "user"` (not just `string`)
2. A discriminated union lets TypeScript narrow the type in switch/case and if/else chains
3. Use `switch (role.role)` or `if (role.role === "admin")` to narrow
4. Use `Date.now()` to check if a guest session has expired
5. Run `npm test` after each change to verify your implementation
