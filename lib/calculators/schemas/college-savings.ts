import { z } from 'zod/v4';

export const collegeSavingsSchema = z.object({
  childAge: z.number().int().min(0).max(17),
  collegeStartAge: z.number().int().min(16).max(25),
  annualCollegeCost: z.number().positive('Must be positive'),
  yearsInCollege: z.number().int().min(1).max(8),
  currentSavings: z.number().min(0),
  monthlyContribution: z.number().min(0),
  annualReturn: z.number().min(0).max(30),
  collegeCostInflation: z.number().min(0).max(15),
});

export type CollegeSavingsFormData = z.infer<typeof collegeSavingsSchema>;
