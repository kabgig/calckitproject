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
  Divider,
  Badge,
} from '@chakra-ui/react';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { CalculatorShell } from '@/components/calculators/CalculatorShell';
import { EmptyState, ResultRow } from '@/components/calculators/ResultCard';
import { formatCurrency } from '@/lib/calculators/engines/shared/math';
import {
  loanComparisonSchema,
  type LoanComparisonFormData,
} from '@/lib/calculators/schemas/loan-comparison';
import {
  compareTwoLoans,
  type LoanComparisonResult,
} from '@/lib/calculators/engines/loan-comparison';

export default function LoanComparisonCalculator() {
  const [results, setResults] = useState<LoanComparisonResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanComparisonFormData>({
    resolver: zodResolver(loanComparisonSchema),
    defaultValues: { feesA: 0, feesB: 0 },
  });

  const onSubmit = (data: LoanComparisonFormData) => {
    setResults(
      compareTwoLoans(
        data.amountA, data.rateA, data.monthsA, data.feesA,
        data.amountB, data.rateB, data.monthsB, data.feesB
      )
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <Text fontWeight="bold" fontSize="sm" color="purple.600" alignSelf="flex-start">
            Loan A
          </Text>
          <FormControl isInvalid={!!errors.amountA}>
            <FormLabel fontWeight="semibold">Amount ($)</FormLabel>
            <ModernInput type="number" placeholder="250000" {...register('amountA', { valueAsNumber: true })} />
            {errors.amountA && <FormErrorMessage>{errors.amountA.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.rateA}>
            <FormLabel fontWeight="semibold">Rate (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="6.5" {...register('rateA', { valueAsNumber: true })} />
            {errors.rateA && <FormErrorMessage>{errors.rateA.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.monthsA}>
            <FormLabel fontWeight="semibold">Term (months)</FormLabel>
            <ModernInput type="number" placeholder="360" {...register('monthsA', { valueAsNumber: true })} />
            {errors.monthsA && <FormErrorMessage>{errors.monthsA.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.feesA}>
            <FormLabel fontWeight="semibold">Fees ($)</FormLabel>
            <ModernInput type="number" placeholder="0" {...register('feesA', { valueAsNumber: true })} />
          </FormControl>

          <Divider />

          <Text fontWeight="bold" fontSize="sm" color="blue.600" alignSelf="flex-start">
            Loan B
          </Text>
          <FormControl isInvalid={!!errors.amountB}>
            <FormLabel fontWeight="semibold">Amount ($)</FormLabel>
            <ModernInput type="number" placeholder="250000" {...register('amountB', { valueAsNumber: true })} />
            {errors.amountB && <FormErrorMessage>{errors.amountB.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.rateB}>
            <FormLabel fontWeight="semibold">Rate (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="7.0" {...register('rateB', { valueAsNumber: true })} />
            {errors.rateB && <FormErrorMessage>{errors.rateB.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.monthsB}>
            <FormLabel fontWeight="semibold">Term (months)</FormLabel>
            <ModernInput type="number" placeholder="360" {...register('monthsB', { valueAsNumber: true })} />
            {errors.monthsB && <FormErrorMessage>{errors.monthsB.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.feesB}>
            <FormLabel fontWeight="semibold">Fees ($)</FormLabel>
            <ModernInput type="number" placeholder="0" {...register('feesB', { valueAsNumber: true })} />
          </FormControl>

          <ModernButton type="submit" width="full" mt={2}>
            Compare Loans
          </ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <VStack spacing={4} align="stretch">
      <ModernCard bg={results.cheaperLoan === 'A' ? 'green.50' : 'white'}>
        <Badge colorScheme="purple" mb={2}>Loan A</Badge>
        <ResultRow
          items={[
            { label: 'Monthly Payment', value: formatCurrency(results.loanA.monthlyPayment) },
            { label: 'Total Interest', value: formatCurrency(results.loanA.totalInterest) },
            { label: 'Total Cost', value: formatCurrency(results.loanA.totalCost) },
          ]}
        />
      </ModernCard>
      <ModernCard bg={results.cheaperLoan === 'B' ? 'green.50' : 'white'}>
        <Badge colorScheme="blue" mb={2}>Loan B</Badge>
        <ResultRow
          items={[
            { label: 'Monthly Payment', value: formatCurrency(results.loanB.monthlyPayment) },
            { label: 'Total Interest', value: formatCurrency(results.loanB.totalInterest) },
            { label: 'Total Cost', value: formatCurrency(results.loanB.totalCost) },
          ]}
        />
      </ModernCard>
      <ModernCard bg="brand.50" borderLeft="4px solid" borderLeftColor="brand.500">
        <Text fontWeight="bold" fontSize="lg" mb={1}>
          {results.cheaperLoan === 'equal'
            ? 'Both loans cost the same'
            : `Loan ${results.cheaperLoan} saves you ${formatCurrency(results.totalSavings)}`}
        </Text>
        <Text fontSize="sm" color="gray.600">
          Monthly difference: {formatCurrency(results.monthlySavings)}
        </Text>
      </ModernCard>
    </VStack>
  ) : (
    <EmptyState message="Enter two loan offers and click Compare to see which is cheaper" />
  );

  return (
    <CalculatorShell
      title="Loan Comparison Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="loan-comparison-results"
    />
  );
}
