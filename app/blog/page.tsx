import { Suspense } from 'react';
import { Metadata } from 'next';
import { Box, Heading, SimpleGrid, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import Link from 'next/link';
import { ModernCard } from '@/components/ui/ModernCard';
import { ModernButton } from '@/components/ui/ModernButton';
import { getAllArticles, type ArticleMetadata } from '@/lib/utils/articles';

const ARTICLES_PER_PAGE = 7;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageTitle = currentPage > 1 ? `Financial Guides - Page ${currentPage}` : 'Financial Guides & Tutorials';
  const pageUrl = currentPage > 1 ? `https://calckit.us/blog?page=${currentPage}` : 'https://calckit.us/blog';
  
  return {
    title: pageTitle,
    description: 'Expert guides on mortgage calculations, APY optimization, and financial planning. Learn how to maximize your savings and make informed home buying decisions.',
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: 'Expert guides on mortgage calculations, APY optimization, and financial planning. Learn how to maximize your savings and make informed home buying decisions.',
      url: pageUrl,
      type: 'website',
      siteName: 'CalcKit.us',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: 'Expert guides on mortgage calculations, APY optimization, and financial planning.',
    },
  };
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const allArticles = getAllArticles();
  
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const articlesToDisplay = allArticles.slice(startIndex, endIndex);

  return (
    <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }} py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="2xl" mb={4} fontWeight="extrabold" color="gray.900">
            Financial Guides & Insights
          </Heading>
          <Text fontSize="lg" color="gray.600" fontWeight="medium">
            Expert articles on mortgages, savings optimization, and financial planning
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {articlesToDisplay.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </SimpleGrid>

        {/* Pagination */}
        {totalPages > 1 && (
          <HStack justify="center" spacing={4} mt={8}>
            {currentPage > 1 && (
              <Link href={`/blog?page=${currentPage - 1}`}>
                <ModernButton variant="outline" colorScheme="gray">← Previous</ModernButton>
              </Link>
            )}
            
            <Text fontWeight="bold" color="gray.700">
              Page {currentPage} of {totalPages}
            </Text>
            
            {currentPage < totalPages && (
              <Link href={`/blog?page=${currentPage + 1}`}>
                <ModernButton variant="outline" colorScheme="gray">Next →</ModernButton>
              </Link>
            )}
          </HStack>
        )}
      </VStack>
    </Box>
  );
}

function ArticleCard({ article }: { article: ArticleMetadata }) {
  return (
    <Link href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
      <ModernCard
        h="full"
        display="flex"
        flexDirection="column"
      >
        <VStack align="stretch" spacing={3} flex={1}>
          <Badge
            bg={article.category === 'mortgage' ? 'purple.100' : 'blue.100'}
            color={article.category === 'mortgage' ? 'purple.700' : 'blue.700'}
            px={3}
            py={1}
            w="fit-content"
            fontWeight="bold"
            fontSize="sm"
            borderRadius="full"
          >
            {article.category.toUpperCase()}
          </Badge>
          
          <Heading size="md" noOfLines={2} color="gray.900">
            {article.title}
          </Heading>
          
          <Text fontSize="sm" color="gray.600" noOfLines={3} flex={1}>
            {article.description}
          </Text>
          
          <HStack justify="space-between" pt={2} borderTop="1px solid" borderColor="gray.200">
            <Text fontSize="xs" color="gray.600">
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="brand.500">
              Read More →
            </Text>
          </HStack>
        </VStack>
      </ModernCard>
    </Link>
  );
}
