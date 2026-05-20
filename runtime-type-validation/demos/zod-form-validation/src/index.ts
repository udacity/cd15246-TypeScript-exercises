/**
 * Demonstrates form validation with Zod.
 * Shows schema composition and type inference.
 */

import { z } from "zod";

// Reusable field schemas
const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[0-9]/, "Must contain a number");

// Registration form schema
export const RegistrationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    age: z.number().min(18, "Must be 18 or older").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Derived type
export type Registration = z.infer<typeof RegistrationSchema>;

// Login form schema (simpler)
export const LoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

export type Login = z.infer<typeof LoginSchema>;

// Validation helpers
export function validateRegistration(data: unknown) {
  return RegistrationSchema.safeParse(data);
}

export function validateLogin(data: unknown) {
  return LoginSchema.safeParse(data);
}
