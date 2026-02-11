import { z } from 'zod/v4';

export const netWorthItemSchema = z.object({
  name: z.string().min(1, 'Name required'),
  value: z.number().min(0, 'Must be non-negative'),
});

export const netWorthSchema = z.object({
  assets: z.array(netWorthItemSchema).min(1, 'Add at least one asset'),
  liabilities: z.array(netWorthItemSchema),
});

export type NetWorthFormData = z.infer<typeof netWorthSchema>;
