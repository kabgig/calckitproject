import { z } from 'zod/v4';

export const salaryHourlySchema = z.object({
  mode: z.enum(['salary', 'hourly']),
  amount: z.number().positive('Must be positive'),
  hoursPerWeek: z.number().min(1).max(168),
  weeksPerYear: z.number().min(1).max(52),
});

export type SalaryHourlyFormData = z.infer<typeof salaryHourlySchema>;
