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
import { PDFExportButton } from '@/components/calculators/shared/PDFExportButton';
import { formatCurrency } from '@/lib/calculators/engines/shared/math';
import {
  mortgageSchema,
  type MortgageFormData,
} from '@/lib/calculators/schemas/mortgage';
import {
  calculateMortgage,
  generateAmortization,
  type AmortizationRow,
} from '@/lib/calculators/engines/mortgage';

interface MortgageResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationRow[];
}

export default function MortgageCalculator() {
  const [results, setResults] = useState<MortgageResults | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MortgageFormData>({
    resolver: zodResolver(mortgageSchema),
  });

  const onSubmit = (data: MortgageFormData) => {
    const calc = calculateMortgage(data.amount, data.rate, data.years);
    const schedule = generateAmortization(
      data.amount,
      data.rate,
      data.years,
      data.startDate
    );
    setResults({ ...calc, schedule });
  };

  // ── Input panel ──
  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.amount}>
            <FormLabel fontWeight="semibold">Loan Amount ($)</FormLabel>
            <ModernInput
              type="number"
              placeholder="300000"
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && (
              <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.rate}>
            <FormLabel fontWeight="semibold">Interest Rate (%)</FormLabel>
            <ModernInput
              type="number"
              step="0.01"
              placeholder="4.5"
              {...register('rate', { valueAsNumber: true })}
            />
            {errors.rate && (
              <FormErrorMessage>{errors.rate.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.years}>
            <FormLabel fontWeight="semibold">Loan Term (Years)</FormLabel>
            <ModernInput
              type="number"
              placeholder="30"
              {...register('years', { valueAsNumber: true })}
            />
            {errors.years && (
              <FormErrorMessage>{errors.years.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.startDate}>
            <FormLabel fontWeight="semibold">Start Date</FormLabel>
            <ModernInput
              type="date"
              {...register('startDate', { valueAsDate: true })}
            />
            {errors.startDate && (
              <FormErrorMessage>{errors.startDate.message}</FormErrorMessage>
            )}
          </FormControl>

          <ModernButton type="submit" width="full" mt={2}>
            Calculate
          </ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  // ── Result panel ──
  const resultPanel = results ? (
    <ResultsSummary
      primary={{
        label: 'Monthly Payment',
        value: formatCurrency(results.monthlyPayment),
      }}
      secondary={[
        { label: 'Total Payment', value: formatCurrency(results.totalPayment) },
        { label: 'Total Interest', value: formatCurrency(results.totalInterest) },
      ]}
    />
  ) : (
    <EmptyState message="Enter loan details and click Calculate to see results" />
  );

  // ── Schedule panel ──
  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>
        Amortization Schedule
      </Heading>
      <Box maxH="600px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['#', 'Date', 'Principal', 'Interest', 'Balance']}
          data={results.schedule.map((row) => [
            row.paymentNum,
            row.date,
            formatCurrency(row.principalPaid),
            formatCurrency(row.interestPaid),
            formatCurrency(row.balance),
          ])}
        />
      </Box>
      <Box mt={6}>
        <PDFExportButton
          elementId="mortgage-results"
          filename="mortgage-calculation.pdf"
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Mortgage Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="mortgage-results"
    />
  );
}
