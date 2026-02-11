'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VStack,
  HStack,
  FormControl,
  FormLabel,
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
import { formatCurrency } from '@/lib/calculators/engines/shared/math';
import { netWorthSchema, type NetWorthFormData } from '@/lib/calculators/schemas/net-worth';
import { calculateNetWorth, type NetWorthResult } from '@/lib/calculators/engines/net-worth';

export default function NetWorthCalculator() {
  const [results, setResults] = useState<NetWorthResult | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NetWorthFormData>({
    resolver: zodResolver(netWorthSchema),
    defaultValues: {
      assets: [{ name: 'Checking Account', value: 0 }],
      liabilities: [{ name: 'Credit Card', value: 0 }],
    },
  });

  const { fields: assetFields, append: addAsset, remove: removeAsset } = useFieldArray({ control, name: 'assets' });
  const { fields: liabilityFields, append: addLiability, remove: removeLiability } = useFieldArray({ control, name: 'liabilities' });

  const onSubmit = (data: NetWorthFormData) => {
    setResults(calculateNetWorth(data.assets, data.liabilities));
  };

  const inputPanel = (
    <ModernCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <Text fontWeight="bold" fontSize="sm" color="green.600">Assets</Text>
          {assetFields.map((field, index) => (
            <HStack key={field.id} spacing={2}>
              <ModernInput placeholder="Name" {...register(`assets.${index}.name`)} />
              <ModernInput type="number" placeholder="Value" {...register(`assets.${index}.value`, { valueAsNumber: true })} />
              <IconButton aria-label="Remove" icon={<DeleteIcon />} size="sm" variant="ghost"
                colorScheme="red" onClick={() => removeAsset(index)} isDisabled={assetFields.length <= 1} />
            </HStack>
          ))}
          <ModernButton size="sm" variant="outline" leftIcon={<AddIcon />}
            onClick={() => addAsset({ name: '', value: 0 })}>Add Asset</ModernButton>

          <Divider />

          <Text fontWeight="bold" fontSize="sm" color="red.600">Liabilities</Text>
          {liabilityFields.map((field, index) => (
            <HStack key={field.id} spacing={2}>
              <ModernInput placeholder="Name" {...register(`liabilities.${index}.name`)} />
              <ModernInput type="number" placeholder="Value" {...register(`liabilities.${index}.value`, { valueAsNumber: true })} />
              <IconButton aria-label="Remove" icon={<DeleteIcon />} size="sm" variant="ghost"
                colorScheme="red" onClick={() => removeLiability(index)} isDisabled={liabilityFields.length <= 1} />
            </HStack>
          ))}
          <ModernButton size="sm" variant="outline" leftIcon={<AddIcon />}
            onClick={() => addLiability({ name: '', value: 0 })}>Add Liability</ModernButton>

          <ModernButton type="submit" width="full" mt={2}>Calculate Net Worth</ModernButton>
        </VStack>
      </form>
    </ModernCard>
  );

  const resultPanel = results ? (
    <ResultsSummary
      primary={{
        label: 'Net Worth',
        value: formatCurrency(results.netWorth),
      }}
      secondary={[
        { label: 'Total Assets', value: formatCurrency(results.totalAssets) },
        { label: 'Total Liabilities', value: formatCurrency(results.totalLiabilities) },
      ]}
    />
  ) : (
    <EmptyState message="Add your assets and liabilities to calculate your net worth" />
  );

  return (
    <CalculatorShell
      title="Net Worth Calculator"
      inputPanel={inputPanel}
      resultPanel={resultPanel}
      resultsId="net-worth-results"
    />
  );
}
