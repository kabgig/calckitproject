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
import { formatCurrency, formatNumber } from '@/lib/calculators/engines/shared/math';
import {
  rentVsBuySchema,
  type RentVsBuyFormData,
} from '@/lib/calculators/schemas/rent-vs-buy';
import {
  calculateRentVsBuy,
  type RentVsBuyResult,
  type RentVsBuyRow,
} from '@/lib/calculators/engines/rent-vs-buy';

interface Results {
  result: RentVsBuyResult;
  table: RentVsBuyRow[];
}

export default function RentVsBuyCalculator() {
  const [results, setResults] = useState<Results | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RentVsBuyFormData>({
    resolver: zodResolver(rentVsBuySchema),
    defaultValues: {
      rentIncrease: 3,
      downPaymentPercent: 20,
      termYears: 30,
      propertyTaxRate: 1.2,
      annualInsurance: 1500,
      maintenancePercent: 1,
      investmentReturn: 7,
      comparisonYears: 10,
    },
  });

  const onSubmit = (data: RentVsBuyFormData) => {
    const res = calculateRentVsBuy(
      data.monthlyRent, data.rentIncrease, data.homePrice,
      data.downPaymentPercent, data.rate, data.termYears,
      data.propertyTaxRate, data.annualInsurance,
      data.maintenancePercent, data.investmentReturn,
      data.comparisonYears
    );
    setResults(res);
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.monthlyRent}>
            <FormLabel fontWeight="semibold">Monthly Rent ($)</FormLabel>
            <ModernInput type="number" placeholder="2000" {...register('monthlyRent', { valueAsNumber: true })} />
            {errors.monthlyRent && <FormErrorMessage>{errors.monthlyRent.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.rentIncrease}>
            <FormLabel fontWeight="semibold">Annual Rent Increase (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="3" {...register('rentIncrease', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.homePrice}>
            <FormLabel fontWeight="semibold">Home Price ($)</FormLabel>
            <ModernInput type="number" placeholder="350000" {...register('homePrice', { valueAsNumber: true })} />
            {errors.homePrice && <FormErrorMessage>{errors.homePrice.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.downPaymentPercent}>
            <FormLabel fontWeight="semibold">Down Payment (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="20" {...register('downPaymentPercent', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.rate}>
            <FormLabel fontWeight="semibold">Mortgage Rate (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="6.5" {...register('rate', { valueAsNumber: true })} />
            {errors.rate && <FormErrorMessage>{errors.rate.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.termYears}>
            <FormLabel fontWeight="semibold">Loan Term (Years)</FormLabel>
            <ModernInput type="number" placeholder="30" {...register('termYears', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.propertyTaxRate}>
            <FormLabel fontWeight="semibold">Property Tax (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="1.2" {...register('propertyTaxRate', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.annualInsurance}>
            <FormLabel fontWeight="semibold">Annual Insurance ($)</FormLabel>
            <ModernInput type="number" placeholder="1500" {...register('annualInsurance', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.maintenancePercent}>
            <FormLabel fontWeight="semibold">Maintenance (%/yr)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="1" {...register('maintenancePercent', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.investmentReturn}>
            <FormLabel fontWeight="semibold">Investment Return (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="7" {...register('investmentReturn', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.comparisonYears}>
            <FormLabel fontWeight="semibold">Compare Over (Years)</FormLabel>
            <ModernInput type="number" placeholder="10" {...register('comparisonYears', { valueAsNumber: true })} />
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Compare</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{
        label: 'Break-Even Year',
        value: results.result.breakEvenYear ? `Year ${results.result.breakEvenYear}` : 'Never (in this period)',
      }}
      secondary={[
        { label: 'Total Rent Cost', value: formatCurrency(results.result.totalRentCost) },
        { label: 'Total Buy Cost', value: formatCurrency(results.result.totalBuyCost) },
        { label: 'Home Equity Built', value: formatCurrency(results.result.totalEquity) },
        { label: 'Net Buy Advantage', value: formatCurrency(results.result.netBuyAdvantage) },
      ]}
    />
  ) : (
    <EmptyState message="Enter rent and home purchase details to compare costs" />
  );

  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>Year-by-Year Comparison</Heading>
      <Box maxH="600px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['Year', 'Cumul. Rent', 'Cumul. Buy Cost', 'Equity', 'Net Buy Cost']}
          data={results.table.map((r) => [
            r.year, formatCurrency(r.cumulativeRent),
            formatCurrency(r.cumulativeBuyCost), formatCurrency(r.homeEquity),
            formatCurrency(r.netBuyCost),
          ])}
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Rent vs Buy Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="rent-vs-buy-results"
    />
  );
}
