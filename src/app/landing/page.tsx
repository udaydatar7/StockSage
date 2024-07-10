"use client";
import { Box, Button, Container, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ThemeDropdown from '../components/ThemeDropdown';

const LandingPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    router.push(`/home?stock=${searchQuery}`);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        sx={{
          marginTop: '20px', // Adjust top margin for title
          color: theme.palette.text.primary, // Adjust text color based on theme
        }}
      >
        <Typography variant="h4" gutterBottom>
          Search for a Stock
        </Typography>
        <TextField
          label="Enter stock symbol"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: '300px', // Adjust width of search bar
            mb: 2, // Adjust margin bottom
            '& .MuiOutlinedInput-root': {
              borderColor: theme.palette.divider, // Adjust outline color based on theme
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.text.primary, // Adjust label color based on theme
            },
            '& .MuiInputBase-input': {
              color: theme.palette.text.primary, // Adjust input text color based on theme
            },
          }}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              backgroundColor: theme.palette.primary.main, // Adjust button background color based on theme
              color: theme.palette.primary.contrastText, // Adjust button text color based on theme
              '&:hover': {
                backgroundColor: theme.palette.primary.dark, // Adjust hover state background color based on theme
              },
            }}
          >
            Search
          </Button>
        </motion.div>
      </Box>
      <Box display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        sx={{
          marginTop: '20px', 
          color: theme.palette.text.primary,
        }}>
        <ThemeDropdown/>
      </Box>
      </motion.div>
    </Container>
  );
};

export default LandingPage;
