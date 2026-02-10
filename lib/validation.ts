import { z } from 'zod';

export const mortgageSchema = z.object({
  amount: z
    .number()
    .min(1000, 'Amount must be at least $1,000')
    .max(10000000, 'Amount must be less than $10,000,000'),
  rate: z
    .number()
    .min(0.01, 'Rate must be at least 0.01%')
    .max(30, 'Rate must be less than 30%'),
  years: z
    .number()
    .int('Years must be a whole number')
    .min(1, 'Term must be at least 1 year')
    .max(50, 'Term must be less than 50 years'),
  startDate: z.date(),
});

export type MortgageFormData = z.infer<typeof mortgageSchema>;

export const apySchema = z.object({
  apr: z
    .number()
    .min(0.01, 'APR must be at least 0.01%')
    .max(100, 'APR must be less than 100%'),
  compoundFrequency: z.enum([
    'daily',
    'weekly',
    'monthly',
    'quarterly',
    'annual',
    'continuous',
    'custom',
  ]),
  customN: z.number().optional(),
  principal: z
    .number()
    .min(0, 'Principal must be positive')
    .max(100000000, 'Principal too large')
    .optional(),
  projectionYears: z
    .number()
    .int()
    .min(1)
    .max(50)
    .optional(),
});

export type APYFormData = z.infer<typeof apySchema>;
