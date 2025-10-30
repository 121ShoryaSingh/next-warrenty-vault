import z from 'zod';

export const registerSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z
    .string()
    .min(2, 'Name should be at least 2 characters ')
    .max(30, 'Name cannot be longer than 30 characters'),
});
