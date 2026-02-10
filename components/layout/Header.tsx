'use client';

import {
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="header"
      bg="white"
      borderBottom="1px solid"
      borderColor="black"
      px={{ base: 4, md: 8 }}
      py={4}
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo/Brand - Left on desktop/tablet, center on mobile */}
        <Box flex={isMobile ? '1' : '0'} textAlign={isMobile ? 'center' : 'left'}>
          <Link
            as={NextLink}
            href="/"
            fontSize="xl"
            fontWeight="bold"
            _hover={{ textDecoration: 'none' }}
          >
            CalcKit.us
          </Link>
        </Box>

        {/* Desktop/Tablet Navigation */}
        {!isMobile && (
          <Flex gap={6} align="center">
            {/* Calculators Dropdown */}
            <Menu>
              <MenuButton
                as={Link}
                fontWeight="medium"
                _hover={{ textDecoration: 'none', color: 'gray.700' }}
                cursor="pointer"
              >
                Calculators
              </MenuButton>
              <MenuList borderRadius={0} border="1px solid" borderColor="black">
                <MenuItem
                  as={NextLink}
                  href="/mortgage"
                  _hover={{ bg: 'gray.100' }}
                >
                  Mortgage Calculator
                </MenuItem>
                <MenuItem
                  as={NextLink}
                  href="/apy"
                  _hover={{ bg: 'gray.100' }}
                >
                  APY Calculator
                </MenuItem>
              </MenuList>
            </Menu>

            {/* Blog Link (not a dropdown) */}
            <Link
              as={NextLink}
              href="/blog"
              fontWeight="medium"
              _hover={{ textDecoration: 'none', color: 'gray.700' }}
            >
              Blog
            </Link>
          </Flex>
        )}

        {/* Mobile Hamburger Icon */}
        {isMobile && (
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            _hover={{ bg: 'gray.100' }}
          />
        )}
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent borderRadius={0}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor="black">
            Menu
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack align="stretch" spacing={0}>
              <Box
                borderBottom="1px solid"
                borderColor="gray.200"
                p={4}
                bg="gray.50"
              >
                <Text fontWeight="bold" fontSize="sm" color="gray.600">
                  CALCULATORS
                </Text>
              </Box>
              <Link
                as={NextLink}
                href="/mortgage"
                p={4}
                _hover={{ bg: 'gray.100', textDecoration: 'none' }}
                borderBottom="1px solid"
                borderColor="gray.200"
                onClick={onClose}
              >
                Mortgage Calculator
              </Link>
              <Link
                as={NextLink}
                href="/apy"
                p={4}
                _hover={{ bg: 'gray.100', textDecoration: 'none' }}
                borderBottom="1px solid"
                borderColor="gray.200"
                onClick={onClose}
              >
                APY Calculator
              </Link>
              <Link
                as={NextLink}
                href="/blog"
                p={4}
                _hover={{ bg: 'gray.100', textDecoration: 'none' }}
                borderBottom="1px solid"
                borderColor="gray.200"
                onClick={onClose}
              >
                Blog
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
