// Prisma-like generated types
// TODO: Define the base delegate type with generic findUnique, findMany, create
export interface Delegate<T> {
  // findUnique: (args: { where: { id: number } }) => Promise<T | null>
  // findMany: () => Promise<T[]>
  // create: (args: { data: Omit<T, "id"> }) => Promise<T>
}

// TODO: Define User type with id, email, name, role
export interface User {
  // id: number;
  // email: string;
  // name: string;
  // role: "user" | "admin";
}

// TODO: Define Post type with id, title, content, authorId, author
export interface Post {
  // id: number;
  // title: string;
  // content: string;
  // authorId: number;
  // author: User;
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

export function createPostDelegate(): PostDelegate {
  return {
    findUnique: async ({ where }) => null,
    findMany: async () => [],
    create: async ({ data }) => ({ id: 1, ...data } as Post),
  };
}
