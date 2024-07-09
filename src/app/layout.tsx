// src/app/layout.tsx
"use client";

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './ThemeContext';
import { GlobalStyles } from '@mui/material';
import '../app/globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <GlobalStyles
            styles={(theme) => ({
              '*::-webkit-scrollbar': {
                width: '12px',
              },
              '*::-webkit-scrollbar-track': {
                boxShadow: `inset 0 0 6px ${theme.palette.background.default}`,
                borderRadius: '10px', // Rounded track
              },
              '*::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.primary.main,
                borderRadius: '10px', // Rounded thumb
                border: `3px solid ${theme.palette.background.default}`,
              },
              '*': {
                scrollbarWidth: 'thin',
                scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
              },
            })}
          />
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
