import { Input, InputProps } from '@chakra-ui/react';

export function ModernInput(props: InputProps) {
  return (
    <Input
      borderColor="gray.300"
      borderRadius="md"
      transition="all 0.2s"
      _hover={{ borderColor: 'gray.400' }}
      _focus={{
        borderColor: 'brand.500',
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
      }}
      {...props}
    />
  );
}
