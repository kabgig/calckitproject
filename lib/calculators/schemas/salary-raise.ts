import { z } from 'zod/v4';

export const salaryRaiseSchema = z.object({
  currentSalary: z.number().positive('Must be positive'),
  raisePercent: z.number().min(0).max(200),
});

export type SalaryRaiseFormData = z.infer<typeof salaryRaiseSchema>;
