import { z } from 'zod/v4';

export const freelanceRateSchema = z.object({
  desiredAnnualIncome: z.number().positive('Must be positive'),
  annualExpenses: z.number().min(0),
  billableHoursPerWeek: z.number().min(1).max(80),
  weeksPerYear: z.number().min(1).max(52),
  taxRate: z.number().min(0).max(60),
});

export type FreelanceRateFormData = z.infer<typeof freelanceRateSchema>;
