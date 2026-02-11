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
  creditCardPayoffSchema,
  type CreditCardPayoffFormData,
} from '@/lib/calculators/schemas/credit-card-payoff';
import {
  calculateCCPayoff,
  generateCCSchedule,
  type CCPayoffResult,
  type CCPayoffRow,
} from '@/lib/calculators/engines/credit-card-payoff';

interface Results extends CCPayoffResult {
  schedule: CCPayoffRow[];
}

export default function CreditCardPayoffCalculator() {
  const [results, setResults] = useState<Results | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreditCardPayoffFormData>({
    resolver: zodResolver(creditCardPayoffSchema),
  });

  const onSubmit = (data: CreditCardPayoffFormData) => {
    const calc = calculateCCPayoff(data.balance, data.apr, data.monthlyPayment);
    const schedule = generateCCSchedule(data.balance, data.apr, data.monthlyPayment, new Date());
    setResults({ ...calc, schedule });
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.balance}>
            <FormLabel fontWeight="semibold">Credit Card Balance ($)</FormLabel>
            <ModernInput type="number" placeholder="5000" {...register('balance', { valueAsNumber: true })} />
            {errors.balance && <FormErrorMessage>{errors.balance.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.apr}>
            <FormLabel fontWeight="semibold">APR (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="22.99" {...register('apr', { valueAsNumber: true })} />
            {errors.apr && <FormErrorMessage>{errors.apr.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.monthlyPayment}>
            <FormLabel fontWeight="semibold">Monthly Payment ($)</FormLabel>
            <ModernInput type="number" placeholder="200" {...register('monthlyPayment', { valueAsNumber: true })} />
            {errors.monthlyPayment && <FormErrorMessage>{errors.monthlyPayment.message}</FormErrorMessage>}
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{
        label: 'Months to Pay Off',
        value: results.monthsToPayoff === Infinity ? 'Never' : `${results.monthsToPayoff} months`,
      }}
      secondary={[
        { label: 'Total Interest', value: results.totalInterest === Infinity ? 'N/A' : formatCurrency(results.totalInterest) },
        { label: 'Total Paid', value: results.totalPaid === Infinity ? 'N/A' : formatCurrency(results.totalPaid) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your credit card details to see your payoff timeline" />
  );

  const schedulePanel = results && results.monthsToPayoff !== Infinity ? (
    <>
      <Heading size="md" mb={4}>Payment Schedule</Heading>
      <Box maxH="600px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['Month', 'Date', 'Payment', 'Principal', 'Interest', 'Balance']}
          data={results.schedule.map((r) => [
            r.month, r.date, formatCurrency(r.payment),
            formatCurrency(r.principalPaid), formatCurrency(r.interestPaid),
            formatCurrency(r.balance),
          ])}
        />
      </Box>
      <Box mt={6}>
        <PDFExportButton elementId="cc-payoff-results" filename="credit-card-payoff.pdf" />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Credit Card Payoff Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="cc-payoff-results"
    />
  );
}
