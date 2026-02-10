import type { MDXComponents } from 'mdx/types';
import { Heading, Text, Link, Code, Box } from '@chakra-ui/react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <Heading as="h1" size="2xl" mb={6} {...props} />,
    h2: (props) => <Heading as="h2" size="xl" mt={8} mb={4} {...props} />,
    h3: (props) => <Heading as="h3" size="lg" mt={6} mb={3} {...props} />,
    p: (props) => <Text mb={4} lineHeight="1.7" {...props} />,
    a: (props) => <Link color="gray.800" textDecoration="underline" {...props} />,
    code: (props) => <Code bg="gray.100" p={1} borderRadius={0} {...props} />,
    pre: (props) => (
      <Box
        as="pre"
        bg="gray.100"
        p={4}
        overflowX="auto"
        border="1px solid"
        borderColor="black"
        mb={4}
        {...props}
      />
    ),
    ...components,
  };
}
