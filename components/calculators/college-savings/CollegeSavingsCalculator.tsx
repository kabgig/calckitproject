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
  collegeSavingsSchema,
  type CollegeSavingsFormData,
} from '@/lib/calculators/schemas/college-savings';
import {
  calculateCollegeSavings,
  type CollegeSavingsResult,
} from '@/lib/calculators/engines/college-savings';

export default function CollegeSavingsCalculator() {
  const [results, setResults] = useState<CollegeSavingsResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CollegeSavingsFormData>({
    resolver: zodResolver(collegeSavingsSchema),
    defaultValues: {
      collegeStartAge: 18,
      yearsInCollege: 4,
      collegeCostInflation: 5,
    },
  });

  const onSubmit = (data: CollegeSavingsFormData) => {
    setResults(
      calculateCollegeSavings(
        data.childAge, data.collegeStartAge, data.annualCollegeCost,
        data.yearsInCollege, data.currentSavings, data.monthlyContribution,
        data.annualReturn, data.collegeCostInflation
      )
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.childAge}>
            <FormLabel fontWeight="semibold">Child&apos;s Age</FormLabel>
            <ModernInput type="number" placeholder="5" {...register('childAge', { valueAsNumber: true })} />
            {errors.childAge && <FormErrorMessage>{errors.childAge.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.collegeStartAge}>
            <FormLabel fontWeight="semibold">College Start Age</FormLabel>
            <ModernInput type="number" placeholder="18" {...register('collegeStartAge', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.annualCollegeCost}>
            <FormLabel fontWeight="semibold">Annual College Cost (Today $)</FormLabel>
            <ModernInput type="number" placeholder="25000" {...register('annualCollegeCost', { valueAsNumber: true })} />
            {errors.annualCollegeCost && <FormErrorMessage>{errors.annualCollegeCost.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.yearsInCollege}>
            <FormLabel fontWeight="semibold">Years in College</FormLabel>
            <ModernInput type="number" placeholder="4" {...register('yearsInCollege', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.currentSavings}>
            <FormLabel fontWeight="semibold">Current Savings ($)</FormLabel>
            <ModernInput type="number" placeholder="5000" {...register('currentSavings', { valueAsNumber: true })} />
            {errors.currentSavings && <FormErrorMessage>{errors.currentSavings.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.monthlyContribution}>
            <FormLabel fontWeight="semibold">Monthly Contribution ($)</FormLabel>
            <ModernInput type="number" placeholder="300" {...register('monthlyContribution', { valueAsNumber: true })} />
            {errors.monthlyContribution && <FormErrorMessage>{errors.monthlyContribution.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.annualReturn}>
            <FormLabel fontWeight="semibold">Annual Return (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="7" {...register('annualReturn', { valueAsNumber: true })} />
            {errors.annualReturn && <FormErrorMessage>{errors.annualReturn.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.collegeCostInflation}>
            <FormLabel fontWeight="semibold">College Inflation (%)</FormLabel>
            <ModernInput type="number" step="0.1" placeholder="5" {...register('collegeCostInflation', { valueAsNumber: true })} />
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Calculate</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Future College Cost', value: formatCurrency(results.futureCollegeCost) }}
      secondary={[
        { label: 'Projected Savings', value: formatCurrency(results.projectedBalance) },
        { label: 'Shortfall', value: formatCurrency(results.shortfall) },
        { label: 'Required Monthly', value: formatCurrency(results.requiredMonthlyContribution) },
        { label: 'Total Contributions', value: formatCurrency(results.totalContributions) },
        { label: 'Total Interest', value: formatCurrency(results.totalInterest) },
      ]}
    />
  ) : (
    <EmptyState message="Enter details to see how much you need to save for college" />
  );

  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>Savings Growth</Heading>
      <Box maxH="600px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['Year', 'Child Age', 'Start Balance', 'Contributions', 'Interest', 'End Balance']}
          data={results.schedule.map((r) => [
            r.year, r.childAge, formatCurrency(r.startBalance),
            formatCurrency(r.contribution), formatCurrency(r.interest),
            formatCurrency(r.endBalance),
          ])}
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="College Savings Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="college-savings-results"
    />
  );
}
