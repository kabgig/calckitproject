import { z } from 'zod/v4';

export const debtItemSchema = z.object({
  name: z.string().min(1, 'Name required'),
  balance: z.number().positive('Must be positive'),
  rate: z.number().min(0).max(50),
  minPayment: z.number().positive('Must be positive'),
});

export const debtConsolidationSchema = z.object({
  debts: z.array(debtItemSchema).min(1, 'Add at least one debt'),
  consolidationRate: z.number().min(0).max(30),
  consolidationTermMonths: z.number().int().min(6).max(360),
});

export type DebtConsolidationFormData = z.infer<typeof debtConsolidationSchema>;
