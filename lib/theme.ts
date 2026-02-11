import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// CalcKit.us - Modern Ethereum-inspired Design Theme
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#F4F0FF',
      100: '#EDE9FE',
      200: '#DDD6FE',
      300: '#C4B5FD',
      400: '#A78BFA',
      500: '#6941C6',
      600: '#5B21B6',
      700: '#4C1D95',
      800: '#3B1873',
      900: '#2E1065',
    },
    purple: {
      50: '#FAF5FF',
      100: '#F3E8FF',
      200: '#E9D5FF',
      300: '#D8B4FE',
      400: '#C084FC',
      500: '#A855F7',
      600: '#9333EA',
      700: '#7E22CE',
      800: '#6B21A8',
      900: '#581C87',
    },
    blue: {
      50: '#EEF2FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#6366F1',
      600: '#4F46E5',
      700: '#4338CA',
      800: '#3730A3',
      900: '#312E81',
    },
    teal: {
      50: '#F0FDFA',
      100: '#CCFBF1',
      200: '#99F6E4',
      300: '#5EEAD4',
      400: '#2DD4BF',
      500: '#14B8A6',
      600: '#0D9488',
      700: '#0F766E',
      800: '#115E59',
      900: '#134E4A',
    },
    pink: {
      50: '#FDF2F8',
      100: '#FCE7F3',
      200: '#FBCFE8',
      300: '#F9A8D4',
      400: '#F472B6',
      500: '#EC4899',
      600: '#DB2777',
      700: '#BE185D',
      800: '#9D174D',
      900: '#831843',
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(105, 65, 198, 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  radii: {
    none: '0',
    sm: '0.25rem',
    base: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.900',
        lineHeight: '1.6',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontWeight: 'bold',
        lineHeight: '1.2',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'lg',
        transition: 'all 0.2s',
        _focus: {
          boxShadow: 'outline',
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
            _disabled: {
              bg: 'brand.500',
              transform: 'none',
            },
          },
          _active: {
            bg: 'brand.700',
            transform: 'translateY(0)',
          },
        },
        outline: {
          borderColor: 'gray.300',
          color: 'gray.700',
          borderWidth: '1px',
          _hover: {
            bg: 'gray.50',
            borderColor: 'gray.400',
            transform: 'translateY(-1px)',
          },
        },
        ghost: {
          color: 'gray.700',
          _hover: {
            bg: 'gray.100',
          },
        },
      },
      sizes: {
        sm: {
          h: '2rem',
          fontSize: 'sm',
          px: 3,
        },
        md: {
          h: '2.5rem',
          fontSize: 'md',
          px: 4,
        },
        lg: {
          h: '3rem',
          fontSize: 'lg',
          px: 6,
        },
      },
      defaultProps: {
        variant: 'solid',
        size: 'md',
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          transition: 'all 0.2s',
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: 'gray.300',
            borderWidth: '1px',
            _hover: {
              borderColor: 'gray.400',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          transition: 'all 0.2s',
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: 'gray.300',
            borderWidth: '1px',
            _hover: {
              borderColor: 'gray.400',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            },
          },
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: 'gray.200',
            color: 'gray.600',
            textTransform: 'uppercase',
            fontSize: 'xs',
            fontWeight: 'semibold',
            letterSpacing: 'wider',
            bg: 'gray.50',
          },
          td: {
            borderColor: 'gray.200',
          },
          tbody: {
            tr: {
              _hover: {
                bg: 'gray.50',
              },
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          borderRadius: '2xl',
          boxShadow: 'md',
          overflow: 'hidden',
          transition: 'all 0.2s',
          _hover: {
            boxShadow: 'xl',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        px: 3,
        py: 1,
        textTransform: 'none',
        fontWeight: 'medium',
      },
      variants: {
        subtle: {
          bg: 'brand.100',
          color: 'brand.700',
        },
      },
    },
  },
});

export default theme;
