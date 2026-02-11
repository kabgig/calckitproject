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
import { formatCurrency, formatPercent } from '@/lib/calculators/engines/shared/math';
import { roiSchema, type ROIFormData } from '@/lib/calculators/schemas/roi';
import { calculateROI, type ROIResult } from '@/lib/calculators/engines/roi';

export default function ROICalculator() {
  const [results, setResults] = useState<ROIResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ROIFormData>({ resolver: zodResolver(roiSchema) });

  const onSubmit = (data: ROIFormData) => {
    setResults(calculateROI(data.initialInvestment, data.finalValue, data.years));
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.initialInvestment}>
            <FormLabel fontWeight="semibold">Initial Investment ($)</FormLabel>
            <ModernInput type="number" placeholder="10000" {...register('initialInvestment', { valueAsNumber: true })} />
            {errors.initialInvestment && <FormErrorMessage>{errors.initialInvestment.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.finalValue}>
            <FormLabel fontWeight="semibold">Final Value ($)</FormLabel>
            <ModernInput type="number" placeholder="15000" {...register('finalValue', { valueAsNumber: true })} />
            {errors.finalValue && <FormErrorMessage>{errors.finalValue.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.years}>
            <FormLabel fontWeight="semibold">Time Period (Years)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="5" {...register('years', { valueAsNumber: true })} />
            {errors.years && <FormErrorMessage>{errors.years.message}</FormErrorMessage>}
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate ROI</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Total ROI', value: formatPercent(results.roi, 2) }}
      secondary={[
        { label: 'Net Profit', value: formatCurrency(results.netProfit) },
        { label: 'Annualized ROI', value: formatPercent(results.annualizedROI, 2) },
        { label: 'Total Return', value: formatCurrency(results.totalReturn) },
      ]}
    />
  ) : (
    <EmptyState message="Enter investment details to calculate your return on investment" />
  );

  return (
    <CalculatorShell
      title="ROI Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="roi-results"
    />
  );
}
