import z from 'zod';
export const itemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.enum([
    'electronics',
    'appliance',
    'home-garden',
    'automotive',
    'furniture',
    'tools',
    'other',
  ]),
  purchase_date: z.string(),
  warranty_expiry_date: z.string(),
  price: z.number().positive('Price must be positive'),
  notes: z.string().optional().default(''),
  receipt_files: z
    .array(
      z.object({
        success: z.literal(true),
        key: z.string().min(1, 'File key is required'),
      })
    )
    .min(0, 'Receipt files must be an array'),
});
