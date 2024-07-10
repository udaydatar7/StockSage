"use client";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Container, Typography, Card, CardContent, useTheme } from '@mui/material';
import SearchBar from '../components/SearchBar';
import StockChart from '../components/StockChart';
import { fetchStockData } from '../utils/fetchStockData';
import { fetchNewsData } from '../utils/fetchNewsData';
import { fetchStockPrediction } from '../utils/fetchStockPrediction';
import ThemeDropdown from '../components/ThemeDropdown';
import StockAnalysis from '../components/StockAnalysis';
import { Suspense } from 'react';

const HomePage = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const stock = searchParams.get('stock');
  const [stockData, setStockData] = useState<{ date: string, price: number }[]>([]);
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<number[]>([]);
  const [arrowBob, setArrowBob] = useState<boolean>(false);
  const [sentiment, setSentiment] = useState<number>(0);
  const [articleSummary, setArticleSummary] = useState<string>(''); // State for arrow animation

  useEffect(() => {
    const fetchData = async () => {
      if (stock) {
        const data = await fetchStockData(stock);
        setStockData(data);
        const newsData = await fetchNewsData(stock);
        setNewsArticles(newsData);

        const predictionData = await fetchStockPrediction(stock);
        console.log(predictionData);

        // Check if predictionData.sentiment is defined before setting state
        if (predictionData && predictionData.sentiment !== undefined) {
          setSentiment(predictionData.sentiment);
        }
        if (predictionData && predictionData.article_titles_summary) {
          setArticleSummary(predictionData.article_titles_summary);
        }
        if (predictionData && predictionData.predictions) {
          setPredictions(predictionData.predictions);
        }
      }
    };

    fetchData();
  }, [stock]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle arrowBob state every 3 seconds
      setArrowBob((prev) => !prev);
    }, 3000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  return (
    <Suspense>
    <Container
      sx={{
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        paddingTop: '64px', // Adjust as per your layout needs
        paddingRight: '8px', // Adjust as per your layout needs
      }}
    >
      <Box alignContent="center" display="flex" justifyContent="space-between">
        <SearchBar />
        <ThemeDropdown />
      </Box>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        style={{ flex: 1 }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          mt={4}
          sx={{ height: 'calc(100% - 64px)' }}
        >
          {/* Display prediction */}
          {predictions.length > 0 ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              bgcolor={theme.palette.background.paper}
              borderRadius={2}
              boxShadow={3}
              sx={{ width: 'fit-content' }}
            >
              <Typography variant="h5" style={{ marginRight: '8px' }}>
                Prediction: ${predictions[0].toFixed(2)}
              </Typography>
              {predictions[0] > 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ color: 'green' }}
                  whileHover={{ y: arrowBob ? -3 : 3 }} // Bobbing animation
                >
                  <ArrowUpward fontSize="large" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ color: 'red' }}
                  whileHover={{ y: arrowBob ? -3 : 3 }} // Bobbing animation
                >
                  <ArrowDownward fontSize="large" />
                </motion.div>
              )}
            </Box>
          ) : (
            <Typography variant="h6">Loading prediction...</Typography>
          )}
        </Box>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeInVariants}
        style={{ height: '100%' }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt={4}
          sx={{ height: 'calc(100% - 64px)' }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            style={{ width: '60%' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              p={2}
              borderRadius={2}
              sx={{ height: '100%' }}
            >
              <Typography variant="h6">{stock} Chart</Typography>
              <StockChart stockData={stockData} predictions={predictions} />
            </Box>
          </motion.div>
          <Box
            display="flex"
            flexDirection="column"
            width="35%"
            ml={2}
            sx={{
              height: '100%',
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '12px',
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: `inset 0 0 6px ${theme.palette.background.default}`,
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.primary.main,
                borderRadius: '10px',
                border: `3px solid ${theme.palette.background.default}`,
              },
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                style={{ flex: 1 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ maxHeight: '100%', overflowY: 'auto' }}>
                      <Typography variant="h6">{stock} News</Typography>
                      {newsArticles.map((article, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          transition={{ delay: 0.1 * index }}
                        >
                          <Box mb={2}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                              <Typography variant="body1">
                                {article.title}
                              </Typography>
                            </a>
                            <Typography variant="body2">{article.description}</Typography>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Suspense>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="95%"
          mt={4}
          p={2}
          borderRadius={2}
          alignItems="center"
        >
          <StockAnalysis sentiment={sentiment} articleSummary={articleSummary} />
        </Box>
      </motion.div>
    </Container>
    </Suspense>
  );
};

export default HomePage;
