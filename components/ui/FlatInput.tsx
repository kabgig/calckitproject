import { Input, InputProps } from '@chakra-ui/react';

export function FlatInput(props: InputProps) {
  return (
    <Input
      borderRadius={0}
      borderColor="black"
      borderWidth="1px"
      _hover={{ borderColor: 'gray.900' }}
      _focus={{ borderColor: 'gray.900', boxShadow: 'none' }}
      {...props}
    />
  );
}
