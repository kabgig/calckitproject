import { Box, BoxProps } from '@chakra-ui/react';

export function FlatCard(props: BoxProps) {
  return (
    <Box
      bg="gray.50"
      border="1px solid"
      borderColor="black"
      borderRadius={0}
      p={6}
      {...props}
    />
  );
}
