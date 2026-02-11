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
  Divider,
} from '@chakra-ui/react';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { ModernTable } from '@/components/ui/ModernTable';
import { PDFExportButton } from '@/components/calculators/shared/PDFExportButton';
import { AdPlaceholder } from '@/components/shared/AdPlaceholder';
import { apySchema, type APYFormData } from '@/lib/validation';
import { calculateAPY, generateAPYGrowthTable, type GrowthRow } from '@/lib/utils/calc';

export function MobileAPY() {
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
    <VStack spacing={6} align="stretch" p={4}>
      <Heading size="lg" textAlign="center">
        APY Calculator
      </Heading>

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
              <FormLabel>Compound Frequency</FormLabel>
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
              {errors.compoundFrequency && (
                <FormErrorMessage>
                  {errors.compoundFrequency.message}
                </FormErrorMessage>
              )}
            </FormControl>

            {compoundFrequency === 'custom' && (
              <FormControl isInvalid={!!errors.customN}>
                <FormLabel fontWeight="semibold">Custom Compounds Per Year</FormLabel>
                <ModernInput
                  type="number"
                  placeholder="26"
                  {...register('customN', { valueAsNumber: true })}
                />
                {errors.customN && (
                  <FormErrorMessage>{errors.customN.message}</FormErrorMessage>
                )}
              </FormControl>
            )}

            <FormControl isInvalid={!!errors.principal}>
              <FormLabel fontWeight="semibold">Initial Principal ($)</FormLabel>
              <ModernInput
                type="number"
                placeholder="10000"
                {...register('principal', { valueAsNumber: true })}
              />
              {errors.principal && (
                <FormErrorMessage>{errors.principal.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.projectionYears}>
              <FormLabel fontWeight="semibold">Projection Years</FormLabel>
              <ModernInput
                type="number"
                placeholder="5"
                {...register('projectionYears', { valueAsNumber: true })}
              />
              {errors.projectionYears && (
                <FormErrorMessage>
                  {errors.projectionYears.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <ModernButton type="submit" width="full" mt={2}>
              Calculate APY
            </ModernButton>
          </VStack>
        </form>
      </ModernCard>

      {results && (
        <Box id="apy-results">
          <ModernCard>
            <VStack spacing={4} align="stretch">
              <Heading size="md" color="gray.900">Results</Heading>
              <Box>
                <Text fontSize="sm" color="gray.600">
                  Annual Percentage Yield (APY)
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color="black">
                  {results.apy.toFixed(2)}%
                </Text>
              </Box>
            </VStack>
          </ModernCard>

          <Box mt={6}>
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

          <Box mt={6}>
            <PDFExportButton
              elementId="apy-results"
              filename="apy-calculation.pdf"
            />
          </Box>
        </Box>
      )}

      {/* Ad Space */}
      <Box pt={8}>
        <AdPlaceholder variant="horizontal" size="md" />
      </Box>
    </VStack>
  );
}
