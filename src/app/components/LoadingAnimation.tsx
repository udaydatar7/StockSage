"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const LoadingAnimation = ({ isAnimating, setIsAnimating }: { isAnimating: boolean, setIsAnimating: (state: boolean) => void }) => {
  const theme = useTheme();

  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => setIsAnimating(false), 1000); // Adjust duration as needed
    }
  }, [isAnimating, setIsAnimating]);

  return (
    <motion.div
      initial={{ width: '0%' }}
      animate={{ width: isAnimating ? '100%' : '0%' }}
      exit={{ width: '0%' }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
        zIndex: 9999,
      }}
    />
  );
};

export default LoadingAnimation;
