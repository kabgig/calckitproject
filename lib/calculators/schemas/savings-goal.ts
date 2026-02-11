import { z } from 'zod/v4';

export const savingsGoalSchema = z.object({
  goalAmount: z.number().positive('Must be positive'),
  currentSavings: z.number().min(0),
  monthlyContribution: z.number().min(0),
  annualReturn: z.number().min(0).max(30),
});

export type SavingsGoalFormData = z.infer<typeof savingsGoalSchema>;
