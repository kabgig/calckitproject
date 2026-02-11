import { z } from 'zod/v4';

export const budgetSchema = z.object({
  monthlyIncome: z.number().positive('Must be positive'),
  needsPercent: z.number().min(0).max(100),
  wantsPercent: z.number().min(0).max(100),
  savingsPercent: z.number().min(0).max(100),
});

export type BudgetFormData = z.infer<typeof budgetSchema>;
