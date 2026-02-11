import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Box,
  Container,
  Heading,
  Text,
  Badge,
  VStack,
  Divider,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import { getArticleBySlug, getAllSlugs } from '@/lib/utils/articles';
import { MDXRemote } from 'next-mdx-remote/rsc';

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.metadata.title} | CalcKit.us`,
    description: article.metadata.description,
    keywords: article.metadata.keywords,
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.description,
      type: 'article',
      publishedTime: article.metadata.date,
      url: `https://calckit.us/blog/${slug}`,
      siteName: 'CalcKit.us',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metadata.title,
      description: article.metadata.description,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Determine related calculator based on category
  const relatedCalculator =
    article.metadata.category === 'mortgage'
      ? { name: 'Mortgage Calculator', url: '/mortgage' }
      : { name: 'APY Calculator', url: '/apy' };

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.metadata.title,
    description: article.metadata.description,
    datePublished: article.metadata.date,
    author: {
      '@type': 'Organization',
      name: 'CalcKit.us',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CalcKit.us',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://calckit.us/blog/${article.metadata.slug}`,
    },
    keywords: article.metadata.keywords.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container maxW="container.lg" py={8}>
        <VStack align="stretch" spacing={6}>
          {/* Article Header */}
          <Box>
            <Badge
              fontSize="sm"
              px={3}
              py={1}
              bg={article.metadata.category === 'mortgage' ? 'purple.100' : 'blue.100'}
              color={article.metadata.category === 'mortgage' ? 'purple.700' : 'blue.700'}
              borderRadius="full"
              fontWeight="bold"
              mb={4}
            >
              {article.metadata.category}
            </Badge>
            <Heading as="h1" size="2xl" mb={4} color="gray.900" fontWeight="extrabold">
              {article.metadata.title}
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={2}>
              {article.metadata.description}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Published: {new Date(article.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </Box>

          <Divider borderColor="gray.300" />

          {/* Article Content */}
          <Box
            className="mdx-content"
            sx={{
              '& h2': {
                fontSize: '2xl',
                fontWeight: 'bold',
                mt: 8,
                mb: 4,
                color: 'black',
              },
              '& h3': {
                fontSize: 'xl',
                fontWeight: 'bold',
                mt: 6,
                mb: 3,
                color: 'black',
              },
              '& p': {
                mb: 4,
                lineHeight: 1.8,
                color: 'gray.800',
              },
              '& ul, & ol': {
                mb: 4,
                pl: 6,
                lineHeight: 1.8,
                color: 'gray.800',
              },
              '& li': {
                mb: 2,
              },
              '& strong': {
                fontWeight: 'bold',
                color: 'black',
              },
              '& code': {
                bg: 'gray.100',
                px: 2,
                py: 1,
                borderRadius: 0,
                fontSize: 'sm',
                border: '1px solid',
                borderColor: 'gray.300',
              },
              '& pre': {
                bg: 'gray.100',
                p: 4,
                mb: 4,
                overflowX: 'auto',
                border: '1px solid',
                borderColor: 'gray.300',
                borderRadius: 0,
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'black',
                pl: 4,
                py: 2,
                my: 4,
                fontStyle: 'italic',
                color: 'gray.700',
              },
              '& a': {
                color: 'black',
                textDecoration: 'underline',
                _hover: {
                  color: 'gray.700',
                },
              },
            }}
          >
            <MDXRemote source={article.content} />
          </Box>

          <Divider borderColor="gray.300" mt={8} />

          {/* Related Calculator CTA */}
          <Box
            p={8}
            borderRadius="2xl"
            bgGradient="linear(to-br, brand.50, purple.50)"
            textAlign="center"
            boxShadow="md"
          >
            <Heading as="h3" size="lg" mb={3} color="gray.900" fontWeight="bold">
              Try Our {relatedCalculator.name}
            </Heading>
            <Text mb={4} color="gray.700">
              Put these insights into action with our free calculator tool.
            </Text>
            <Link href={relatedCalculator.url} passHref>
              <Button
                as="a"
                size="lg"
                bg="brand.500"
                color="white"
                borderRadius="lg"
                _hover={{ bg: 'brand.600', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
                px={8}
              >
                Go to {relatedCalculator.name}
              </Button>
            </Link>
          </Box>

          {/* Back to Blog */}
          <Box textAlign="center" mt={4}>
            <Link href="/blog" passHref>
              <Button
                as="a"
                variant="outline"
                borderColor="gray.300"
                color="gray.700"
                borderRadius="md"
                _hover={{ bg: 'gray.50' }}
              >
                ← Back to All Articles
              </Button>
            </Link>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
