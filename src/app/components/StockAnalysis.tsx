// components/StockAnalysis.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface StockAnalysisProps {
  sentiment: number;
  articleSummary: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const StockAnalysis: React.FC<StockAnalysisProps> = ({ sentiment, articleSummary }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={2}
      borderRadius={2}
      bgcolor="background.paper"
      boxShadow={3}
      sx={{ width: 'fit-content', marginBottom: '20px' }}
      component={motion.div}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div variants={fadeInUp} transition={{ delay: 0.1, duration: 0.5 }}>
        <Typography variant="h6" mb={2}>Analysis</Typography>
      </motion.div>
      <motion.div variants={fadeInUp} transition={{ delay: 0.2, duration: 0.5 }}>
        <Typography variant="body1" mb={2}>Sentiment: {sentiment.toFixed(2)}</Typography>
      </motion.div>
      <motion.div variants={fadeInUp} transition={{ delay: 0.3, duration: 0.5 }}>
        <Typography variant="body2">{articleSummary}</Typography>
      </motion.div>
    </Box>
  );
};

export default StockAnalysis;
