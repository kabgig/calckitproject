import { Box, BoxProps } from '@chakra-ui/react';

export function ModernCard(props: BoxProps) {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      boxShadow="md"
      p={6}
      transition="all 0.2s"
      _hover={{
        boxShadow: 'xl',
        transform: 'translateY(-4px)',
      }}
      {...props}
    />
  );
}
