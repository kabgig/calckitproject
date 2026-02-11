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
import { getAllArticles } from'@/lib/utils/articles';

export const metadata: Metadata = {
  title: 'CalcKit.us - Free Financial Calculators & Expert Guides',
  description: 'Free mortgage and APY calculators with comprehensive guides. Calculate monthly payments, amortization schedules, compound interest, and more. Make smarter financial decisions with our expert tools and articles.',
  openGraph: {
    title: 'CalcKit.us - Free Financial Calculators & Expert Guides',
    description: 'Free mortgage and APY calculators with comprehensive guides.',
    url: 'https://calckit.us',
  },
};

export default function Home() {
  // Get 4 most recent articles
  const recentArticles = getAllArticles().slice(0, 4);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={16} align="stretch">
        {/* Calculator Teasers */}
        <Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Mortgage Calculator Card */}
            <ModernCard p={8} bg="purple.50" border="1px" borderColor="purple.100">
              <VStack align="stretch" spacing={4} h="100%">
                <Heading as="h3" size="lg" color="gray.900" fontWeight="bold">
                  Mortgage Calculator
                </Heading>
                <Text color="gray.700" flex={1} fontSize="md">
                  Calculate your monthly mortgage payment and generate a
                  complete amortization schedule. See how principal and interest
                  change over time and export your results to PDF.
                </Text>
                <Box>
                  <Link href="/mortgage" passHref>
                    <Button
                      w="full"
                      size="lg"
                      bg="brand.500"
                      color="white"
                      _hover={{ bg: 'brand.600', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    >
                      Calculate Mortgage Payment →
                    </Button>
                  </Link>
                </Box>
              </VStack>
            </ModernCard>

            {/* APY Calculator Card */}
            <ModernCard p={8} bg="blue.50" border="1px" borderColor="blue.100">
              <VStack align="stretch" spacing={4} h="100%">
                <Heading as="h3" size="lg" color="gray.900" fontWeight="bold">
                  APY Calculator
                </Heading>
                <Text color="gray.700" flex={1} fontSize="md">
                  Calculate Annual Percentage Yield (APY) with different
                  compounding frequencies. See how your savings grow over time
                  and compare rates across different accounts.
                </Text>
                <Box>
                  <Link href="/apy" passHref>
                    <Button
                      w="full"
                      size="lg"
                      bg="brand.500"
                      color="white"
                      _hover={{ bg: 'brand.600', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    >
                      Calculate APY →
                    </Button>
                  </Link>
                </Box>
              </VStack>
            </ModernCard>
          </SimpleGrid>
        </Box>

        {/* Ad Placeholder */}
        <AdPlaceholder variant="horizontal" size="md" />

        {/* Recent Articles */}
        <Box>
          <Heading as="h2" size="xl" mb={2} color="gray.900" fontWeight="bold">
            Expert Financial Guides
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6} fontWeight="medium">
            Learn from comprehensive guides written to help you master financial
            calculations and planning.
          </Text>
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
