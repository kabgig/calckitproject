'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Text,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { CalculatorShell } from '@/components/calculators/CalculatorShell';
import { ResultsSummary, EmptyState } from '@/components/calculators/ResultCard';
import { formatCurrency, formatPercent } from '@/lib/calculators/engines/shared/math';
import {
  debtConsolidationSchema,
  type DebtConsolidationFormData,
} from '@/lib/calculators/schemas/debt-consolidation';
import {
  calculateDebtConsolidation,
  type DebtConsolidationResult,
} from '@/lib/calculators/engines/debt-consolidation';

export default function DebtConsolidationCalculator() {
  const [results, setResults] = useState<DebtConsolidationResult | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DebtConsolidationFormData>({
    resolver: zodResolver(debtConsolidationSchema),
    defaultValues: {
      debts: [{ name: 'Credit Card', balance: 5000, rate: 22, minPayment: 150 }],
      consolidationRate: 8,
      consolidationTermMonths: 60,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'debts' });

  const onSubmit = (data: DebtConsolidationFormData) => {
    setResults(
      calculateDebtConsolidation(data.debts, data.consolidationRate, data.consolidationTermMonths)
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <Text fontWeight="bold" fontSize="sm" color="red.600">Current Debts</Text>
          {fields.map((field, index) => (
            <Box key={field.id} p={3} bg="gray.50" borderRadius="md">
              <HStack spacing={2} mb={2}>
                <ModernInput placeholder="Name" size="sm" {...register(`debts.${index}.name`)} />
                <IconButton aria-label="Remove" icon={<DeleteIcon />} size="sm" variant="ghost"
                  colorScheme="red" onClick={() => remove(index)} isDisabled={fields.length <= 1} />
              </HStack>
              <HStack spacing={2}>
                <ModernInput type="number" placeholder="Balance" size="sm" {...register(`debts.${index}.balance`, { valueAsNumber: true })} />
                <ModernInput type="number" placeholder="Rate %" size="sm" step="0.1" {...register(`debts.${index}.rate`, { valueAsNumber: true })} />
                <ModernInput type="number" placeholder="Min Pmt" size="sm" {...register(`debts.${index}.minPayment`, { valueAsNumber: true })} />
              </HStack>
            </Box>
          ))}
          <ModernButton size="sm" variant="outline" leftIcon={<AddIcon />}
            onClick={() => append({ name: '', balance: 0, rate: 0, minPayment: 0 })}>Add Debt</ModernButton>

          <Divider />

          <Text fontWeight="bold" fontSize="sm" color="green.600">Consolidation Loan</Text>
          <FormControl isInvalid={!!errors.consolidationRate}>
            <FormLabel fontWeight="semibold">New Rate (%)</FormLabel>
            <ModernInput type="number" step="0.01" placeholder="8" {...register('consolidationRate', { valueAsNumber: true })} />
            {errors.consolidationRate && <FormErrorMessage>{errors.consolidationRate.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.consolidationTermMonths}>
            <FormLabel fontWeight="semibold">Term (months)</FormLabel>
            <ModernInput type="number" placeholder="60" {...register('consolidationTermMonths', { valueAsNumber: true })} />
            {errors.consolidationTermMonths && <FormErrorMessage>{errors.consolidationTermMonths.message}</FormErrorMessage>}
          </FormControl>

          <ModernButton type="submit" width="full" mt={2}>Compare</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Interest Savings', value: formatCurrency(results.interestSavings) }}
      secondary={[
        { label: 'Current Total Balance', value: formatCurrency(results.currentTotalBalance) },
        { label: 'Current Min Payments', value: formatCurrency(results.currentTotalMinPayment) },
        { label: 'Current Avg Rate', value: formatPercent(results.currentWeightedRate, 1) },
        { label: 'Current Total Interest', value: formatCurrency(results.currentTotalInterest) },
        { label: 'New Monthly Payment', value: formatCurrency(results.newMonthlyPayment) },
        { label: 'New Total Interest', value: formatCurrency(results.newTotalInterest) },
        { label: 'Monthly Savings', value: formatCurrency(results.monthlySavings) },
      ]}
    />
  ) : (
    <EmptyState message="Add your debts and consolidation loan terms to see potential savings" />
  );

  return (
    <CalculatorShell
      title="Debt Consolidation Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="debt-consolidation-results"
    />
  );
}
