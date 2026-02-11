import { z } from 'zod';

export const compoundInterestSchema = z.object({
  principal: z
    .number()
    .min(0, 'Principal must be positive')
    .max(100000000, 'Principal too large'),
  annualRate: z
    .number()
    .min(0.01, 'Rate must be at least 0.01%')
    .max(100, 'Rate must be less than 100%'),
  years: z
    .number()
    .int('Years must be a whole number')
    .min(1, 'Must be at least 1 year')
    .max(100, 'Must be less than 100 years'),
  compoundsPerYear: z
    .number()
    .int()
    .min(1, 'Must compound at least once per year')
    .max(365, 'Max 365 compounds per year'),
  monthlyContribution: z
    .number()
    .min(0, 'Contribution must be positive')
    .max(1000000, 'Contribution too large'),
});

export type CompoundInterestFormData = z.infer<typeof compoundInterestSchema>;
