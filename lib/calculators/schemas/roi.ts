import { z } from 'zod/v4';

export const roiSchema = z.object({
  initialInvestment: z.number().positive('Must be positive'),
  finalValue: z.number().positive('Must be positive'),
  years: z.number().positive('Must be positive'),
});

export type ROIFormData = z.infer<typeof roiSchema>;
