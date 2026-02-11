import { z } from 'zod';

export const homeAffordabilitySchema = z.object({
  annualIncome: z.number().min(1000, 'Min $1,000').max(100000000),
  monthlyDebts: z.number().min(0).max(1000000),
  downPaymentPercent: z.number().min(0).max(100),
  rate: z.number().min(0.01).max(30),
  termYears: z.number().int().min(1).max(50),
  propertyTaxRate: z.number().min(0).max(10),
  annualInsurance: z.number().min(0).max(100000),
});

export type HomeAffordabilityFormData = z.infer<typeof homeAffordabilitySchema>;
