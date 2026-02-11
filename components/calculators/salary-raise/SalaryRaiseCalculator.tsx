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
  salaryRaiseSchema,
  type SalaryRaiseFormData,
} from '@/lib/calculators/schemas/salary-raise';
import {
  calculateSalaryRaise,
  type SalaryRaiseResult,
} from '@/lib/calculators/engines/salary-raise';

export default function SalaryRaiseCalculator() {
  const [results, setResults] = useState<SalaryRaiseResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SalaryRaiseFormData>({ resolver: zodResolver(salaryRaiseSchema) });

  const onSubmit = (data: SalaryRaiseFormData) => {
    setResults(calculateSalaryRaise(data.currentSalary, data.raisePercent));
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.currentSalary}>
            <FormLabel fontWeight="semibold">Current Salary ($)</FormLabel>
            <ModernInput type="number" placeholder="75000" {...register('currentSalary', { valueAsNumber: true })} />
            {errors.currentSalary && <FormErrorMessage>{errors.currentSalary.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.raisePercent}>
            <FormLabel fontWeight="semibold">Raise (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="5" {...register('raisePercent', { valueAsNumber: true })} />
            {errors.raisePercent && <FormErrorMessage>{errors.raisePercent.message}</FormErrorMessage>}
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'New Salary', value: formatCurrency(results.newSalary) }}
      secondary={[
        { label: 'Old Salary', value: formatCurrency(results.oldSalary) },
        { label: 'Annual Raise', value: formatCurrency(results.raiseAmount) },
        { label: 'Monthly Increase', value: formatCurrency(results.monthlyIncrease) },
        { label: 'New Monthly', value: formatCurrency(results.newMonthly) },
        { label: 'Raise %', value: formatPercent(results.raisePercent, 1) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your current salary and raise percentage" />
  );

  return (
    <CalculatorShell
      title="Salary Raise Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="salary-raise-results"
    />
  );
}
