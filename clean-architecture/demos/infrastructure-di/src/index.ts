/**
 * Demonstrates infrastructure layer with dependency injection.
 * Implements the repository interfaces from the domain layer.
 */

import { randomUUID } from "node:crypto";

// ===== Domain Types (imported from domain) =====
// In a real app, these would be imported from a separate domain package

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, "id" | "createdAt">): Promise<User>;
}

export interface SessionRepository {
  findByToken(token: string): Promise<Session | null>;
  create(session: Omit<Session, "id" | "createdAt">): Promise<Session>;
  deleteByUserId(userId: string): Promise<void>;
}

// ===== In-Memory Infrastructure Implementation =====

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }

  async create(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    const user: User = {
      id: randomUUID(),
      ...userData,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  // Test helper
  get all(): User[] {
    return [...this.users];
  }
}

export class InMemorySessionRepository implements SessionRepository {
  private sessions: Session[] = [];

  async findByToken(token: string): Promise<Session | null> {
    return this.sessions.find((s) => s.token === token) ?? null;
  }

  async create(sessionData: Omit<Session, "id" | "createdAt">): Promise<Session> {
    const session: Session = {
      id: randomUUID(),
      ...sessionData,
      createdAt: new Date(),
    };
    this.sessions.push(session);
    return session;
  }

  async deleteByUserId(userId: string): Promise<void> {
    this.sessions = this.sessions.filter((s) => s.userId !== userId);
  }

  // Test helper
  get all(): Session[] {
    return [...this.sessions];
  }
}

// ===== Factory / DI Container =====

export interface AppContainer {
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
}

export function createAppContainer(): AppContainer {
  return {
    userRepository: new InMemoryUserRepository(),
    sessionRepository: new InMemorySessionRepository(),
  };
}
