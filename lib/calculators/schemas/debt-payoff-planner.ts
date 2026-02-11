import { z } from 'zod/v4';

export const debtEntrySchema = z.object({
  name: z.string().min(1, 'Name required'),
  balance: z.number().positive('Must be positive'),
  rate: z.number().min(0).max(50),
  minPayment: z.number().positive('Must be positive'),
});

export const debtPayoffPlannerSchema = z.object({
  debts: z.array(debtEntrySchema).min(1, 'Add at least one debt'),
  extraMonthly: z.number().min(0),
  strategy: z.enum(['avalanche', 'snowball']),
});

export type DebtPayoffPlannerFormData = z.infer<typeof debtPayoffPlannerSchema>;
