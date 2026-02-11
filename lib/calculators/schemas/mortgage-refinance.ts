import { z } from 'zod';

export const mortgageRefinanceSchema = z.object({
  currentBalance: z.number().min(1000, 'Min $1,000').max(10000000),
  currentRate: z.number().min(0.01).max(30),
  remainingMonths: z.number().int().min(1).max(600),
  newRate: z.number().min(0.01).max(30),
  newTermMonths: z.number().int().min(12).max(600),
  closingCosts: z.number().min(0).max(1000000),
});

export type MortgageRefinanceFormData = z.infer<typeof mortgageRefinanceSchema>;
