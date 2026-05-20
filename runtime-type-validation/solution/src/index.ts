import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["user", "admin", "guest"]),
});

export const ApiResponseSchema = z.object({
  status: z.string(),
  data: UserSchema.nullable(),
});

export type User = z.infer<typeof UserSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;

export function parseUserResponse(jsonString: string): ApiResponse {
  const parsed = JSON.parse(jsonString);
  return ApiResponseSchema.parse(parsed);
}

export function safeParseUsers(data: unknown):
  | { success: true; data: User }
  | { success: false; error: string } {
  const result = UserSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error.message };
}
