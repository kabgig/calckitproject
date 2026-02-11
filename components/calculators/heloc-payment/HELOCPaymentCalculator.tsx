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
  helocPaymentSchema,
  type HELOCPaymentFormData,
} from '@/lib/calculators/schemas/heloc-payment';
import {
  calculateHELOC,
  type HELOCResult,
} from '@/lib/calculators/engines/heloc-payment';

export default function HELOCPaymentCalculator() {
  const [results, setResults] = useState<HELOCResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HELOCPaymentFormData>({
    resolver: zodResolver(helocPaymentSchema),
  });

  const onSubmit = (data: HELOCPaymentFormData) => {
    setResults(calculateHELOC(data.drawAmount, data.annualRate, data.repaymentYears));
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.drawAmount}>
            <FormLabel fontWeight="semibold">Draw Amount ($)</FormLabel>
            <ModernInput type="number" placeholder="50000" {...register('drawAmount', { valueAsNumber: true })} />
            {errors.drawAmount && <FormErrorMessage>{errors.drawAmount.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.annualRate}>
            <FormLabel fontWeight="semibold">Interest Rate (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="8.5" {...register('annualRate', { valueAsNumber: true })} />
            {errors.annualRate && <FormErrorMessage>{errors.annualRate.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.repaymentYears}>
            <FormLabel fontWeight="semibold">Repayment Period (Years)</FormLabel>
            <ModernInput type="number" placeholder="10" {...register('repaymentYears', { valueAsNumber: true })} />
            {errors.repaymentYears && <FormErrorMessage>{errors.repaymentYears.message}</FormErrorMessage>}
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Monthly Payment', value: formatCurrency(results.monthlyPayment) }}
      secondary={[
        { label: 'Total Interest', value: formatCurrency(results.totalInterest) },
        { label: 'Total Paid', value: formatCurrency(results.totalPaid) },
        { label: 'Draw Amount', value: formatCurrency(results.drawAmount) },
      ]}
    />
  ) : (
    <EmptyState message="Enter your HELOC details to calculate monthly payments" />
  );

  return (
    <CalculatorShell
      title="HELOC Payment Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="heloc-results"
    />
  );
}
