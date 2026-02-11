import { z } from 'zod/v4';

export const millionaireSchema = z.object({
  currentSavings: z.number().min(0, 'Cannot be negative'),
  monthlyContribution: z.number().positive('Must be positive'),
  annualReturn: z.number().min(0).max(50, 'Max 50%'),
  targetAmount: z.number().positive('Must be positive'),
});

export type MillionaireFormData = z.infer<typeof millionaireSchema>;
