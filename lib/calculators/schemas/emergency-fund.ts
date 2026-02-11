import { z } from 'zod/v4';

export const emergencyFundSchema = z.object({
  monthlyExpenses: z.number().positive('Must be positive'),
  monthsCoverage: z.number().int().min(1).max(24),
  currentSavings: z.number().min(0),
  monthlySavingsRate: z.number().min(0),
});

export type EmergencyFundFormData = z.infer<typeof emergencyFundSchema>;
