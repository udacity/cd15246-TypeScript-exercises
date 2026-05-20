// User with role discriminant
interface User {
  role: "user";
  id: number;
  name: string;
  email: string;
}

// Admin with role discriminant and permissions
interface Admin {
  role: "admin";
  id: number;
  name: string;
  permissions: string[];
}

// Guest with role discriminant and expiry
interface Guest {
  role: "guest";
  sessionId: string;
  expiresAt: Date;
}

// Discriminated union
type UserAccount = User | Admin | Guest;

// Returns display name based on role
export function getDisplayName(account: UserAccount): string {
  switch (account.role) {
    case "user":
      return account.name;
    case "admin":
      return account.name;
    case "guest":
      return "Guest";
  }
}

// Checks if an admin has a specific permission
export function hasPermission(
  account: UserAccount,
  permission: string
): boolean {
  if (account.role === "admin") {
    return account.permissions.includes(permission);
  }
  return false;
}

// Checks if a guest session is still active
export function isActive(account: UserAccount): boolean {
  if (account.role === "guest") {
    return account.expiresAt > new Date();
  }
  return true;
}
