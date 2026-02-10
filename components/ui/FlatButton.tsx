import { Button, ButtonProps } from '@chakra-ui/react';

export function FlatButton(props: ButtonProps) {
  return (
    <Button
      bg="black"
      color="white"
      borderRadius={0}
      _hover={{ bg: 'gray.900' }}
      _active={{ bg: 'gray.800' }}
      {...props}
    />
  );
}
