'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { ModernInput } from '@/components/ui/ModernInput';
import { ModernButton } from '@/components/ui/ModernButton';
import { ModernCard } from '@/components/ui/ModernCard';
import { CalculatorShell } from '@/components/calculators/CalculatorShell';
import { ResultsSummary, EmptyState } from '@/components/calculators/ResultCard';
import { formatCurrency } from '@/lib/calculators/engines/shared/math';
import {
  salaryHourlySchema,
  type SalaryHourlyFormData,
} from '@/lib/calculators/schemas/salary-hourly';
import {
  salaryToHourly,
  hourlyToSalary,
  type SalaryHourlyResult,
} from '@/lib/calculators/engines/salary-hourly';

export default function SalaryHourlyCalculator() {
  const [results, setResults] = useState<SalaryHourlyResult | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SalaryHourlyFormData>({
    resolver: zodResolver(salaryHourlySchema),
    defaultValues: { mode: 'salary', hoursPerWeek: 40, weeksPerYear: 52 },
  });

  const mode = watch('mode');

  const onSubmit = (data: SalaryHourlyFormData) => {
    setResults(
      data.mode === 'salary'
        ? salaryToHourly(data.amount, data.hoursPerWeek, data.weeksPerYear)
        : hourlyToSalary(data.amount, data.hoursPerWeek, data.weeksPerYear)
    );
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel fontWeight="semibold">Conversion Mode</FormLabel>
            <Select {...register('mode')} bg="white">
              <option value="salary">Salary → Hourly</option>
              <option value="hourly">Hourly → Salary</option>
            </Select>
          </FormControl>
          <FormControl isInvalid={!!errors.amount}>
            <FormLabel fontWeight="semibold">
              {mode === 'salary' ? 'Annual Salary ($)' : 'Hourly Rate ($)'}
            </FormLabel>
            <ModernInput
              type="number"
              step="0.01"
              placeholder={mode === 'salary' ? '75000' : '35'}
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && <FormErrorMessage>{errors.amount.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.hoursPerWeek}>
            <FormLabel fontWeight="semibold">Hours Per Week</FormLabel>
            <ModernInput type="number" placeholder="40" {...register('hoursPerWeek', { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.weeksPerYear}>
            <FormLabel fontWeight="semibold">Weeks Per Year</FormLabel>
            <ModernInput type="number" placeholder="52" {...register('weeksPerYear', { valueAsNumber: true })} />
          </FormControl>
          <ModernButton type="submit" width="full" mt={2}>Convert</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{ label: 'Hourly Rate', value: formatCurrency(results.hourlyRate) }}
      secondary={[
        { label: 'Annual Salary', value: formatCurrency(results.annualSalary) },
        { label: 'Monthly', value: formatCurrency(results.monthlySalary) },
        { label: 'Bi-Weekly', value: formatCurrency(results.biweeklySalary) },
        { label: 'Weekly', value: formatCurrency(results.weeklySalary) },
        { label: 'Daily', value: formatCurrency(results.dailySalary) },
      ]}
    />
  ) : (
    <EmptyState message="Enter a salary or hourly rate to see all pay period breakdowns" />
  );

  return (
    <CalculatorShell
      title="Salary ↔ Hourly Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="salary-hourly-results"
    />
  );
}
