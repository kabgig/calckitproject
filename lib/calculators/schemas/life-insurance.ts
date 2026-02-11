import { z } from 'zod/v4';

export const lifeInsuranceSchema = z.object({
  annualIncome: z.number().positive('Must be positive'),
  yearsToReplace: z.number().int().min(1).max(50),
  totalDebt: z.number().min(0),
  childrenEducationCost: z.number().min(0),
  finalExpenses: z.number().min(0),
  existingCoverage: z.number().min(0),
});

export type LifeInsuranceFormData = z.infer<typeof lifeInsuranceSchema>;
