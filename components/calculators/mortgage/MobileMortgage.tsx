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

export function MobileMortgage() {
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
    <VStack spacing={6} align="stretch" p={4}>
      <Heading size="lg" textAlign="center">
        Mortgage Calculator
      </Heading>

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

      {results && (
        <Box id="mortgage-results">
          <ModernCard>
            <VStack spacing={4} align="stretch">
              <Heading size="md" color="gray.900">Results</Heading>
              <Box>
                <Text fontSize="sm" color="gray.600">
                  Monthly Payment
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  ${results.payment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
              </Box>
              <Divider borderColor="black" />
              <Box>
                <Text fontSize="sm" color="gray.600">
                  Total Payment
                </Text>
                <Text fontSize="lg" fontWeight="semibold">
                  ${results.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">
                  Total Interest
                </Text>
                <Text fontSize="lg" fontWeight="semibold">
                  ${results.interest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
              </Box>
            </VStack>
          </ModernCard>

          <Box mt={6}>
            <Heading size="md" mb={4}>
              Amortization Schedule
            </Heading>
            <Box overflowX="auto">
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

          <Box mt={6}>
            <PDFExportButton
              elementId="mortgage-results"
              filename="mortgage-calculation.pdf"
            />
          </Box>
        </Box>
      )}
    </VStack>
  );
}
