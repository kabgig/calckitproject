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
  millionaireSchema,
  type MillionaireFormData,
} from '@/lib/calculators/schemas/millionaire-calculator';
import {
  calculateMillionaire,
  type MillionaireResult,
} from '@/lib/calculators/engines/millionaire-calculator';

export default function MillionaireCalculator() {
  const [results, setResults] = useState<MillionaireResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MillionaireFormData>({
    resolver: zodResolver(millionaireSchema),
    defaultValues: { targetAmount: 1_000_000 },
  });

  const onSubmit = (data: MillionaireFormData) => {
    setResults(
      calculateMillionaire(data.currentSavings, data.monthlyContribution, data.annualReturn, data.targetAmount)
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.currentSavings}>
            <FormLabel fontWeight="semibold">Current Savings ($)</FormLabel>
            <ModernInput type="number" placeholder="10000" {...register('currentSavings', { valueAsNumber: true })} />
            {errors.currentSavings && <FormErrorMessage>{errors.currentSavings.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.monthlyContribution}>
            <FormLabel fontWeight="semibold">Monthly Contribution ($)</FormLabel>
            <ModernInput type="number" placeholder="500" {...register('monthlyContribution', { valueAsNumber: true })} />
            {errors.monthlyContribution && <FormErrorMessage>{errors.monthlyContribution.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.annualReturn}>
            <FormLabel fontWeight="semibold">Annual Return (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="8" {...register('annualReturn', { valueAsNumber: true })} />
            {errors.annualReturn && <FormErrorMessage>{errors.annualReturn.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.targetAmount}>
            <FormLabel fontWeight="semibold">Target Amount ($)</FormLabel>
            <ModernInput type="number" placeholder="1000000" {...register('targetAmount', { valueAsNumber: true })} />
            {errors.targetAmount && <FormErrorMessage>{errors.targetAmount.message}</FormErrorMessage>}
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{
        label: 'Years to Target',
        value: results.yearsToMillion === Infinity ? '100+ years' : `${results.yearsToMillion} years`,
      }}
      secondary={[
        { label: 'Final Balance', value: formatCurrency(results.finalBalance) },
        { label: 'Total Contributions', value: formatCurrency(results.totalContributions) },
        { label: 'Total Interest Earned', value: formatCurrency(results.totalInterest) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your savings plan to see when you'll hit your target" />
  );

  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>Growth Schedule</Heading>
      <Box maxH="600px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['Year', 'Start Balance', 'Contributions', 'Interest', 'End Balance']}
          data={results.schedule.map((r) => [
            r.year, formatCurrency(r.startBalance), formatCurrency(r.contribution),
            formatCurrency(r.interest), formatCurrency(r.endBalance),
          ])}
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Millionaire Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="millionaire-results"
    />
  );
}
