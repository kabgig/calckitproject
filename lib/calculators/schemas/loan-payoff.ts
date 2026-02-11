import { z } from 'zod';

export const loanPayoffSchema = z.object({
  balance: z.number().min(100, 'Min $100').max(10000000),
  rate: z.number().min(0.01, 'Min 0.01%').max(50),
  remainingMonths: z.number().int().min(1, 'Min 1 month').max(600),
  extraPayment: z.number().min(0).max(1000000),
  startDate: z.date(),
});

export type LoanPayoffFormData = z.infer<typeof loanPayoffSchema>;
