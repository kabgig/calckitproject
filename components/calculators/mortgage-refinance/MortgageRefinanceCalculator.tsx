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
  mortgageRefinanceSchema,
  type MortgageRefinanceFormData,
} from '@/lib/calculators/schemas/mortgage-refinance';
import {
  calculateRefinance,
  type RefinanceResult,
} from '@/lib/calculators/engines/mortgage-refinance';

export default function MortgageRefinanceCalculator() {
  const [results, setResults] = useState<RefinanceResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MortgageRefinanceFormData>({
    resolver: zodResolver(mortgageRefinanceSchema),
    defaultValues: { closingCosts: 5000 },
  });

  const onSubmit = (data: MortgageRefinanceFormData) => {
    setResults(
      calculateRefinance(
        data.currentBalance, data.currentRate, data.remainingMonths,
        data.newRate, data.newTermMonths, data.closingCosts
      )
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.currentBalance}>
            <FormLabel fontWeight="semibold">Current Balance ($)</FormLabel>
            <ModernInput type="number" placeholder="250000" {...register('currentBalance', { valueAsNumber: true })} />
            {errors.currentBalance && <FormErrorMessage>{errors.currentBalance.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.currentRate}>
            <FormLabel fontWeight="semibold">Current Rate (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="6.5" {...register('currentRate', { valueAsNumber: true })} />
            {errors.currentRate && <FormErrorMessage>{errors.currentRate.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.remainingMonths}>
            <FormLabel fontWeight="semibold">Remaining Months</FormLabel>
            <ModernInput type="number" placeholder="300" {...register('remainingMonths', { valueAsNumber: true })} />
            {errors.remainingMonths && <FormErrorMessage>{errors.remainingMonths.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.newRate}>
            <FormLabel fontWeight="semibold">New Rate (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="5.0" {...register('newRate', { valueAsNumber: true })} />
            {errors.newRate && <FormErrorMessage>{errors.newRate.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.newTermMonths}>
            <FormLabel fontWeight="semibold">New Term (months)</FormLabel>
            <ModernInput type="number" placeholder="360" {...register('newTermMonths', { valueAsNumber: true })} />
            {errors.newTermMonths && <FormErrorMessage>{errors.newTermMonths.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.closingCosts}>
            <FormLabel fontWeight="semibold">Closing Costs ($)</FormLabel>
            <ModernInput type="number" placeholder="5000" {...register('closingCosts', { valueAsNumber: true })} />
            {errors.closingCosts && <FormErrorMessage>{errors.closingCosts.message}</FormErrorMessage>}
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{
        label: 'Monthly Savings',
        value: formatCurrency(results.monthlySavings),
      }}
      secondary={[
        { label: 'Break-Even', value: results.breakEvenMonths === Infinity ? 'Never' : `${results.breakEvenMonths} months` },
        { label: 'Lifetime Savings', value: formatCurrency(results.lifetimeSavings) },
        { label: 'Current Payment', value: formatCurrency(results.currentPayment) },
        { label: 'New Payment', value: formatCurrency(results.newPayment) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your current mortgage and refinance terms to see potential savings" />
  );

  return (
    <CalculatorShell
      title="Mortgage Refinance Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="refinance-results"
    />
  );
}
