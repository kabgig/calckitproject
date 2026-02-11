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
  Flex,
} from '@chakra-ui/react';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { ModernTable } from '@/components/ui/ModernTable';
import { PDFExportButton } from '@/components/calculators/shared/PDFExportButton';
import { apySchema, type APYFormData } from '@/lib/validation';
import { calculateAPY, generateAPYGrowthTable, type GrowthRow } from '@/lib/utils/calc';

export function DesktopAPY() {
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
    <Box p={8} maxW="1400px" mx="auto">
      <Heading size="xl" mb={8} textAlign="center">
        APY Calculator
      </Heading>

      <Flex gap={8} align="flex-start">
        {/* Left: Input Form (30%) - Sticky */}
        <Box width="30%" position="sticky" top="20px">
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
        </Box>

        {/* Right: Results & Table (70%) */}
        <Box width="70%">
          {results ? (
            <Box id="apy-results-desktop">
              {/* Results Summary */}
              <ModernCard mb={6}>
                <VStack spacing={4} align="stretch">
                  <Heading size="md" color="gray.900">Results</Heading>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Annual Percentage Yield (APY)
                    </Text>
                    <Text fontSize="4xl" fontWeight="bold">
                      {results.apy.toFixed(2)}%
                    </Text>
                  </Box>
                </VStack>
              </ModernCard>

              {/* Growth Projection Table */}
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

              {/* PDF Export */}
              <Box mt={6}>
                <PDFExportButton
                  elementId="apy-results-desktop"
                  filename="apy-calculation.pdf"
                />
              </Box>
            </Box>
          ) : (
            <ModernCard>
              <VStack spacing={2} align="center" justify="center" minH="400px">
                <Text color="gray.600" fontSize="lg">
                  Enter APR details and click Calculate to see results
                </Text>
              </VStack>
            </ModernCard>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
