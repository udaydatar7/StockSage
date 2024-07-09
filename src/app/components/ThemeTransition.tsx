// components/ThemeTransition.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeTransitionProps {
  theme: Theme;
  children: React.ReactNode;
}

const ThemeTransition: React.FC<ThemeTransitionProps> = ({ theme, children }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={theme.palette.mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeTransition;
