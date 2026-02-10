'use client';

import { Box, Text, Flex } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box
      as="footer"
      bg="white"
      borderTop="1px solid"
      borderColor="black"
      py={6}
      mt="auto"
    >
      <Flex justify="center" align="center" maxW="1200px" mx="auto" px={4}>
        <Text fontSize="sm" textAlign="center">
          © 2026 CalcKit.us | Free Financial Calculators
        </Text>
      </Flex>
    </Box>
  );
}
