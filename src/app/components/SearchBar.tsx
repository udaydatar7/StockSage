// src/components/SearchBar.tsx

import { useRouter } from 'next/navigation';
import { Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/home?stock=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center" mt={2} mb={2}>
      <TextField
        label="Search for a stock"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mr: 2 }}
      />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </motion.div>
    </Box>
  );
};

export default SearchBar;
