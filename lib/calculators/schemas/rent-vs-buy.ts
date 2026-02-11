import { z } from 'zod';

export const rentVsBuySchema = z.object({
  monthlyRent: z.number().min(100, 'Min $100').max(100000),
  rentIncrease: z.number().min(0).max(20),
  homePrice: z.number().min(10000).max(100000000),
  downPaymentPercent: z.number().min(0).max(100),
  rate: z.number().min(0.01).max(30),
  termYears: z.number().int().min(1).max(50),
  propertyTaxRate: z.number().min(0).max(10),
  annualInsurance: z.number().min(0).max(100000),
  maintenancePercent: z.number().min(0).max(10),
  investmentReturn: z.number().min(0).max(30),
  comparisonYears: z.number().int().min(1).max(50),
});

export type RentVsBuyFormData = z.infer<typeof rentVsBuySchema>;
