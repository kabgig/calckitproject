'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { CalculatorShell } from '@/components/calculators/CalculatorShell';
import { ResultsSummary, EmptyState } from '@/components/calculators/ResultCard';
import { formatCurrency, formatNumber } from '@/lib/calculators/engines/shared/math';
import {
  freelanceRateSchema,
  type FreelanceRateFormData,
} from '@/lib/calculators/schemas/freelance-rate';
import {
  calculateFreelanceRate,
  type FreelanceRateResult,
} from '@/lib/calculators/engines/freelance-rate';

export default function FreelanceRateCalculator() {
  const [results, setResults] = useState<FreelanceRateResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FreelanceRateFormData>({
    resolver: zodResolver(freelanceRateSchema),
    defaultValues: { weeksPerYear: 48, taxRate: 30 },
  });

  const onSubmit = (data: FreelanceRateFormData) => {
    setResults(
      calculateFreelanceRate(
        data.desiredAnnualIncome, data.annualExpenses,
        data.billableHoursPerWeek, data.weeksPerYear, data.taxRate
      )
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.desiredAnnualIncome}>
            <FormLabel fontWeight="semibold">Desired Annual Income ($)</FormLabel>
            <ModernInput type="number" placeholder="80000" {...register('desiredAnnualIncome', { valueAsNumber: true })} />
            {errors.desiredAnnualIncome && <FormErrorMessage>{errors.desiredAnnualIncome.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.annualExpenses}>
            <FormLabel fontWeight="semibold">Annual Business Expenses ($)</FormLabel>
            <ModernInput type="number" placeholder="5000" {...register('annualExpenses', { valueAsNumber: true })} />
            {errors.annualExpenses && <FormErrorMessage>{errors.annualExpenses.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.billableHoursPerWeek}>
            <FormLabel fontWeight="semibold">Billable Hours/Week</FormLabel>
            <ModernInput type="number" placeholder="30" {...register('billableHoursPerWeek', { valueAsNumber: true })} />
            {errors.billableHoursPerWeek && <FormErrorMessage>{errors.billableHoursPerWeek.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.weeksPerYear}>
            <FormLabel fontWeight="semibold">Working Weeks/Year</FormLabel>
            <ModernInput type="number" placeholder="48" {...register('weeksPerYear', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.taxRate}>
            <FormLabel fontWeight="semibold">Estimated Tax Rate (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="30" {...register('taxRate', { valueAsNumber: true })} />
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate Rate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Hourly Rate', value: formatCurrency(results.hourlyRate) }}
      secondary={[
        { label: 'Daily Rate', value: formatCurrency(results.dailyRate) },
        { label: 'Weekly Rate', value: formatCurrency(results.weeklyRate) },
        { label: 'Monthly Revenue', value: formatCurrency(results.monthlyRate) },
        { label: 'Annual Revenue', value: formatCurrency(results.annualRevenue) },
        { label: 'Take-Home Hourly', value: formatCurrency(results.effectiveHourlyAfterExpenses) },
        { label: 'Billable Hrs/Year', value: formatNumber(results.billableHoursPerYear) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your income goals and working hours to calculate your freelance rate" />
  );

  return (
    <CalculatorShell
      title="Freelance Rate Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="freelance-rate-results"
    />
  );
}
