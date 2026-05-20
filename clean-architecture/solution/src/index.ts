// ===== Domain Entities =====

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

// ===== Repository Interfaces (Ports) =====

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

// ===== Use Cases =====

export class RegisterUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: { email: string; password: string; name: string }): Promise<User> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const user = await this.userRepository.create({
      email: input.email,
      password: hashPassword(input.password),
      name: input.name,
    });

    return user;
  }
}

export class LoginUserUseCase {
  private userRepository: UserRepository;
  private sessionRepository: SessionRepository;

  constructor(userRepository: UserRepository, sessionRepository: SessionRepository) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
  }

  async execute(input: { email: string; password: string }): Promise<Session> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (!verifyPassword(input.password, user.password)) {
      throw new Error("Invalid credentials");
    }

    const session = await this.sessionRepository.create({
      userId: user.id,
      token: generateToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return session;
  }
}

// ===== Helpers =====

export function hashPassword(password: string): string {
  return `hashed_${password}`;
}

export function verifyPassword(password: string, hashed: string): boolean {
  return hashPassword(password) === hashed;
}

export function generateToken(): string {
  return `tok_${Math.random().toString(36).substring(2)}_${Date.now()}`;
}
