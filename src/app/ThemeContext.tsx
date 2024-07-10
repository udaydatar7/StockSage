"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  const [initialized, setInitialized] = useState(false); // To track initialization

  useEffect(() => {
    // Check if localStorage is available and initialize theme
    const storedTheme = window.localStorage.getItem('theme') as keyof typeof themes | null;
    if (storedTheme && themes[storedTheme]) {
      setThemeName(storedTheme);
    }
    setInitialized(true); // Mark initialization as complete
  }, []); // Only run once on component mount

  const theme = themes[themeName];

  const setTheme = (themeName: keyof typeof themes) => {
    window.localStorage.setItem('theme', themeName);
    setThemeName(themeName);
  };

  if (!initialized) {
    return null; // Render nothing until initialization is complete
  }

  return (
    <ThemeContext.Provider value={{ setTheme, theme, themeName }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
