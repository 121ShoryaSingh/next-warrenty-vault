import z from 'zod';

export const itemSchema = z.object({
  title: z.string(),
  category: z.string(),
  purchaseDate: z.date(),
  warrantyExpiry: z.string(),
  price: z.number(),
  receipts: z
    .array(
      z.object({
        key: z.string(),
      })
    )
    .optional(),
  notes: z.string().optional(),
});
