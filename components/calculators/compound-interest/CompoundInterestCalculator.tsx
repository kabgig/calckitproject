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
  Select,
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
  compoundInterestSchema,
  type CompoundInterestFormData,
} from '@/lib/calculators/schemas/compound-interest';
import {
  calculateCompoundInterest,
  generateCompoundGrowthTable,
  type CompoundGrowthRow,
} from '@/lib/calculators/engines/compound-interest';

interface CIResults {
  finalBalance: number;
  totalContributions: number;
  totalInterestEarned: number;
  growthTable: CompoundGrowthRow[];
}

export default function CompoundInterestCalculator() {
  const [results, setResults] = useState<CIResults | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompoundInterestFormData>({
    resolver: zodResolver(compoundInterestSchema),
    defaultValues: {
      principal: 10000,
      annualRate: 7,
      years: 10,
      compoundsPerYear: 12,
      monthlyContribution: 200,
    },
  });

  const onSubmit = (data: CompoundInterestFormData) => {
    const calc = calculateCompoundInterest(
      data.principal,
      data.annualRate,
      data.years,
      data.compoundsPerYear,
      data.monthlyContribution
    );
    const growthTable = generateCompoundGrowthTable(
      data.principal,
      data.annualRate,
      data.years,
      data.compoundsPerYear,
      data.monthlyContribution
    );
    setResults({ ...calc, growthTable });
  };

  // ── Input panel ──
  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.principal}>
            <FormLabel fontWeight="semibold">Initial Investment ($)</FormLabel>
            <ModernInput
              type="number"
              placeholder="10000"
              {...register('principal', { valueAsNumber: true })}
            />
            {errors.principal && (
              <FormErrorMessage>{errors.principal.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.annualRate}>
            <FormLabel fontWeight="semibold">Annual Interest Rate (%)</FormLabel>
            <ModernInput
              type="number"
              step="0.01"
              placeholder="7.0"
              {...register('annualRate', { valueAsNumber: true })}
            />
            {errors.annualRate && (
              <FormErrorMessage>{errors.annualRate.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.years}>
            <FormLabel fontWeight="semibold">Years</FormLabel>
            <ModernInput
              type="number"
              placeholder="10"
              {...register('years', { valueAsNumber: true })}
            />
            {errors.years && (
              <FormErrorMessage>{errors.years.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.compoundsPerYear}>
            <FormLabel fontWeight="semibold">Compounding Frequency</FormLabel>
            <Select
              borderRadius="lg"
              borderColor="gray.300"
              _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
              {...register('compoundsPerYear', { valueAsNumber: true })}
            >
              <option value={365}>Daily (365)</option>
              <option value={52}>Weekly (52)</option>
              <option value={12}>Monthly (12)</option>
              <option value={4}>Quarterly (4)</option>
              <option value={1}>Annually (1)</option>
            </Select>
          </FormControl>

          <FormControl isInvalid={!!errors.monthlyContribution}>
            <FormLabel fontWeight="semibold">Monthly Contribution ($)</FormLabel>
            <ModernInput
              type="number"
              placeholder="200"
              {...register('monthlyContribution', { valueAsNumber: true })}
            />
            {errors.monthlyContribution && (
              <FormErrorMessage>{errors.monthlyContribution.message}</FormErrorMessage>
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
        label: 'Final Balance',
        value: formatCurrency(results.finalBalance),
      }}
      secondary={[
        {
          label: 'Total Contributions',
          value: formatCurrency(results.totalContributions),
        },
        {
          label: 'Interest Earned',
          value: formatCurrency(results.totalInterestEarned),
        },
      ]}
    />
  ) : (
    <EmptyState message="Enter investment details and click Calculate to see results" />
  );

  // ── Schedule panel ──
  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>
        Year-by-Year Growth
      </Heading>
      <Box maxH="600px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['Year', 'Balance', 'Contributions', 'Interest Earned']}
          data={results.growthTable.map((row) => [
            row.year,
            formatCurrency(row.balance),
            formatCurrency(row.contributions),
            formatCurrency(row.interestEarned),
          ])}
        />
      </Box>
      <Box mt={6}>
        <PDFExportButton
          elementId="compound-interest-results"
          filename="compound-interest-calculation.pdf"
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Compound Interest Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="compound-interest-results"
    />
  );
}
