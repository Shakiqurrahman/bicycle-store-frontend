import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .nonempty("Username is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmation password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This ensures the error is shown under the confirmPassword field
  });
