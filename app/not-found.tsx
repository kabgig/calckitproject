import { Metadata } from 'next';
import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found - 404',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="3xl" color="gray.900" fontWeight="extrabold">
          404
        </Heading>
        <Heading as="h2" size="xl" color="gray.800" fontWeight="bold">
          Page Not Found
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </Text>
        <Box pt={4}>
          <Link href="/" passHref>
            <Button
              size="lg"
              bg="brand.500"
              color="white"
              borderRadius="lg"
              _hover={{ bg: 'brand.600', transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Go to Home Page
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
}
