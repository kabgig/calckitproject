'use client';

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AdPlaceholder } from '@/components/shared/AdPlaceholder';

interface CalculatorShellProps {
  title: string;
  inputPanel: ReactNode;
  resultPanel: ReactNode;
  /** Optional schedule / table panel shown below results on desktop */
  schedulePanel?: ReactNode;
  /** Show ad placeholder at bottom (default true) */
  showAd?: boolean;
  /** id used for PDF export target */
  resultsId?: string;
}

/**
 * Single responsive shell for every calculator.
 *
 * - Mobile:  single column stacked
 * - Tablet:  2-col SimpleGrid (equal width)
 * - Desktop: 30/70 flex with sticky sidebar
 */
export function CalculatorShell({
  title,
  inputPanel,
  resultPanel,
  schedulePanel,
  showAd = true,
  resultsId,
}: CalculatorShellProps) {
  const layout = useBreakpointValue<'mobile' | 'tablet' | 'desktop'>({
    base: 'mobile',
    md: 'tablet',
    lg: 'desktop',
  });

  // ───── Mobile ─────
  if (layout === 'mobile') {
    return (
      <VStack spacing={6} align="stretch" p={4}>
        <Heading size="lg" textAlign="center">
          {title}
        </Heading>

        {inputPanel}

        <Box id={resultsId}>{resultPanel}</Box>

        {schedulePanel}

        {showAd && (
          <Box pt={8}>
            <AdPlaceholder variant="horizontal" size="md" />
          </Box>
        )}
      </VStack>
    );
  }

  // ───── Tablet ─────
  if (layout === 'tablet') {
    return (
      <Box p={6} maxW="900px" mx="auto">
        <Heading size="lg" mb={6} textAlign="center">
          {title}
        </Heading>

        <Flex gap={6} align="flex-start" wrap="wrap">
          <Box flex="1" minW="280px">
            {inputPanel}
          </Box>
          <Box flex="1" minW="280px" id={resultsId}>
            {resultPanel}
          </Box>
        </Flex>

        {schedulePanel && <Box mt={6}>{schedulePanel}</Box>}

        {showAd && (
          <Box pt={8}>
            <AdPlaceholder variant="horizontal" size="md" />
          </Box>
        )}
      </Box>
    );
  }

  // ───── Desktop (default) ─────
  return (
    <Box p={8} maxW="1400px" mx="auto">
      <Heading size="xl" mb={8} textAlign="center">
        {title}
      </Heading>

      <Flex gap={8} align="flex-start">
        {/* Left: Input Form (30%) – Sticky */}
        <Box width="30%" position="sticky" top="20px">
          {inputPanel}
        </Box>

        {/* Right: Results & Schedule (70%) */}
        <Box width="70%" id={resultsId}>
          {resultPanel}
          {schedulePanel && <Box mt={6}>{schedulePanel}</Box>}
        </Box>
      </Flex>

      {showAd && (
        <Box pt={8}>
          <AdPlaceholder variant="horizontal" size="md" />
        </Box>
      )}
    </Box>
  );
}
