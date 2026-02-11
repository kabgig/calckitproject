import { z } from 'zod/v4';

export const retirementSavingsSchema = z.object({
  currentAge: z.number().int().min(16).max(80),
  retirementAge: z.number().int().min(30).max(100),
  currentSavings: z.number().min(0),
  monthlyContribution: z.number().min(0),
  annualReturn: z.number().min(0).max(50),
  annualContributionIncrease: z.number().min(0).max(20),
}).refine(
  (data) => data.retirementAge > data.currentAge,
  { message: 'Retirement age must be greater than current age' }
);

export type RetirementSavingsFormData = z.infer<typeof retirementSavingsSchema>;
