export interface Delegate<T> {
  findUnique: (args: { where: { id: number } }) => Promise<T | null>;
  findMany: () => Promise<T[]>;
  create: (args: { data: Omit<T, "id"> }) => Promise<T>;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: "user" | "admin";
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: User;
}

export type UserDelegate = Delegate<User>;
export type PostDelegate = Delegate<Post>;

let nextUserId = 1;
const users: User[] = [];

export function createUserDelegate(): UserDelegate {
  return {
    findUnique: async ({ where }) => {
      return users.find((u) => u.id === where.id) ?? null;
    },
    findMany: async () => [...users],
    create: async ({ data }) => {
      const user: User = { id: nextUserId++, ...data };
      users.push(user);
      return user;
    },
  };
}

let nextPostId = 1;
const posts: Post[] = [];

export function createPostDelegate(): PostDelegate {
  return {
    findUnique: async ({ where }) => {
      return posts.find((p) => p.id === where.id) ?? null;
    },
    findMany: async () => [...posts],
    create: async ({ data }) => {
      const author = users.find((u) => u.id === data.authorId);
      const post: Post = {
        id: nextPostId++,
        ...data,
        author: author ?? { id: data.authorId, email: "", name: "", role: "user" },
      };
      posts.push(post);
      return post;
    },
  };
}
