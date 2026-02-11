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
import { formatCurrency, formatPercent } from '@/lib/calculators/engines/shared/math';
import {
  incomeTaxSchema,
  type IncomeTaxFormData,
} from '@/lib/calculators/schemas/income-tax';
import {
  calculateIncomeTax,
  type IncomeTaxResult,
} from '@/lib/calculators/engines/income-tax';

export default function IncomeTaxCalculator() {
  const [results, setResults] = useState<IncomeTaxResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncomeTaxFormData>({
    resolver: zodResolver(incomeTaxSchema),
    defaultValues: { deductions: 0 },
  });

  const onSubmit = (data: IncomeTaxFormData) => {
    setResults(calculateIncomeTax(data.grossIncome, data.deductions));
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.grossIncome}>
            <FormLabel fontWeight="semibold">Annual Gross Income ($)</FormLabel>
            <ModernInput type="number" placeholder="85000" {...register('grossIncome', { valueAsNumber: true })} />
            {errors.grossIncome && <FormErrorMessage>{errors.grossIncome.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.deductions}>
            <FormLabel fontWeight="semibold">Deductions ($ — 0 = standard)</FormLabel>
            <ModernInput type="number" placeholder="0" {...register('deductions', { valueAsNumber: true })} />
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Federal Tax', value: formatCurrency(results.totalFederalTax) }}
      secondary={[
        { label: 'Effective Rate', value: formatPercent(results.effectiveRate, 2) },
        { label: 'Marginal Rate', value: `${results.marginalRate}%` },
        { label: 'Taxable Income', value: formatCurrency(results.taxableIncome) },
        { label: 'After-Tax Income', value: formatCurrency(results.afterTaxIncome) },
        { label: 'Monthly After-Tax', value: formatCurrency(results.monthlyAfterTax) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your gross income to calculate federal income tax (2025 brackets)" />
  );

  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>Tax Bracket Breakdown</Heading>
      <Box maxH="400px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['Bracket', 'Rate', 'Taxable Amount', 'Tax']}
          data={results.brackets.map((b) => [
            b.bracket, `${b.rate}%`, formatCurrency(b.taxableInBracket), formatCurrency(b.taxInBracket),
          ])}
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Income Tax Calculator (2025)"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="income-tax-results"
    />
  );
}
