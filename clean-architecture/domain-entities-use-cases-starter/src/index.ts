// ===== Domain Entities =====

// TODO: Define User entity with id, email, password (hashed), name, createdAt
export interface User {
  id: string;
  email: string;
  // Add password, name, createdAt fields
}

// TODO: Define Session entity with id, userId, token, expiresAt, createdAt
export interface Session {
  id: string;
  userId: string;
  // Add token, expiresAt, createdAt fields
}

// ===== Repository Interfaces (Ports) =====

// TODO: Complete the UserRepository interface with a create method
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  // Add create method
}

// TODO: Complete the SessionRepository interface with create and deleteByUserId methods
export interface SessionRepository {
  findByToken(token: string): Promise<Session | null>;
  // Add create method
  // Add deleteByUserId method
}

// ===== Use Cases =====

// TODO: Implement RegisterUserUseCase
// Should hash the password, create the user, and return the user with the hashed password
export class RegisterUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: { email: string; password: string; name: string }): Promise<User> {
    // Check if email already exists
    // Hash password
    // Create user
    // Return user
    throw new Error("Not implemented");
  }
}

// TODO: Implement LoginUserUseCase
// Should validate credentials and create a session
export class LoginUserUseCase {
  private userRepository: UserRepository;
  private sessionRepository: SessionRepository;

  constructor(userRepository: UserRepository, sessionRepository: SessionRepository) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
  }

  async execute(input: { email: string; password: string }): Promise<Session> {
    // Find user by email
    // Validate password
    // Create session
    // Return session
    throw new Error("Not implemented");
  }
}

// Simple password hashing for demo purposes (NOT production-ready)
export function hashPassword(password: string): string {
  return `hashed_${password}`;
}

export function verifyPassword(password: string, hashed: string): boolean {
  return hashPassword(password) === hashed;
}

// Token generation
export function generateToken(): string {
  return `tok_${Math.random().toString(36).substring(2)}_${Date.now()}`;
}
