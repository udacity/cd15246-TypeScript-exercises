// Prisma-like generated types
// TODO: Define the base delegate type with generic findUnique, findMany, create methods
export interface Delegate<T> {
  // Add findUnique, findMany, create methods with proper generics
}

// TODO: Define User type with id, email, name, role fields
export interface User {
  // Add id, email, name, role fields
}

// TODO: Define Post type with id, title, content, authorId, and author fields
export interface Post {
  // Add id, title, content, authorId, author fields
}

// TODO: Create a type-safe delegate for User
export type UserDelegate = Delegate<User>;

// TODO: Create a type-safe delegate for Post
export type PostDelegate = Delegate<Post>;

// Runtime mock implementations
// TODO: Implement createUserDelegate that returns a mock Delegate<User>
export function createUserDelegate(): UserDelegate {
  return {
    findUnique: async ({ where }) => null,
    findMany: async () => [],
    create: async ({ data }) => ({ id: 1, ...data } as User),
  };
}

// TODO: Implement createPostDelegate that stores posts and resolves the author
// from the users created by createUserDelegate (both delegates share the same
// module-level in-memory store)
export function createPostDelegate(): PostDelegate {
  return {
    findUnique: async ({ where }) => null,
    findMany: async () => [],
    create: async ({ data }) => ({ id: 1, ...data } as Post),
  };
}
