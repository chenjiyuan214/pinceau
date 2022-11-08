import { defineTheme, palette } from '../../src'

export default defineTheme({
  utils: {
    my: value => ({ marginTop: value, marginBottom: value }),
    mx: value => ({ marginLeft: value, marginRight: value }),
    px: value => ({ paddingLeft: value, paddingRight: value }),
    py: value => ({ paddingTop: value, paddingBottom: value }),
    truncate: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    xxl: '(min-width: 1536px)',
  },
  fonts: {
    primary: 'Inter, sans-serif',
    code: '\'Fira Code\', monospace',
  },
  colors: {
    primary: {
      100: {
        initial: '{colors.blue.100}',
        dark: '{colors.blue.900}',
      },
      200: {
        initial: '{colors.blue.200}',
        dark: '{colors.blue.800}',
      },
      300: {
        initial: '{colors.blue.300}',
        dark: '{colors.blue.700}',
      },
      400: {
        initial: '{colors.blue.400}',
        dark: '{colors.blue.600}',
      },
      500: {
        initial: '{colors.blue.500}',
        dark: '{colors.blue.500}',
      },
      600: {
        initial: '{colors.blue.600}',
        dark: '{colors.blue.400}',
      },
      700: {
        initial: '{colors.blue.700}',
        dark: '{colors.blue.300}',
      },
      800: {
        initial: '{colors.blue.800}',
        dark: '{colors.blue.200}',
      },
      900: {
        initial: '{colors.blue.900}',
        dark: '{colors.blue.100}',
      },
    },
    blue: palette('#2B9EB3'),
    yellow: palette('#FCAB10'),
    red: palette('#F8333C'),
    gray: palette('#DBD5B5'),
    green: palette('#44AF69'),
    pink: palette('pink'),
  },
  shadows: {
    xs: {
      color: '{colors.gray.800}',
      type: 'dropShadow',
      x: '0',
      y: '1',
      blur: '2',
      spread: '0',
    },
    sm: [
      {
        color: '{colors.gray.800}',
        type: 'dropShadow',
        x: '0',
        y: '1',
        blur: '2',
        spread: '-1',
      },
      {
        color: '{colors.gray.800}',
        type: 'dropShadow',
        x: '0',
        y: '1',
        blur: '3',
        spread: '0',
      },
    ],
    md: [
      {
        color: '{colors.gray.800}',
        type: 'dropShadow',
        x: '0',
        y: '2',
        blur: '4',
        spread: '-2',
      },
      {
        color: '{colors.gray.800}',
        type: 'dropShadow',
        x: '0',
        y: '4',
        blur: '6',
        spread: '-1',
      },
    ],
    lg: [
      {
        color: '{colors.gray.800}',
        type: 'dropShadow',
        x: '0',
        y: '4',
        blur: '6',
        spread: '-4',
      },
      {
        color: '{colors.gray.800}',
        type: 'dropShadow',
        x: '0',
        y: '10',
        blur: '15',
        spread: '-3',
      },
    ],
    xl: [
      {
        color: '{colors.gray.800}',
        type: 'dropShadow',
        x: '0',
        y: '8',
        blur: '10',
        spread: '-6',
      },
      {
        color: '{colors.gray.800}',
        type: 'dropShadow',
        x: '0',
        y: '20',
        blur: '25',
        spread: '-5',
      },
    ],
    xxl: {
      color: '{colors.gray.800}',
      type: 'dropShadow',
      x: '0',
      y: '25',
      blur: '50',
      spread: '-12',
    },
  },
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  fontSizes: {
    'xs': '12px',
    'sm': '14px',
    'base': '16px',
    'lg': '18px',
    'xl': '20px',
    'xxl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
    '8xl': '96px',
    '9xl': '128px',
  },
  letterSpacings: {
    tighter: '-.05em',
    tight: '-0025em',
    normal: '0em',
    wide: '0025em',
    wider: '.05em',
    widest: '0.1em',
  },
  leads: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  radii: {
    '2xs': '0.125rem',
    'xs': '0.25rem',
    'sm': '0.375rem',
    'md': '0.5rem',
    'lg': '0.75rem',
    'xl': '1rem',
    'xxl': '1.5rem',
    'full': '9999px',
  },
  size: {
    4: '4px',
    6: '6px',
    8: '8px',
    12: '12px',
    16: '16px',
    20: '20px',
    24: '24px',
    32: '32px',
    40: '40px',
    48: '48px',
    56: '56px',
    64: '64px',
    80: '80px',
    104: '104px',
    200: '200px',
  },
  space: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    6: '6px',
    8: '8px',
    10: '10px',
    12: '12px',
    16: '16px',
    20: '20px',
    24: '24px',
    32: '32px',
    40: '40px',
    44: '44px',
    48: '48px',
    56: '56px',
    64: '64px',
    80: '80px',
    104: '104px',
    140: '140px',
    200: '200px',
  },
  borderWidths: {
    noBorder: '0',
    sm: '1px',
    md: '2px',
    lg: '3px',
  },
  opacity: {
    noOpacity: '0',
    bright: '0.1',
    light: '0.15',
    soft: '0.3',
    medium: '0.5',
    high: '0.8',
    total: '1',
  },
  zIndices: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    6: '6px',
    8: '8px',
    10: '10px',
    12: '12px',
    16: '16px',
    20: '20px',
    24: '24px',
    32: '32px',
    40: '40px',
    44: '44px',
    48: '48px',
    56: '56px',
    64: '64px',
    80: '80px',
    104: '104px',
    140: '140px',
    200: '200px',
  },
})
