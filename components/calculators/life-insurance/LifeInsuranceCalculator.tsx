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
  lifeInsuranceSchema,
  type LifeInsuranceFormData,
} from '@/lib/calculators/schemas/life-insurance';
import {
  calculateLifeInsurance,
  type LifeInsuranceResult,
} from '@/lib/calculators/engines/life-insurance';

export default function LifeInsuranceCalculator() {
  const [results, setResults] = useState<LifeInsuranceResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LifeInsuranceFormData>({
    resolver: zodResolver(lifeInsuranceSchema),
    defaultValues: { yearsToReplace: 10, childrenEducationCost: 0, finalExpenses: 15000, existingCoverage: 0 },
  });

  const onSubmit = (data: LifeInsuranceFormData) => {
    setResults(
      calculateLifeInsurance(
        data.annualIncome, data.yearsToReplace, data.totalDebt,
        data.childrenEducationCost, data.finalExpenses, data.existingCoverage
      )
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.annualIncome}>
            <FormLabel fontWeight="semibold">Annual Income ($)</FormLabel>
            <ModernInput type="number" placeholder="75000" {...register('annualIncome', { valueAsNumber: true })} />
            {errors.annualIncome && <FormErrorMessage>{errors.annualIncome.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.yearsToReplace}>
            <FormLabel fontWeight="semibold">Years to Replace Income</FormLabel>
            <ModernInput type="number" placeholder="10" {...register('yearsToReplace', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.totalDebt}>
            <FormLabel fontWeight="semibold">Outstanding Debts ($)</FormLabel>
            <ModernInput type="number" placeholder="200000" {...register('totalDebt', { valueAsNumber: true })} />
            {errors.totalDebt && <FormErrorMessage>{errors.totalDebt.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.childrenEducationCost}>
            <FormLabel fontWeight="semibold">Education Fund ($)</FormLabel>
            <ModernInput type="number" placeholder="100000" {...register('childrenEducationCost', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.finalExpenses}>
            <FormLabel fontWeight="semibold">Final Expenses ($)</FormLabel>
            <ModernInput type="number" placeholder="15000" {...register('finalExpenses', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.existingCoverage}>
            <FormLabel fontWeight="semibold">Existing Coverage ($)</FormLabel>
            <ModernInput type="number" placeholder="0" {...register('existingCoverage', { valueAsNumber: true })} />
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Additional Coverage Needed', value: formatCurrency(results.additionalNeeded) }}
      secondary={[
        { label: 'Total Need', value: formatCurrency(results.totalNeed) },
        { label: 'Income Replacement', value: formatCurrency(results.incomeReplacement) },
        { label: 'Debt Coverage', value: formatCurrency(results.debtCoverage) },
        { label: 'Education Fund', value: formatCurrency(results.educationFund) },
        { label: 'Final Expenses', value: formatCurrency(results.finalExpenses) },
        { label: 'Existing Coverage', value: formatCurrency(results.existingCoverage) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your financial details to calculate your life insurance need" />
  );

  return (
    <CalculatorShell
      title="Life Insurance Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="life-insurance-results"
    />
  );
}
