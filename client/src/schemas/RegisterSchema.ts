import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().min(1, 'Email is required.').email('Invalid email.'),
    password: z.string().min(1, 'Password is required.').min(8, 'Password must have more than 8 characters.'),
    passwordConfirmation: z
      .string()
      .min(1, 'Password is required.')
      .min(8, 'Password must have more than 8 characters.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
