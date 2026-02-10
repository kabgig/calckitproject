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
import Link from 'next/link';
import { FlatCard } from '@/components/ui/FlatCard';
import { AdPlaceholder } from '@/components/shared/AdPlaceholder';
import { getAllArticles } from '@/lib/utils/articles';

export default function Home() {
  // Get 4 most recent articles
  const recentArticles = getAllArticles().slice(0, 4);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={16} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" py={8}>
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            mb={4}
            color="black"
          >
            CalcKit.us
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color="gray.700"
            maxW="2xl"
            mx="auto"
          >
            Free financial calculators and expert guides to help you make
            smarter money decisions. Calculate mortgages, savings yields, and
            more.
          </Text>
        </Box>

        {/* Calculator Teasers */}
        <Box>
          <Heading as="h2" size="xl" mb={6} color="black">
            Financial Calculators
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Mortgage Calculator Card */}
            <FlatCard p={8} _hover={{ bg: 'gray.50' }} transition="all 0.2s">
              <VStack align="stretch" spacing={4} h="100%">
                <Heading as="h3" size="lg" color="black">
                  Mortgage Calculator
                </Heading>
                <Text color="gray.700" flex={1}>
                  Calculate your monthly mortgage payment and generate a
                  complete amortization schedule. See how principal and interest
                  change over time and export your results to PDF.
                </Text>
                <Box>
                  <Link href="/mortgage" passHref>
                    <Button
                      as="a"
                      w="full"
                      size="lg"
                      bg="black"
                      color="white"
                      borderRadius={0}
                      _hover={{ bg: 'gray.800' }}
                    >
                      Calculate Mortgage Payment →
                    </Button>
                  </Link>
                </Box>
              </VStack>
            </FlatCard>

            {/* APY Calculator Card */}
            <FlatCard p={8} _hover={{ bg: 'gray.50' }} transition="all 0.2s">
              <VStack align="stretch" spacing={4} h="100%">
                <Heading as="h3" size="lg" color="black">
                  APY Calculator
                </Heading>
                <Text color="gray.700" flex={1}>
                  Calculate Annual Percentage Yield (APY) with different
                  compounding frequencies. See how your savings grow over time
                  and compare rates across different accounts.
                </Text>
                <Box>
                  <Link href="/apy" passHref>
                    <Button
                      as="a"
                      w="full"
                      size="lg"
                      bg="black"
                      color="white"
                      borderRadius={0}
                      _hover={{ bg: 'gray.800' }}
                    >
                      Calculate APY →
                    </Button>
                  </Link>
                </Box>
              </VStack>
            </FlatCard>
          </SimpleGrid>
        </Box>

        {/* Ad Placeholder */}
        <AdPlaceholder variant="horizontal" size="md" />

        {/* Recent Articles */}
        <Box>
          <Heading as="h2" size="xl" mb={2} color="black">
            Expert Financial Guides
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Learn from comprehensive guides written to help you master financial
            calculations and planning.
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 2 }}
            spacing={6}
            mb={6}
          >
            {recentArticles.map((article) => (
              <FlatCard
                key={article.slug}
                p={6}
                _hover={{ bg: 'gray.50' }}
                transition="all 0.2s"
              >
                <VStack align="stretch" spacing={3} h="100%">
                  <Badge
                    fontSize="xs"
                    px={2}
                    py={1}
                    border="1px solid"
                    borderColor="gray.300"
                    bg="white"
                    color="black"
                    borderRadius={0}
                    alignSelf="flex-start"
                  >
                    {article.category}
                  </Badge>
                  <Heading as="h3" size="md" color="black">
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
                      as="a"
                      size="sm"
                      variant="outline"
                      borderColor="black"
                      color="black"
                      borderRadius={0}
                      _hover={{ bg: 'gray.100' }}
                    >
                      Read Article →
                    </Button>
                  </Link>
                </VStack>
              </FlatCard>
            ))}
          </SimpleGrid>
          <Box textAlign="center">
            <Link href="/blog" passHref>
              <Button
                as="a"
                size="lg"
                variant="outline"
                borderColor="black"
                color="black"
                borderRadius={0}
                _hover={{ bg: 'gray.100' }}
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
