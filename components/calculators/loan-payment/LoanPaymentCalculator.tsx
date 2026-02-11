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
  loanPaymentSchema,
  type LoanPaymentFormData,
} from '@/lib/calculators/schemas/loan-payment';
import {
  calculateLoanPayment,
  generateLoanSchedule,
  type LoanScheduleRow,
} from '@/lib/calculators/engines/loan-payment';

interface LoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: LoanScheduleRow[];
}

export default function LoanPaymentCalculator() {
  const [results, setResults] = useState<LoanResults | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanPaymentFormData>({
    resolver: zodResolver(loanPaymentSchema),
  });

  const onSubmit = (data: LoanPaymentFormData) => {
    const calc = calculateLoanPayment(data.amount, data.rate, data.months);
    const schedule = generateLoanSchedule(
      data.amount,
      data.rate,
      data.months,
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
              placeholder="25000"
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
              placeholder="6.5"
              {...register('rate', { valueAsNumber: true })}
            />
            {errors.rate && (
              <FormErrorMessage>{errors.rate.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.months}>
            <FormLabel fontWeight="semibold">Loan Term (Months)</FormLabel>
            <ModernInput
              type="number"
              placeholder="60"
              {...register('months', { valueAsNumber: true })}
            />
            {errors.months && (
              <FormErrorMessage>{errors.months.message}</FormErrorMessage>
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
        Payment Schedule
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
          elementId="loan-payment-results"
          filename="loan-payment-calculation.pdf"
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Loan Payment Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="loan-payment-results"
    />
  );
}
