// src/app/themes.ts
import { createTheme, Theme } from '@mui/material/styles';

const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#333', // Define text primary color
    },
    divider: '#ccc', // Define divider color
  },
  typography: {
    h6: {
      color: '#333',
    },
    body1: {
      color: '#333',
    },
    body2: {
      color: '#666',
    },
  },
});

const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D3D9D4',
    },
    secondary: {
      main: '#124e66',
    },
    background: {
      default: '#212A31',
      paper: '#2E3944',
    },
    text: {
      primary: '#D3D9D4', // Define text primary color
    },
    divider: '#D3D9D4', // Define divider color
  },
  typography: {
    h6: {
      color: '#D3D9D4',
    },
    body1: {
      color: '#748D92',
    },
    body2: {
      color: '#D3D9D4',
    },
  },
});

const loveSick: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9a1750', // Material Blue
    },
    secondary: {
      main: '#e3afbc', // Material Pink
    },
    background: {
      default: '#5d001e', // White background
      paper: '#e3afbc', // Light grey paper
    },
    text: {
      primary: '#ee4c7c', // Dark grey text
      secondary: '#ee4c7c', // Medium grey text
    },
  },
  typography: {
    h6: {
      color: '#ee4c7c', // Dark grey for headings
    },
    body1: {
      color: '#ffffff', // Dark grey for body text
    },
    body2: {
      color: '#666666', // Medium grey for auxiliary text
    },
  },
});

const deepVintage: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#244855',
    },
    secondary: {
      main: '#E64833',
    },
    background: {
      default: '#874F41',
      paper: '#90AEAD',
    },
    text: {
      primary: '#FBE9D0', // Define text primary color
    },
    divider: '#ccc', // Define divider color
  },
  typography: {
    h6: {
      color: '#FBE9D0',
    },
    body1: {
      color: '#244855',
    },
    body2: {
      color: '#FBE9D0',
    },
  },
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  LoveSick: loveSick,
  'Deep Vintage': deepVintage,
};
