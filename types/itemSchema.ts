import z from 'zod';

export const itemSchema = z.object({
  title: z.string(),
  category: z.string(),
  purchaseDate: z.date(),
  price: z.number(),
  receipts: z
    .array(
      z.object({
        url: z.url(),
        key: z.string(),
      })
    )
    .optional(),
  notes: z.string().optional(),
});
