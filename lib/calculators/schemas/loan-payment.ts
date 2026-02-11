import { z } from 'zod';

export const loanPaymentSchema = z.object({
  amount: z
    .number()
    .min(100, 'Amount must be at least $100')
    .max(10000000, 'Amount must be less than $10,000,000'),
  rate: z
    .number()
    .min(0.01, 'Rate must be at least 0.01%')
    .max(50, 'Rate must be less than 50%'),
  months: z
    .number()
    .int('Months must be a whole number')
    .min(1, 'Term must be at least 1 month')
    .max(600, 'Term must be less than 600 months'),
  startDate: z.date(),
});

export type LoanPaymentFormData = z.infer<typeof loanPaymentSchema>;
