import React from 'react';
import { MenuItem, Select, SelectChangeEvent, FormControl, InputLabel, useTheme } from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import { themes } from '../themes/themes'; // Adjusted import path
import { motion } from 'framer-motion'; // Import Framer Motion

const ThemeDropdown = () => {
  const { setTheme, themeName } = useThemeContext();
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedTheme = event.target.value as keyof typeof themes;
    setTheme(selectedTheme);
  };

  return (
    <FormControl variant="outlined">
      <motion.div
        initial={{ opacity: 0, y: -20 }} // Initial animation settings
        animate={{ opacity: 1, y: 0 }} // Animation settings when component is in view
        transition={{ duration: 0.3 }} // Animation duration
      >
        <Select
          value={themeName}
          onChange={handleChange}
          label="Theme"
          sx={{
            color: theme.palette.text.primary, // Adjust text color based on theme
            borderColor: theme.palette.divider, // Adjust outline color based on theme
            '& fieldset': {
              borderColor: theme.palette.divider, // Adjust fieldset border color based on theme
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main, // Adjust hover state border color based on theme
            },
          }}
        >
          {Object.keys(themes).map((themeKey) => (
            <MenuItem key={themeKey} value={themeKey}>
              {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </motion.div>
    </FormControl>
  );
};

export default ThemeDropdown;
