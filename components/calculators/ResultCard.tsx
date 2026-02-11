import { Box, Text, Flex, Stat, StatLabel, StatNumber, StatHelpText, Divider } from '@chakra-ui/react';
import { ModernCard } from '@/components/ui/ModernCard';

// ── ResultCard ──
// Displays a single metric in a consistent card format.

interface ResultCardProps {
  label: string;
  value: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: boolean;
}

export function ResultCard({
  label,
  value,
  helpText,
  size = 'md',
  accent = false,
}: ResultCardProps) {
  const fontSizes = { sm: 'xl', md: '3xl', lg: '4xl' };
  return (
    <ModernCard
      bg={accent ? 'brand.50' : 'white'}
      borderLeft={accent ? '4px solid' : undefined}
      borderLeftColor={accent ? 'brand.500' : undefined}
    >
      <Stat>
        <StatLabel color="gray.600" fontSize="sm">
          {label}
        </StatLabel>
        <StatNumber fontSize={fontSizes[size]} fontWeight="bold">
          {value}
        </StatNumber>
        {helpText && (
          <StatHelpText color="gray.500" fontSize="xs">
            {helpText}
          </StatHelpText>
        )}
      </Stat>
    </ModernCard>
  );
}

// ── ResultRow ──
// Side-by-side metric display (used inside a card for multiple values). 

interface ResultRowProps {
  items: { label: string; value: string }[];
}

export function ResultRow({ items }: ResultRowProps) {
  return (
    <Flex
      justify="space-between"
      gap={4}
      wrap="wrap"
    >
      {items.map((item) => (
        <Box key={item.label} flex="1" minW="120px">
          <Text fontSize="sm" color="gray.600">
            {item.label}
          </Text>
          <Text fontSize="xl" fontWeight="semibold">
            {item.value}
          </Text>
        </Box>
      ))}
    </Flex>
  );
}

// ── ResultsSummary ──
// A complete result block with primary value + secondary items + divider.

interface ResultsSummaryProps {
  title?: string;
  primary: { label: string; value: string };
  secondary?: { label: string; value: string }[];
}

export function ResultsSummary({
  title = 'Results',
  primary,
  secondary,
}: ResultsSummaryProps) {
  return (
    <ModernCard mb={6}>
      {title && (
        <Text fontSize="md" fontWeight="bold" color="gray.900" mb={3}>
          {title}
        </Text>
      )}
      <Box mb={secondary?.length ? 3 : 0}>
        <Text fontSize="sm" color="gray.600">
          {primary.label}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {primary.value}
        </Text>
      </Box>
      {secondary && secondary.length > 0 && (
        <>
          <Divider borderColor="gray.200" mb={3} />
          <ResultRow items={secondary} />
        </>
      )}
    </ModernCard>
  );
}

// ── EmptyState ──
// Placeholder when no calculation results exist yet.

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = 'Enter details and click Calculate to see results',
}: EmptyStateProps) {
  return (
    <ModernCard>
      <Flex align="center" justify="center" minH={{ base: '200px', lg: '400px' }}>
        <Text color="gray.500" fontSize="lg" textAlign="center">
          {message}
        </Text>
      </Flex>
    </ModernCard>
  );
}
