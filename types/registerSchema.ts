import z from 'zod';

export const registerSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
});
