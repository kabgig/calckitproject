import { z } from 'zod/v4';

export const helocPaymentSchema = z.object({
  drawAmount: z.number().positive('Must be positive'),
  annualRate: z.number().min(0.01).max(30),
  repaymentYears: z.number().int().min(1).max(30),
});

export type HELOCPaymentFormData = z.infer<typeof helocPaymentSchema>;
