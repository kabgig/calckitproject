import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// CalcKit.us - Black & White Flat Design Theme
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    background: '#FFFFFF',
    text: '#000000',
    gray: {
      50: '#F7FAFC',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171923',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#FFFFFF',
        color: '#000000',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
        fontWeight: 'normal',
      },
      variants: {
        solid: {
          bg: '#000000',
          color: '#FFFFFF',
          _hover: {
            bg: '#171923',
          },
          _active: {
            bg: '#262626',
          },
        },
        outline: {
          borderColor: '#000000',
          color: '#000000',
          borderWidth: '1px',
          _hover: {
            bg: '#F5F5F5',
          },
        },
      },
      defaultProps: {
        variant: 'solid',
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 0,
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: '#000000',
            borderWidth: '1px',
            _hover: {
              borderColor: '#171923',
            },
            _focus: {
              borderColor: '#171923',
              boxShadow: 'none',
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
          borderRadius: 0,
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: '#000000',
            borderWidth: '1px',
            _hover: {
              borderColor: '#171923',
            },
            _focus: {
              borderColor: '#171923',
              boxShadow: 'none',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: '#000000',
            borderWidth: '1px',
            bg: '#F5F5F5',
            color: '#000000',
            fontWeight: 'bold',
          },
          td: {
            borderColor: '#000000',
            borderWidth: '1px',
          },
          tbody: {
            tr: {
              _odd: {
                bg: '#F7FAFC',
              },
              _even: {
                bg: '#FFFFFF',
              },
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 0,
          border: '1px solid #000000',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
