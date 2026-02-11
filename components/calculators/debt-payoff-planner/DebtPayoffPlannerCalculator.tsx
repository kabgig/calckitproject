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
  Select,
  Badge,
  Heading,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { ModernTable } from '@/components/ui/ModernTable';
import { CalculatorShell } from '@/components/calculators/CalculatorShell';
import { ResultsSummary, EmptyState } from '@/components/calculators/ResultCard';
import { formatCurrency } from '@/lib/calculators/engines/shared/math';
import {
  debtPayoffPlannerSchema,
  type DebtPayoffPlannerFormData,
} from '@/lib/calculators/schemas/debt-payoff-planner';
import {
  calculateDebtPayoffPlan,
  type DebtPayoffPlanResult,
} from '@/lib/calculators/engines/debt-payoff-planner';

export default function DebtPayoffPlannerCalculator() {
  const [results, setResults] = useState<DebtPayoffPlanResult | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DebtPayoffPlannerFormData>({
    resolver: zodResolver(debtPayoffPlannerSchema),
    defaultValues: {
      debts: [{ name: 'Credit Card', balance: 5000, rate: 22, minPayment: 150 }],
      extraMonthly: 0,
      strategy: 'avalanche',
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'debts' });

  const onSubmit = (data: DebtPayoffPlannerFormData) => {
    setResults(
      calculateDebtPayoffPlan(data.debts, data.extraMonthly, data.strategy)
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <Text fontWeight="bold" fontSize="sm" color="red.600">Your Debts</Text>
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

          <FormControl isInvalid={!!errors.extraMonthly}>
            <FormLabel fontWeight="semibold">Extra Monthly Payment ($)</FormLabel>
            <ModernInput type="number" placeholder="200" {...register('extraMonthly', { valueAsNumber: true })} />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="semibold">Strategy</FormLabel>
            <Select {...register('strategy')} bg="white">
              <option value="avalanche">Avalanche (highest rate first)</option>
              <option value="snowball">Snowball (lowest balance first)</option>
            </Select>
          </FormControl>

          <ModernButton type="submit" width="full" mt={2}>Create Plan</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <VStack spacing={4} align="stretch">
      <ResultsSummary
        primary={{ label: 'Debt-Free In', value: `${results.totalMonths} months` }}
        secondary={[
          { label: 'Total Interest', value: formatCurrency(results.totalInterest) },
          { label: 'Total Paid', value: formatCurrency(results.totalPaid) },
          { label: 'Strategy', value: results.strategy === 'avalanche' ? 'Avalanche' : 'Snowball' },
        ]}
      />
      <ModernCard>
        <Text fontWeight="semibold" mb={2}>Payoff Order</Text>
        <HStack flexWrap="wrap" spacing={2}>
          {results.payoffOrder.map((name, i) => (
            <Badge key={name} colorScheme="green" fontSize="sm">
              {i + 1}. {name}
            </Badge>
          ))}
        </HStack>
      </ModernCard>
    </VStack>
  ) : (
    <EmptyState message="Add your debts and choose a strategy to see your payoff plan" />
  );

  // Show a summary schedule (only the last entry per month where a debt is paid off)
  const schedulePanel = results ? (
    <>
      <Heading size="md" mb={4}>Monthly Breakdown (First 24 Months)</Heading>
      <Box maxH="600px" overflowY="auto" overflowX="auto">
        <ModernTable
          headers={['Month', 'Debt', 'Payment', 'Interest', 'Balance']}
          data={results.schedule
            .filter((s) => s.month <= 24)
            .map((s) => [
              s.month, s.debtName, formatCurrency(s.payment),
              formatCurrency(s.interest), formatCurrency(s.balance),
            ])}
        />
      </Box>
    </>
  ) : null;

  return (
    <CalculatorShell
      title="Debt Payoff Planner"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      schedulePanel={schedulePanel}
      resultsId="debt-payoff-results"
    />
  );
}
