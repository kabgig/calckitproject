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
import { formatCurrency } from '@/lib/calculators/engines/shared/math';
import {
  savingsGoalSchema,
  type SavingsGoalFormData,
} from '@/lib/calculators/schemas/savings-goal';
import {
  calculateSavingsGoal,
  type SavingsGoalResult,
} from '@/lib/calculators/engines/savings-goal';

export default function SavingsGoalCalculator() {
  const [results, setResults] = useState<SavingsGoalResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SavingsGoalFormData>({
    resolver: zodResolver(savingsGoalSchema),
  });

  const onSubmit = (data: SavingsGoalFormData) => {
    setResults(
      calculateSavingsGoal(data.goalAmount, data.currentSavings, data.monthlyContribution, data.annualReturn)
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.goalAmount}>
            <FormLabel fontWeight="semibold">Savings Goal ($)</FormLabel>
            <ModernInput type="number" placeholder="20000" {...register('goalAmount', { valueAsNumber: true })} />
            {errors.goalAmount && <FormErrorMessage>{errors.goalAmount.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.currentSavings}>
            <FormLabel fontWeight="semibold">Current Savings ($)</FormLabel>
            <ModernInput type="number" placeholder="2000" {...register('currentSavings', { valueAsNumber: true })} />
            {errors.currentSavings && <FormErrorMessage>{errors.currentSavings.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.monthlyContribution}>
            <FormLabel fontWeight="semibold">Monthly Contribution ($)</FormLabel>
            <ModernInput type="number" placeholder="500" {...register('monthlyContribution', { valueAsNumber: true })} />
            {errors.monthlyContribution && <FormErrorMessage>{errors.monthlyContribution.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.annualReturn}>
            <FormLabel fontWeight="semibold">Annual Return (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="5" {...register('annualReturn', { valueAsNumber: true })} />
            {errors.annualReturn && <FormErrorMessage>{errors.annualReturn.message}</FormErrorMessage>}
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{
        label: 'Time to Goal',
        value: results.months === Infinity ? 'Cannot reach goal' : `${results.months} months (${(results.months / 12).toFixed(1)} yrs)`,
      }}
      secondary={[
        { label: 'Total Contributions', value: formatCurrency(results.totalContributions) },
        { label: 'Interest Earned', value: formatCurrency(results.totalInterest) },
        { label: 'Min Monthly Needed', value: formatCurrency(results.monthlyRequired) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your savings goal and monthly contribution to see your timeline" />
  );

  return (
    <CalculatorShell
      title="Savings Goal Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="savings-goal-results"
    />
  );
}
