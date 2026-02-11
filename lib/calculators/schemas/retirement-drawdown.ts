import { z } from 'zod/v4';

export const retirementDrawdownSchema = z.object({
  currentAge: z.number().int().min(30).max(100),
  retirementBalance: z.number().positive('Must be positive'),
  annualWithdrawal: z.number().positive('Must be positive'),
  annualReturn: z.number().min(0).max(30),
  inflationRate: z.number().min(0).max(15),
});

export type RetirementDrawdownFormData = z.infer<typeof retirementDrawdownSchema>;
