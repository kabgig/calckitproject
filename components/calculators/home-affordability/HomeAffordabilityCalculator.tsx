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
import { formatCurrency, formatPercent } from '@/lib/calculators/engines/shared/math';
import {
  homeAffordabilitySchema,
  type HomeAffordabilityFormData,
} from '@/lib/calculators/schemas/home-affordability';
import {
  calculateAffordability,
  type AffordabilityResult,
} from '@/lib/calculators/engines/home-affordability';

export default function HomeAffordabilityCalculator() {
  const [results, setResults] = useState<AffordabilityResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeAffordabilityFormData>({
    resolver: zodResolver(homeAffordabilitySchema),
    defaultValues: {
      downPaymentPercent: 20,
      termYears: 30,
      propertyTaxRate: 1.2,
      annualInsurance: 1500,
    },
  });

  const onSubmit = (data: HomeAffordabilityFormData) => {
    setResults(
      calculateAffordability(
        data.annualIncome, data.monthlyDebts, data.downPaymentPercent,
        data.rate, data.termYears, data.propertyTaxRate, data.annualInsurance
      )
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.annualIncome}>
            <FormLabel fontWeight="semibold">Annual Income ($)</FormLabel>
            <ModernInput type="number" placeholder="85000" {...register('annualIncome', { valueAsNumber: true })} />
            {errors.annualIncome && <FormErrorMessage>{errors.annualIncome.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.monthlyDebts}>
            <FormLabel fontWeight="semibold">Monthly Debts ($)</FormLabel>
            <ModernInput type="number" placeholder="500" {...register('monthlyDebts', { valueAsNumber: true })} />
            {errors.monthlyDebts && <FormErrorMessage>{errors.monthlyDebts.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.downPaymentPercent}>
            <FormLabel fontWeight="semibold">Down Payment (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="20" {...register('downPaymentPercent', { valueAsNumber: true })} />
            {errors.downPaymentPercent && <FormErrorMessage>{errors.downPaymentPercent.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.rate}>
            <FormLabel fontWeight="semibold">Interest Rate (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="6.5" {...register('rate', { valueAsNumber: true })} />
            {errors.rate && <FormErrorMessage>{errors.rate.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.termYears}>
            <FormLabel fontWeight="semibold">Loan Term (Years)</FormLabel>
            <ModernInput type="number" placeholder="30" {...register('termYears', { valueAsNumber: true })} />
            {errors.termYears && <FormErrorMessage>{errors.termYears.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.propertyTaxRate}>
            <FormLabel fontWeight="semibold">Property Tax Rate (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="1.2" {...register('propertyTaxRate', { valueAsNumber: true })} />
            {errors.propertyTaxRate && <FormErrorMessage>{errors.propertyTaxRate.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.annualInsurance}>
            <FormLabel fontWeight="semibold">Annual Insurance ($)</FormLabel>
            <ModernInput type="number" placeholder="1500" {...register('annualInsurance', { valueAsNumber: true })} />
            {errors.annualInsurance && <FormErrorMessage>{errors.annualInsurance.message}</FormErrorMessage>}
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Max Home Price', value: formatCurrency(results.maxHomePrice) }}
      secondary={[
        { label: 'Max Loan', value: formatCurrency(results.maxLoanAmount) },
        { label: 'Down Payment', value: formatCurrency(results.downPaymentAmount) },
        { label: 'Est. Monthly Payment', value: formatCurrency(results.estimatedMonthlyPayment) },
        { label: 'Monthly Taxes', value: formatCurrency(results.monthlyTaxes) },
        { label: 'Monthly Insurance', value: formatCurrency(results.monthlyInsurance) },
        { label: 'Total Monthly Housing', value: formatCurrency(results.totalMonthlyHousing) },
        { label: 'Front-End DTI', value: formatPercent(results.frontEndDTI, 1) },
        { label: 'Back-End DTI', value: formatPercent(results.backEndDTI, 1) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your income and preferences to see how much home you can afford" />
  );

  return (
    <CalculatorShell
      title="Home Affordability Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="affordability-results"
    />
  );
}
