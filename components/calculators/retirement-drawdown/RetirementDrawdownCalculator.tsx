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
import { formatCurrency } from '@/lib/calculators/engines/shared/math';
import {
  retirementDrawdownSchema,
  type RetirementDrawdownFormData,
} from '@/lib/calculators/schemas/retirement-drawdown';
import {
  calculateDrawdown,
  type DrawdownResult,
} from '@/lib/calculators/engines/retirement-drawdown';

export default function RetirementDrawdownCalculator() {
  const [results, setResults] = useState<DrawdownResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RetirementDrawdownFormData>({
    resolver: zodResolver(retirementDrawdownSchema),
    defaultValues: { inflationRate: 2 },
  });

  const onSubmit = (data: RetirementDrawdownFormData) => {
    setResults(
      calculateDrawdown(
        data.currentAge, data.retirementBalance, data.annualWithdrawal,
        data.annualReturn, data.inflationRate
      )
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.currentAge}>
            <FormLabel fontWeight="semibold">Retirement Age</FormLabel>
            <ModernInput type="number" placeholder="65" {...register('currentAge', { valueAsNumber: true })} />
            {errors.currentAge && <FormErrorMessage>{errors.currentAge.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.retirementBalance}>
            <FormLabel fontWeight="semibold">Retirement Balance ($)</FormLabel>
            <ModernInput type="number" placeholder="1000000" {...register('retirementBalance', { valueAsNumber: true })} />
            {errors.retirementBalance && <FormErrorMessage>{errors.retirementBalance.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.annualWithdrawal}>
            <FormLabel fontWeight="semibold">Annual Withdrawal ($)</FormLabel>
            <ModernInput type="number" placeholder="40000" {...register('annualWithdrawal', { valueAsNumber: true })} />
            {errors.annualWithdrawal && <FormErrorMessage>{errors.annualWithdrawal.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.annualReturn}>
            <FormLabel fontWeight="semibold">Annual Return (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="5" {...register('annualReturn', { valueAsNumber: true })} />
            {errors.annualReturn && <FormErrorMessage>{errors.annualReturn.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.inflationRate}>
            <FormLabel fontWeight="semibold">Inflation Rate (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="2" {...register('inflationRate', { valueAsNumber: true })} />
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{
        label: 'Money Lasts Until Age',
        value: `${results.ageMoneyRunsOut}`,
      }}
      secondary={[
        { label: 'Years of Income', value: `${results.yearsLastsUntil} years` },
        { label: 'Total Withdrawn', value: formatCurrency(results.totalWithdrawn) },
        { label: 'Interest Earned', value: formatCurrency(results.totalInterestEarned) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your retirement details to see how long your money will last" />
  );

  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>Drawdown Schedule</Heading>
      <Box maxH="600px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['Year', 'Age', 'Start Balance', 'Withdrawal', 'Interest', 'End Balance']}
          data={results.schedule.map((r) => [
            r.year, r.age, formatCurrency(r.startBalance),
            formatCurrency(r.withdrawal), formatCurrency(r.interest),
            formatCurrency(r.endBalance),
          ])}
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Retirement Drawdown Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="drawdown-results"
    />
  );
}
