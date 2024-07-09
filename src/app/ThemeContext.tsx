// src/app/ThemeContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes } from './themes/themes';

interface ThemeContextProps {
  setTheme: (themeName: keyof typeof themes) => void;
  theme: Theme;
  themeName: keyof typeof themes;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<keyof typeof themes>('light');
  const theme = themes[themeName];

  const setTheme = (themeName: keyof typeof themes) => {
    setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={{ setTheme, theme, themeName }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
