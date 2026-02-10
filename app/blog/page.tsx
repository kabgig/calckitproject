import { Suspense } from 'react';
import { Box, Heading, SimpleGrid, Text, VStack, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FlatCard } from '@/components/ui/FlatCard';
import { FlatButton } from '@/components/ui/FlatButton';
import { getAllArticles, type ArticleMetadata } from '@/lib/utils/articles';

const ARTICLES_PER_PAGE = 7;

export const metadata = {
  title: 'Blog - Free Calculator Guides | CalcKit.us',
  description: 'Expert guides on mortgage calculations, APY optimization, and financial planning. Learn how to maximize your savings and make informed decisions.',
};

interface BlogPageProps {
  searchParams: { page?: string };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const allArticles = getAllArticles();
  
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const articlesToDisplay = allArticles.slice(startIndex, endIndex);

  return (
    <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }} py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="2xl" mb={4}>
            Financial Guides & Insights
          </Heading>
          <Text fontSize="lg" color="gray.700">
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
                <FlatButton variant="outline">← Previous</FlatButton>
              </Link>
            )}
            
            <Text fontWeight="bold">
              Page {currentPage} of {totalPages}
            </Text>
            
            {currentPage < totalPages && (
              <Link href={`/blog?page=${currentPage + 1}`}>
                <FlatButton variant="outline">Next →</FlatButton>
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
      <FlatCard
        _hover={{ borderColor: 'gray.900', transform: 'translateY(-2px)' }}
        transition="all 0.2s"
        h="full"
        display="flex"
        flexDirection="column"
      >
        <VStack align="stretch" spacing={3} flex={1}>
          <Box
            bg={article.category === 'mortgage' ? 'gray.100' : 'gray.200'}
            px={3}
            py={1}
            w="fit-content"
            fontWeight="bold"
            fontSize="sm"
          >
            {article.category.toUpperCase()}
          </Box>
          
          <Heading size="md" noOfLines={2}>
            {article.title}
          </Heading>
          
          <Text fontSize="sm" color="gray.700" noOfLines={3} flex={1}>
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
            <Text fontSize="sm" fontWeight="bold">
              Read More →
            </Text>
          </HStack>
        </VStack>
      </FlatCard>
    </Link>
  );
}
