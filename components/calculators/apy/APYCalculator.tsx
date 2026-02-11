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
import { formatCurrency, formatPercent } from '@/lib/calculators/engines/shared/math';
import { apySchema, type APYFormData } from '@/lib/calculators/schemas/apy';
import {
  calculateAPYResult,
  generateGrowthTable,
  type GrowthRow,
} from '@/lib/calculators/engines/apy';

interface APYResults {
  apy: number;
  growthTable: GrowthRow[];
}

export default function APYCalculator() {
  const [results, setResults] = useState<APYResults | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<APYFormData>({
    resolver: zodResolver(apySchema),
    defaultValues: {
      compoundFrequency: 'daily',
      principal: 10000,
      projectionYears: 5,
    },
  });

  const compoundFrequency = watch('compoundFrequency');

  const onSubmit = (data: APYFormData) => {
    const apyResult = calculateAPYResult(
      data.apr,
      data.compoundFrequency,
      data.customN
    );
    const growthTable = generateGrowthTable(
      data.principal || 10000,
      apyResult.apy,
      data.projectionYears || 5
    );
    setResults({ apy: apyResult.apy, growthTable });
  };

  // ── Input panel ──
  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.apr}>
            <FormLabel fontWeight="semibold">APR (%)</FormLabel>
            <ModernInput
              type="number"
              step="0.01"
              placeholder="5.0"
              {...register('apr', { valueAsNumber: true })}
            />
            {errors.apr && (
              <FormErrorMessage>{errors.apr.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.compoundFrequency}>
            <FormLabel fontWeight="semibold">Compound Frequency</FormLabel>
            <Select
              borderRadius="lg"
              borderColor="gray.300"
              _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
              {...register('compoundFrequency')}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
              <option value="continuous">Continuous</option>
              <option value="custom">Custom</option>
            </Select>
          </FormControl>

          {compoundFrequency === 'custom' && (
            <FormControl isInvalid={!!errors.customN}>
              <FormLabel fontWeight="semibold">Custom Compounds/Year</FormLabel>
              <ModernInput
                type="number"
                placeholder="26"
                {...register('customN', { valueAsNumber: true })}
              />
            </FormControl>
          )}

          <FormControl isInvalid={!!errors.principal}>
            <FormLabel fontWeight="semibold">Initial Principal ($)</FormLabel>
            <ModernInput
              type="number"
              placeholder="10000"
              {...register('principal', { valueAsNumber: true })}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.projectionYears}>
            <FormLabel fontWeight="semibold">Projection Years</FormLabel>
            <ModernInput
              type="number"
              placeholder="5"
              {...register('projectionYears', { valueAsNumber: true })}
            />
          </FormControl>

          <ModernButton type="submit" width="full" mt={2}>
            Calculate APY
          </ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  // ── Result panel ──
  const resultPanel = results ? (
    <ResultsSummary
      primary={{
        label: 'Annual Percentage Yield (APY)',
        value: formatPercent(results.apy),
      }}
    />
  ) : (
    <EmptyState message="Enter APR details and click Calculate to see results" />
  );

  // ── Schedule panel ──
  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>
        Growth Projection
      </Heading>
      <ModernTable
        headers={['Year', 'Balance']}
        data={results.growthTable.map((row) => [
          row.year,
          formatCurrency(row.balance),
        ])}
      />
      <Box mt={6}>
        <PDFExportButton
          elementId="apy-results"
          filename="apy-calculation.pdf"
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="APY Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="apy-results"
    />
  );
}
