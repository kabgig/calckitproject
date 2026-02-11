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
  Text,
  Box,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { ModernTable } from '@/components/ui/ModernTable';
import { PDFExportButton } from '@/components/calculators/shared/PDFExportButton';
import { apySchema, type APYFormData } from '@/lib/validation';
import { calculateAPY, generateAPYGrowthTable, type GrowthRow } from '@/lib/utils/calc';

export function TabletAPY() {
  const [results, setResults] = useState<{
    apy: number;
    growthTable: GrowthRow[];
  } | null>(null);

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
    const apyResult = calculateAPY(data.apr, data.compoundFrequency, data.customN);
    const growthTable = generateAPYGrowthTable(
      data.principal || 10000,
      apyResult.apy,
      data.projectionYears || 5
    );

    setResults({
      apy: apyResult.apy,
      growthTable,
    });
  };

  return (
    <Box p={6} maxW="1000px" mx="auto">
      <Heading size="xl" mb={6} textAlign="center">
        APY Calculator
      </Heading>

      <SimpleGrid columns={2} spacing={6} mb={6}>
        {/* Input Form */}
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
                  borderRadius={0}
                  borderColor="black"
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

        {/* Results */}
        {results ? (
          <Box id="apy-results-tablet">
            <ModernCard>
              <VStack spacing={4} align="stretch">
                <Heading size="md" color="gray.900">Results</Heading>
                <Box>
                  <Text fontSize="sm" color="gray.600">
                    Annual Percentage Yield
                  </Text>
                  <Text fontSize="3xl" fontWeight="bold">
                    {results.apy.toFixed(2)}%
                  </Text>
                </Box>
                <PDFExportButton
                  elementId="apy-results-tablet"
                  filename="apy-calculation.pdf"
                />
              </VStack>
            </ModernCard>
          </Box>
        ) : (
          <ModernCard>
            <VStack spacing={2} align="center" justify="center" h="full">
              <Text color="gray.600">Enter APR details and calculate</Text>
            </VStack>
          </ModernCard>
        )}
      </SimpleGrid>

      {results && (
        <Box>
          <Heading size="md" mb={4}>
            Growth Projection
          </Heading>
          <ModernTable
            headers={['Year', 'Balance']}
            data={results.growthTable.map((row) => [
              row.year,
              `$${row.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            ])}
          />
        </Box>
      )}
    </Box>
  );
}
