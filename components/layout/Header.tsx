'use client';

import {
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
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
  Badge,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import {
  getAllCategories,
  getCalculatorsByCategory,
  categoryMeta,
} from '@/lib/calculators/registry';

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const categories = getAllCategories();

  return (
    <Box
      as="header"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={{ base: 4, md: 8 }}
      py={4}
      boxShadow="sm"
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo/Brand */}
        <Box flex={isMobile ? '1' : '0'} textAlign={isMobile ? 'center' : 'left'}>
          <Link
            as={NextLink}
            href="/"
            fontSize="xl"
            fontWeight="bold"
            color="gray.900"
            bgGradient="linear(to-r, brand.600, purple.600)"
            bgClip="text"
            _hover={{ textDecoration: 'none', opacity: 0.8 }}
          >
            CalcKit.us
          </Link>
        </Box>

        {/* Desktop/Tablet Navigation */}
        {!isMobile && (
          <Flex gap={6} align="center">
            {/* Calculators Dropdown – Registry-driven */}
            <Menu>
              <MenuButton
                as={Link}
                fontWeight="medium"
                _hover={{ textDecoration: 'none', color: 'gray.700' }}
                cursor="pointer"
              >
                Calculators
              </MenuButton>
              <MenuList
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                boxShadow="lg"
                py={2}
                minW="260px"
              >
                {/* "View All" link at top */}
                <MenuItem
                  as={NextLink}
                  href="/calculators"
                  fontWeight="semibold"
                  _hover={{ bg: 'brand.50' }}
                >
                  View All Calculators
                </MenuItem>
                <MenuDivider />

                {categories.map((cat) => {
                  const calcs = getCalculatorsByCategory(cat);
                  if (calcs.length === 0) return null;
                  const meta = categoryMeta[cat];

                  return (
                    <Box key={cat}>
                      <Flex align="center" px={3} pt={3} pb={1} gap={2}>
                        <Text
                          fontSize="xs"
                          fontWeight="extrabold"
                          color="gray.900"
                          textTransform="uppercase"
                          letterSpacing="wide"
                          whiteSpace="nowrap"
                        >
                          {meta.label}
                        </Text>
                        <Box flex="1" h="1px" bg="gray.300" />
                      </Flex>
                      {calcs.map((c) => (
                        <MenuItem
                          key={c.slug}
                          as={NextLink}
                          href={`/calculators/${c.slug}`}
                          fontSize="sm"
                          _hover={{ bg: 'gray.50' }}
                        >
                          {c.icon} {c.name}
                        </MenuItem>
                      ))}
                    </Box>
                  );
                })}
              </MenuList>
            </Menu>

            <Link
              as={NextLink}
              href="/blog"
              fontWeight="medium"
              _hover={{ textDecoration: 'none', color: 'gray.700' }}
            >
              Blog
            </Link>

            <Link
              href="mailto:ansar_dev@icloud.com?subject=CalcKit.us%20Bug%20Report"
              fontWeight="medium"
              color="red.500"
              _hover={{ textDecoration: 'none', color: 'red.600' }}
              fontSize="sm"
            >
              🐞 Report Bug
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

      {/* Mobile Drawer – Registry-driven */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent borderRadius={0}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor="gray.200">
            Menu
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack align="stretch" spacing={0}>
              {/* View All link */}
              <Link
                as={NextLink}
                href="/calculators"
                p={4}
                fontWeight="semibold"
                _hover={{ bg: 'brand.50', textDecoration: 'none' }}
                borderBottom="1px solid"
                borderColor="gray.200"
                onClick={onClose}
              >
                All Calculators
              </Link>

              {categories.map((cat) => {
                const calcs = getCalculatorsByCategory(cat);
                if (calcs.length === 0) return null;
                const meta = categoryMeta[cat];

                return (
                  <Box key={cat}>
                    <Box
                      borderBottom="1px solid"
                      borderColor="gray.200"
                      p={4}
                      bg="gray.50"
                    >
                      <Badge
                        bg={meta.bg}
                        color={meta.color}
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {meta.label}
                      </Badge>
                    </Box>
                    {calcs.map((c) => (
                      <Link
                        key={c.slug}
                        as={NextLink}
                        href={`/calculators/${c.slug}`}
                        p={4}
                        pl={6}
                        fontSize="sm"
                        _hover={{ bg: 'gray.50', textDecoration: 'none' }}
                        borderBottom="1px solid"
                        borderColor="gray.100"
                        onClick={onClose}
                        display="block"
                      >
                        {c.icon} {c.name}
                      </Link>
                    ))}
                  </Box>
                );
              })}

              <Link
                as={NextLink}
                href="/blog"
                p={4}
                fontWeight="medium"
                _hover={{ bg: 'gray.100', textDecoration: 'none' }}
                borderBottom="1px solid"
                borderColor="gray.200"
                onClick={onClose}
              >
                Blog
              </Link>

              <Link
                href="mailto:ansar_dev@icloud.com?subject=CalcKit.us%20Bug%20Report"
                p={4}
                fontWeight="medium"
                color="red.500"
                _hover={{ bg: 'red.50', textDecoration: 'none' }}
                borderBottom="1px solid"
                borderColor="gray.200"
                onClick={onClose}
              >
                🐞 Report Bug
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
