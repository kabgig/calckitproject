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
  Flex,
  Divider,
} from '@chakra-ui/react';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { ModernTable } from '@/components/ui/ModernTable';
import { PDFExportButton } from '@/components/calculators/shared/PDFExportButton';
import { mortgageSchema, type MortgageFormData } from '@/lib/validation';
import {
  calculateMortgagePayment,
  generateAmortizationTable,
  type AmortizationRow,
} from '@/lib/utils/calc';

export function DesktopMortgage() {
  const [results, setResults] = useState<{
    payment: number;
    total: number;
    interest: number;
    schedule: AmortizationRow[];
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MortgageFormData>({
    resolver: zodResolver(mortgageSchema),
  });

  const onSubmit = (data: MortgageFormData) => {
    const payment = calculateMortgagePayment(data.amount, data.rate, data.years);
    const schedule = generateAmortizationTable(
      data.amount,
      data.rate,
      data.years,
      data.startDate
    );

    setResults({
      payment: payment.monthlyPayment,
      total: payment.totalPayment,
      interest: payment.totalInterest,
      schedule,
    });
  };

  return (
    <Box p={8} maxW="1400px" mx="auto">
      <Heading size="xl" mb={8} textAlign="center">
        Mortgage Calculator
      </Heading>

      <Flex gap={8} align="flex-start">
        {/* Left: Input Form (30%) - Sticky */}
        <Box width="30%" position="sticky" top="20px">
          <ModernCard>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.amount}>
                  <FormLabel fontWeight="semibold">Loan Amount ($)</FormLabel>
                  <ModernInput
                    type="number"
                    placeholder="300000"
                    {...register('amount', { valueAsNumber: true })}
                  />
                  {errors.amount && (
                    <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.rate}>
                  <FormLabel fontWeight="semibold">Interest Rate (%)</FormLabel>
                  <ModernInput
                    type="number"
                    step="0.01"
                    placeholder="4.5"
                    {...register('rate', { valueAsNumber: true })}
                  />
                  {errors.rate && (
                    <FormErrorMessage>{errors.rate.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.years}>
                  <FormLabel fontWeight="semibold">Loan Term (Years)</FormLabel>
                  <ModernInput
                    type="number"
                    placeholder="30"
                    {...register('years', { valueAsNumber: true })}
                  />
                  {errors.years && (
                    <FormErrorMessage>{errors.years.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.startDate}>
                  <FormLabel fontWeight="semibold">Start Date</FormLabel>
                  <ModernInput
                    type="date"
                    {...register('startDate', { valueAsDate: true })}
                  />
                  {errors.startDate && (
                    <FormErrorMessage>{errors.startDate.message}</FormErrorMessage>
                  )}
                </FormControl>

                <ModernButton type="submit" width="full" mt={2}>
                  Calculate
                </ModernButton>
              </VStack>
            </form>
          </ModernCard>
        </Box>

        {/* Right: Results & Table (70%) */}
        <Box width="70%">
          {results ? (
            <Box id="mortgage-results-desktop">
              {/* Results Summary */}
              <ModernCard mb={6}>
                <VStack spacing={4} align="stretch">
                  <Heading size="md" color="gray.900">Results</Heading>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Monthly Payment
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold">
                      ${results.payment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </Text>
                  </Box>
                  <Divider borderColor="black" />
                  <Flex justify="space-between">
                    <Box>
                      <Text fontSize="sm" color="gray.600">
                        Total Payment
                      </Text>
                      <Text fontSize="xl" fontWeight="semibold">
                        ${results.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">
                        Total Interest
                      </Text>
                      <Text fontSize="xl" fontWeight="semibold">
                        ${results.interest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </Text>
                    </Box>
                  </Flex>
                </VStack>
              </ModernCard>

              {/* Amortization Schedule */}
              <Box>
                <Heading size="md" mb={4}>
                  Amortization Schedule
                </Heading>
                <Box maxH="600px" overflowY="auto">
                  <ModernTable
                    headers={['#', 'Date', 'Principal', 'Interest', 'Balance']}
                    data={results.schedule.map((row) => [
                      row.paymentNum,
                      row.date,
                      `$${row.principalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      `$${row.interestPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      `$${row.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                    ])}
                  />
                </Box>
              </Box>

              {/* PDF Export */}
              <Box mt={6}>
                <PDFExportButton
                  elementId="mortgage-results-desktop"
                  filename="mortgage-calculation.pdf"
                />
              </Box>
            </Box>
          ) : (
            <ModernCard>
              <VStack spacing={2} align="center" justify="center" minH="400px">
                <Text color="gray.600" fontSize="lg">
                  Enter loan details and click Calculate to see results
                </Text>
              </VStack>
            </ModernCard>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
