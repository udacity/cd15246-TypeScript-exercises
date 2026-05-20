// TODO: Define User interface with role: "user", id, name, email
interface User {
  // Add role discriminant, id, name, email
}

// TODO: Define Admin interface with role: "admin", id, name, permissions (string[])
interface Admin {
  // Add role discriminant, id, name, permissions
}

// TODO: Define Guest interface with role: "guest", sessionId, expiresAt (Date)
interface Guest {
  // Add role discriminant, sessionId, expiresAt
}

// TODO: Define UserAccount as a union of User | Admin | Guest
type UserAccount = never;

// TODO: Return the user/admin name, or "Guest" for guest accounts
export function getDisplayName(account: UserAccount): string {
  // Use a switch or if on account.role to narrow the type
  return "";
}

// TODO: Return true only if the account is an admin with the given permission
export function hasPermission(
  account: UserAccount,
  permission: string
): boolean {
  return false;
}

// TODO: Return false for guests whose session has expired, true otherwise
export function isActive(account: UserAccount): boolean {
  return true;
}
