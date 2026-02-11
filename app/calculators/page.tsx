import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { ModernCard } from '@/components/ui/ModernCard';
import { ModernButton } from '@/components/ui/ModernButton';
import {
  calculators,
  categoryMeta,
  getAllCategories,
  getCalculatorsByCategory,
} from '@/lib/calculators/registry';

export const metadata: Metadata = {
  title: 'Financial Calculators – Free Tools for Every Money Decision | CalcKit.us',
  description:
    'Browse 27+ free financial calculators for mortgages, loans, investing, budgeting, income, and debt. Plan smarter with CalcKit.us.',
  keywords: [
    'financial calculators',
    'free calculators',
    'mortgage calculator',
    'loan calculator',
    'investment calculator',
    'budget calculator',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators',
  },
  openGraph: {
    title: 'Financial Calculators – Free Tools for Every Money Decision',
    description: 'Browse 27+ free financial calculators for mortgages, loans, investing, budgeting, income, and debt. Plan smarter with CalcKit.us.',
    url: 'https://calckit.us/calculators',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financial Calculators – Free Tools for Every Money Decision',
    description: 'Browse 27+ free financial calculators for mortgages, loans, investing, budgeting, income, and debt.',
  },
};

export default function CalculatorsIndexPage() {
  const categories = getAllCategories();

  return (
    <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
      <VStack spacing={2} mb={10} textAlign="center">
        <Heading
          size="xl"
          bgGradient="linear(to-r, brand.500, purple.500)"
          bgClip="text"
        >
          Financial Calculators
        </Heading>
        <Text color="gray.600" fontSize="lg" maxW="600px">
          Free tools to help you make smarter money decisions — from mortgages
          and loans to investing and budgeting.
        </Text>
      </VStack>

      {categories.map((cat) => {
        const calcs = getCalculatorsByCategory(cat);
        if (calcs.length === 0) return null;
        const meta = categoryMeta[cat];

        return (
          <Box key={cat} mb={10}>
            <HStack mb={4}>
              <Badge
                bg={meta.bg}
                color={meta.color}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="semibold"
              >
                {meta.label}
              </Badge>
              <Text color="gray.400" fontSize="sm">
                {calcs.length} calculator{calcs.length > 1 ? 's' : ''}
              </Text>
            </HStack>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
              {calcs.map((calc) => (
                <ModernCard key={calc.slug} display="flex" flexDirection="column">
                  <Text fontSize="2xl" mb={2}>
                    {calc.icon}
                  </Text>
                  <Heading size="sm" mb={1}>
                    {calc.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mb={4} flex="1">
                    {calc.shortDescription}
                  </Text>
                  <Link href={`/calculators/${calc.slug}`} passHref>
                    <ModernButton size="sm" width="full">
                      Open Calculator
                    </ModernButton>
                  </Link>
                </ModernCard>
              ))}
            </SimpleGrid>
          </Box>
        );
      })}
    </Box>
  );
}
