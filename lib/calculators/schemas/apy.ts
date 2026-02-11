import { z } from 'zod';

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
  projectionYears: z.number().int().min(1).max(50).optional(),
});

export type APYFormData = z.infer<typeof apySchema>;
