import { z } from 'zod/v4';

export const incomeTaxSchema = z.object({
  grossIncome: z.number().positive('Must be positive'),
  deductions: z.number().min(0),
});

export type IncomeTaxFormData = z.infer<typeof incomeTaxSchema>;
