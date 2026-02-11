'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Box,
  Progress,
} from '@chakra-ui/react';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { CalculatorShell } from '@/components/calculators/CalculatorShell';
import { EmptyState } from '@/components/calculators/ResultCard';
import { formatCurrency } from '@/lib/calculators/engines/shared/math';
import { budgetSchema, type BudgetFormData } from '@/lib/calculators/schemas/budget';
import { calculateBudget, type BudgetBreakdown } from '@/lib/calculators/engines/budget';

export default function BudgetCalculator() {
  const [results, setResults] = useState<BudgetBreakdown | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: { needsPercent: 50, wantsPercent: 30, savingsPercent: 20 },
  });

  const onSubmit = (data: BudgetFormData) => {
    setResults(calculateBudget(data.monthlyIncome, data.needsPercent, data.wantsPercent, data.savingsPercent));
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.monthlyIncome}>
            <FormLabel fontWeight="semibold">Monthly Income ($)</FormLabel>
            <ModernInput type="number" placeholder="5000" {...register('monthlyIncome', { valueAsNumber: true })} />
            {errors.monthlyIncome && <FormErrorMessage>{errors.monthlyIncome.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.needsPercent}>
            <FormLabel fontWeight="semibold">Needs (%)</FormLabel>
            <ModernInput type="number" placeholder="50" {...register('needsPercent', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.wantsPercent}>
            <FormLabel fontWeight="semibold">Wants (%)</FormLabel>
            <ModernInput type="number" placeholder="30" {...register('wantsPercent', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.savingsPercent}>
            <FormLabel fontWeight="semibold">Savings (%)</FormLabel>
            <ModernInput type="number" placeholder="20" {...register('savingsPercent', { valueAsNumber: true })} />
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate Budget</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <VStack spacing={4} align="stretch">
      <ModernCard>
        <Text fontSize="sm" color="gray.500" mb={1}>Monthly Income</Text>
        <Text fontSize="2xl" fontWeight="bold" color="brand.600">{formatCurrency(results.totalIncome)}</Text>
      </ModernCard>
      {[
        { label: 'Needs', value: results.needs, pct: results.needsPercent, color: 'red' },
        { label: 'Wants', value: results.wants, pct: results.wantsPercent, color: 'orange' },
        { label: 'Savings', value: results.savings, pct: results.savingsPercent, color: 'green' },
      ].map((item) => (
        <ModernCard key={item.label}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Text fontWeight="semibold">{item.label} ({item.pct}%)</Text>
            <Text fontWeight="bold" color="brand.600">{formatCurrency(item.value)}</Text>
          </Box>
          <Progress value={item.pct} colorScheme={item.color} borderRadius="full" size="sm" />
        </ModernCard>
      ))}
    </VStack>
  ) : (
    <EmptyState message="Enter your monthly income to see a 50/30/20 budget breakdown" />
  );

  return (
    <CalculatorShell
      title="Budget Calculator (50/30/20)"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="budget-results"
    />
  );
}
