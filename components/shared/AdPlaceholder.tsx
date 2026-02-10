import { Box, Text } from '@chakra-ui/react';

interface AdPlaceholderProps {
  variant?: 'horizontal' | 'square' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

export function AdPlaceholder({
  variant = 'horizontal',
  size = 'md',
}: AdPlaceholderProps) {
  const heights = {
    horizontal: { sm: '90px', md: '120px', lg: '150px' },
    square: { sm: '200px', md: '250px', lg: '300px' },
    vertical: { sm: '400px', md: '500px', lg: '600px' },
  };

  return (
    <Box
      p={8}
      border="2px dashed"
      borderColor="gray.300"
      bg="gray.50"
      textAlign="center"
      h={heights[variant][size]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        Ad Space (ca-pub-XXX)
      </Text>
      <Text color="gray.400" fontSize="xs" mt={1}>
        Google AdSense Placeholder
      </Text>
      <Text color="gray.400" fontSize="xs">
        {variant} - {size}
      </Text>
    </Box>
  );
}
