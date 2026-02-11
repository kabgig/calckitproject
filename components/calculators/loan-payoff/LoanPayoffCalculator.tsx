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
import { formatCurrency, formatNumber } from '@/lib/calculators/engines/shared/math';
import {
  loanPayoffSchema,
  type LoanPayoffFormData,
} from '@/lib/calculators/schemas/loan-payoff';
import {
  calculatePayoff,
  generatePayoffSchedule,
  type LoanPayoffResult,
  type PayoffScheduleRow,
} from '@/lib/calculators/engines/loan-payoff';

interface Results extends LoanPayoffResult {
  schedule: PayoffScheduleRow[];
}

export default function LoanPayoffCalculator() {
  const [results, setResults] = useState<Results | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanPayoffFormData>({
    resolver: zodResolver(loanPayoffSchema),
    defaultValues: { extraPayment: 200 },
  });

  const onSubmit = (data: LoanPayoffFormData) => {
    const calc = calculatePayoff(data.balance, data.rate, data.remainingMonths, data.extraPayment);
    const schedule = generatePayoffSchedule(data.balance, data.rate, data.remainingMonths, data.extraPayment, data.startDate);
    setResults({ ...calc, schedule });
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.balance}>
            <FormLabel fontWeight="semibold">Current Balance ($)</FormLabel>
            <ModernInput type="number" placeholder="150000" {...register('balance', { valueAsNumber: true })} />
            {errors.balance && <FormErrorMessage>{errors.balance.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.rate}>
            <FormLabel fontWeight="semibold">Interest Rate (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="6.5" {...register('rate', { valueAsNumber: true })} />
            {errors.rate && <FormErrorMessage>{errors.rate.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.remainingMonths}>
            <FormLabel fontWeight="semibold">Remaining Months</FormLabel>
            <ModernInput type="number" placeholder="240" {...register('remainingMonths', { valueAsNumber: true })} />
            {errors.remainingMonths && <FormErrorMessage>{errors.remainingMonths.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.extraPayment}>
            <FormLabel fontWeight="semibold">Extra Monthly Payment ($)</FormLabel>
            <ModernInput type="number" placeholder="200" {...register('extraPayment', { valueAsNumber: true })} />
            {errors.extraPayment && <FormErrorMessage>{errors.extraPayment.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.startDate}>
            <FormLabel fontWeight="semibold">Start Date</FormLabel>
            <ModernInput type="date" {...register('startDate', { valueAsDate: true })} />
            {errors.startDate && <FormErrorMessage>{errors.startDate.message}</FormErrorMessage>}
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Interest Saved', value: formatCurrency(results.interestSaved) }}
      secondary={[
        { label: 'Months Saved', value: formatNumber(results.monthsSaved) },
        { label: 'New Payoff', value: `${results.newMonths} months` },
        { label: 'Original Interest', value: formatCurrency(results.originalTotalInterest) },
        { label: 'New Interest', value: formatCurrency(results.newTotalInterest) },
      ]}
    />
  ) : (
    <EmptyState message="Enter loan details and extra payment to see how much you save" />
  );

  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>Accelerated Payoff Schedule</Heading>
      <Box maxH="600px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['#', 'Date', 'Payment', 'Principal', 'Interest', 'Balance']}
          data={results.schedule.map((r) => [
            r.paymentNum, r.date, formatCurrency(r.payment),
            formatCurrency(r.principalPaid), formatCurrency(r.interestPaid),
            formatCurrency(r.balance),
          ])}
        />
      </Box>
      <Box mt={6}>
        <PDFExportButton elementId="loan-payoff-results" filename="loan-payoff.pdf" />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Loan Payoff Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="loan-payoff-results"
    />
  );
}
