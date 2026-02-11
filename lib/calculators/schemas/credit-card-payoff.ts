import { z } from 'zod';

export const creditCardPayoffSchema = z.object({
  balance: z.number().min(1, 'Min $1').max(1000000),
  apr: z.number().min(0.01, 'Min 0.01%').max(100),
  monthlyPayment: z.number().min(1, 'Min $1').max(1000000),
});

export type CreditCardPayoffFormData = z.infer<typeof creditCardPayoffSchema>;
