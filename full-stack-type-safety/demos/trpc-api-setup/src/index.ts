export interface Procedure<TInput, TOutput> {
  type: "query" | "mutation";
  name: string;
  handler: (input: TInput) => TOutput;
}

export function createProcedure<TInput, TOutput>(
  type: "query" | "mutation",
  name: string,
  handler: (input: TInput) => TOutput
): Procedure<TInput, TOutput> {
  return { type, name, handler };
}

export interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@test.com" },
  { id: 2, name: "Bob", email: "bob@test.com" },
];

export const getUserById = createProcedure(
  "query",
  "user.getById",
  (input: { id: number }): User | null => {
    return users.find((u) => u.id === input.id) ?? null;
  }
);

export const listUsers = createProcedure(
  "query",
  "user.list",
  (): User[] => [...users]
);

export const createUser = createProcedure(
  "mutation",
  "user.create",
  (input: { name: string; email: string }): User => {
    const newUser: User = { id: users.length + 1, ...input };
    users.push(newUser);
    return newUser;
  }
);

export function callProcedure<TInput, TOutput>(
  procedure: Procedure<TInput, TOutput>,
  input: TInput
): TOutput {
  return procedure.handler(input);
}
