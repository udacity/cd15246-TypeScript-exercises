import { z } from "zod";

// TODO: Complete the UserSchema
// id: z.number(), name: z.string(), email: z.string().email(), role: z.enum([...])
export const UserSchema = z.object({
  // Add fields here
});

// TODO: Create ApiResponseSchema with status (string) and data (UserSchema or null)
// Use z.nullable() or z.union() for the data field
export const ApiResponseSchema = z.object({
  // Add status and data fields
});

// TODO: Derive TypeScript types using z.infer<>
export type User = z.infer<typeof UserSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;

// TODO: Implement parseUserResponse that:
// 1. Parses the JSON string
// 2. Validates with ApiResponseSchema
// 3. Returns the parsed data or throws
export function parseUserResponse(jsonString: string): ApiResponse {
  // Parse JSON string
  // Validate with ApiResponseSchema.parse()
  // Return the typed result
  return JSON.parse(jsonString) as ApiResponse;
}

// TODO: Implement safeParseUsers that:
// 1. Does NOT throw on invalid data
// 2. Returns { success: true, data: User } or { success: false, error: string }
export function safeParseUsers(data: unknown):
  | { success: true; data: User }
  | { success: false; error: string } {
  // Use safeParse instead of parse
  return { success: false, error: "Not implemented" };
}
