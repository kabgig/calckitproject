import { Button, ButtonProps } from '@chakra-ui/react';

export function ModernButton(props: ButtonProps) {
  return (
    <Button
      bg="brand.500"
      color="white"
      borderRadius="lg"
      fontWeight="medium"
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{
        bg: 'brand.600',
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      _active={{
        bg: 'brand.700',
        transform: 'translateY(0)',
      }}
      {...props}
    />
  );
}
