import { z } from 'zod';

export const loanComparisonSchema = z.object({
  amountA: z.number().min(100, 'Min $100').max(10000000),
  rateA: z.number().min(0.01, 'Min 0.01%').max(50),
  monthsA: z.number().int().min(1).max(600),
  feesA: z.number().min(0).max(1000000),
  amountB: z.number().min(100, 'Min $100').max(10000000),
  rateB: z.number().min(0.01, 'Min 0.01%').max(50),
  monthsB: z.number().int().min(1).max(600),
  feesB: z.number().min(0).max(1000000),
});

export type LoanComparisonFormData = z.infer<typeof loanComparisonSchema>;
