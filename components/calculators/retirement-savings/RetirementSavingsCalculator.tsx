'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Box,
} from '@chakra-ui/react';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { ModernTable } from '@/components/ui/ModernTable';
import { CalculatorShell } from '@/components/calculators/CalculatorShell';
import { ResultsSummary, EmptyState } from '@/components/calculators/ResultCard';
import { formatCurrency, formatNumber } from '@/lib/calculators/engines/shared/math';
import {
  retirementSavingsSchema,
  type RetirementSavingsFormData,
} from '@/lib/calculators/schemas/retirement-savings';
import {
  calculateRetirementSavings,
  type RetirementSavingsResult,
} from '@/lib/calculators/engines/retirement-savings';

export default function RetirementSavingsCalculator() {
  const [results, setResults] = useState<RetirementSavingsResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RetirementSavingsFormData>({
    resolver: zodResolver(retirementSavingsSchema),
    defaultValues: { annualContributionIncrease: 0 },
  });

  const onSubmit = (data: RetirementSavingsFormData) => {
    setResults(
      calculateRetirementSavings(
        data.currentAge, data.retirementAge, data.currentSavings,
        data.monthlyContribution, data.annualReturn, data.annualContributionIncrease
      )
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.currentAge}>
            <FormLabel fontWeight="semibold">Current Age</FormLabel>
            <ModernInput type="number" placeholder="30" {...register('currentAge', { valueAsNumber: true })} />
            {errors.currentAge && <FormErrorMessage>{errors.currentAge.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.retirementAge}>
            <FormLabel fontWeight="semibold">Retirement Age</FormLabel>
            <ModernInput type="number" placeholder="65" {...register('retirementAge', { valueAsNumber: true })} />
            {errors.retirementAge && <FormErrorMessage>{errors.retirementAge.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.currentSavings}>
            <FormLabel fontWeight="semibold">Current Savings ($)</FormLabel>
            <ModernInput type="number" placeholder="50000" {...register('currentSavings', { valueAsNumber: true })} />
            {errors.currentSavings && <FormErrorMessage>{errors.currentSavings.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.monthlyContribution}>
            <FormLabel fontWeight="semibold">Monthly Contribution ($)</FormLabel>
            <ModernInput type="number" placeholder="500" {...register('monthlyContribution', { valueAsNumber: true })} />
            {errors.monthlyContribution && <FormErrorMessage>{errors.monthlyContribution.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.annualReturn}>
            <FormLabel fontWeight="semibold">Annual Return (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="7" {...register('annualReturn', { valueAsNumber: true })} />
            {errors.annualReturn && <FormErrorMessage>{errors.annualReturn.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.annualContributionIncrease}>
            <FormLabel fontWeight="semibold">Annual Raise (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="2" {...register('annualContributionIncrease', { valueAsNumber: true })} />
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Retirement Balance', value: formatCurrency(results.futureValue) }}
      secondary={[
        { label: 'Years to Retirement', value: `${results.yearsToRetirement}` },
        { label: 'Total Contributions', value: formatCurrency(results.totalContributions) },
        { label: 'Total Interest Earned', value: formatCurrency(results.totalInterest) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your age and savings details to project your retirement balance" />
  );

  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>Year-by-Year Growth</Heading>
      <Box maxH="600px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['Year', 'Age', 'Start Balance', 'Contributions', 'Interest', 'End Balance']}
          data={results.schedule.map((r) => [
            r.year, r.age, formatCurrency(r.startBalance),
            formatCurrency(r.contribution), formatCurrency(r.interest),
            formatCurrency(r.endBalance),
          ])}
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Retirement Savings Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="retirement-savings-results"
    />
  );
}
