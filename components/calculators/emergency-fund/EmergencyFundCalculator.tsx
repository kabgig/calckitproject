'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Text,
  Progress,
} from '@chakra-ui/react';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { CalculatorShell } from '@/components/calculators/CalculatorShell';
import { ResultsSummary, EmptyState } from '@/components/calculators/ResultCard';
import { formatCurrency } from '@/lib/calculators/engines/shared/math';
import {
  emergencyFundSchema,
  type EmergencyFundFormData,
} from '@/lib/calculators/schemas/emergency-fund';
import {
  calculateEmergencyFund,
  type EmergencyFundResult,
} from '@/lib/calculators/engines/emergency-fund';

export default function EmergencyFundCalculator() {
  const [results, setResults] = useState<EmergencyFundResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmergencyFundFormData>({
    resolver: zodResolver(emergencyFundSchema),
    defaultValues: { monthsCoverage: 6 },
  });

  const onSubmit = (data: EmergencyFundFormData) => {
    setResults(
      calculateEmergencyFund(data.monthlyExpenses, data.monthsCoverage, data.currentSavings, data.monthlySavingsRate)
    );
  };

  const progressPct = results
    ? Math.min(100, ((results.targetFund - results.currentShortfall) / results.targetFund) * 100)
    : 0;

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.monthlyExpenses}>
            <FormLabel fontWeight="semibold">Monthly Expenses ($)</FormLabel>
            <ModernInput type="number" placeholder="4000" {...register('monthlyExpenses', { valueAsNumber: true })} />
            {errors.monthlyExpenses && <FormErrorMessage>{errors.monthlyExpenses.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.monthsCoverage}>
            <FormLabel fontWeight="semibold">Months of Coverage</FormLabel>
            <ModernInput type="number" placeholder="6" {...register('monthsCoverage', { valueAsNumber: true })} />
            {errors.monthsCoverage && <FormErrorMessage>{errors.monthsCoverage.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.currentSavings}>
            <FormLabel fontWeight="semibold">Current Savings ($)</FormLabel>
            <ModernInput type="number" placeholder="5000" {...register('currentSavings', { valueAsNumber: true })} />
            {errors.currentSavings && <FormErrorMessage>{errors.currentSavings.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.monthlySavingsRate}>
            <FormLabel fontWeight="semibold">Monthly Savings Rate ($)</FormLabel>
            <ModernInput type="number" placeholder="500" {...register('monthlySavingsRate', { valueAsNumber: true })} />
            {errors.monthlySavingsRate && <FormErrorMessage>{errors.monthlySavingsRate.message}</FormErrorMessage>}
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <VStack spacing={4} align="stretch">
      <ResultsSummary
        primary={{ label: 'Target Fund', value: formatCurrency(results.targetFund) }}
        secondary={[
          { label: 'Current Shortfall', value: formatCurrency(results.currentShortfall) },
          { label: 'Months to Goal', value: results.monthsToGoal === Infinity ? 'N/A' : `${results.monthsToGoal} months` },
        ]}
      />
      <ModernCard>
        <Text fontWeight="semibold" mb={2}>Progress</Text>
        <Progress value={progressPct} colorScheme="green" borderRadius="full" size="lg" />
        <Text fontSize="sm" color="gray.500" mt={1}>{progressPct.toFixed(0)}% funded</Text>
      </ModernCard>
    </VStack>
  ) : (
    <EmptyState message="Enter your expenses and savings to see your emergency fund target" />
  );

  return (
    <CalculatorShell
      title="Emergency Fund Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="emergency-fund-results"
    />
  );
}
