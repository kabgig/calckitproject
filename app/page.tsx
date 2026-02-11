import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Button,
  Badge,
} from '@chakra-ui/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ModernCard } from '@/components/ui/ModernCard';
import { AdPlaceholder } from '@/components/shared/AdPlaceholder';
import { getAllArticles } from '@/lib/utils/articles';
import { calculators, categoryMeta } from '@/lib/calculators/registry';

export const metadata: Metadata = {
  title: 'CalcKit.us - Free Financial Calculators & Expert Guides',
  description: 'Free financial calculators for mortgages, loans, investing, budgeting, and more. Make smarter money decisions with CalcKit.us.',
  alternates: {
    canonical: 'https://calckit.us',
  },
  openGraph: {
    title: 'CalcKit.us - Free Financial Calculators & Expert Guides',
    description: 'Free financial calculators for mortgages, loans, investing, budgeting, and more.',
    url: 'https://calckit.us',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalcKit.us - Free Financial Calculators & Expert Guides',
    description: 'Free financial calculators for mortgages, loans, investing, budgeting, and more.',
  },
};

// Show the first 4 implemented calculators on the homepage
const featuredSlugs = ['mortgage', 'apy', 'loan-payment', 'compound-interest'];
const featuredCalcs = featuredSlugs
  .map((s) => calculators.find((c) => c.slug === s))
  .filter(Boolean);

const cardBgs = ['purple.50', 'blue.50', 'teal.50', 'pink.50'];
const cardBorders = ['purple.100', 'blue.100', 'teal.100', 'pink.100'];

export default function Home() {
  const recentArticles = getAllArticles().slice(0, 4);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={16} align="stretch">
        {/* Calculator Teasers – driven by registry */}
        <Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {featuredCalcs.map((calc, i) => {
              if (!calc) return null;
              return (
                <ModernCard
                  key={calc.slug}
                  p={8}
                  bg={cardBgs[i % cardBgs.length]}
                  border="1px"
                  borderColor={cardBorders[i % cardBorders.length]}
                >
                  <VStack align="stretch" spacing={4} h="100%">
                    <Text fontSize="2xl">{calc.icon}</Text>
                    <Heading as="h3" size="lg" color="gray.900" fontWeight="bold">
                      {calc.name}
                    </Heading>
                    <Text color="gray.700" flex={1} fontSize="md">
                      {calc.longDescription}
                    </Text>
                    <Box>
                      <Link href={`/calculators/${calc.slug}`} passHref>
                        <Button
                          w="full"
                          size="lg"
                          bg="brand.500"
                          color="white"
                          _hover={{
                            bg: 'brand.600',
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                          }}
                        >
                          Open {calc.name} →
                        </Button>
                      </Link>
                    </Box>
                  </VStack>
                </ModernCard>
              );
            })}
          </SimpleGrid>

          {/* "View all" link */}
          <Box textAlign="center" mt={6}>
            <Link href="/calculators" passHref>
              <Button
                size="md"
                variant="outline"
                borderColor="brand.300"
                color="brand.600"
                _hover={{ bg: 'brand.50', borderColor: 'brand.400' }}
              >
                View All Calculators →
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Ad Placeholder */}
        <AdPlaceholder variant="horizontal" size="md" />

        {/* Recent Articles */}
        <Box>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 2 }}
            spacing={6}
            mb={6}
          >
            {recentArticles.map((article) => (
              <ModernCard
                key={article.slug}
                p={6}
                bg="white"
              >
                <VStack align="stretch" spacing={3} h="100%">
                  <Badge
                    fontSize="xs"
                    px={3}
                    py={1}
                    bg={article.category === 'mortgage' ? 'purple.100' : 'blue.100'}
                    color={article.category === 'mortgage' ? 'purple.700' : 'blue.700'}
                    borderRadius="full"
                    alignSelf="flex-start"
                    fontWeight="medium"
                  >
                    {article.category}
                  </Badge>
                  <Heading as="h3" size="md" color="gray.900" fontWeight="bold">
                    {article.title}
                  </Heading>
                  <Text color="gray.700" fontSize="sm" flex={1}>
                    {article.description}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                  <Link href={`/blog/${article.slug}`} passHref>
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="gray.300"
                      color="gray.700"
                      _hover={{ bg: 'gray.100', borderColor: 'gray.400' }}
                    >
                      Read Article →
                    </Button>
                  </Link>
                </VStack>
              </ModernCard>
            ))}
          </SimpleGrid>
          <Box textAlign="center">
            <Link href="/blog" passHref>
              <Button
                size="lg"
                variant="outline"
                borderColor="gray.300"
                color="gray.700"
                _hover={{ bg: 'gray.100', borderColor: 'gray.400', transform: 'translateY(-1px)' }}
              >
                View All Articles →
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Ad Placeholder */}
        <AdPlaceholder variant="horizontal" size="lg" />
      </VStack>
    </Container>
  );
}
