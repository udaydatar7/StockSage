"use client";
import { Box, Container, Typography, Card, CardContent, useTheme, Button } from '@mui/material';
import React, { useState, useEffect, Suspense } from 'react';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import StockChart from '../components/StockChart';
import { fetchStockData } from '../utils/fetchStockData';
import { fetchNewsData } from '../utils/fetchNewsData';
import { fetchStockPrediction } from '../utils/fetchStockPrediction';
import ThemeDropdown from '../components/ThemeDropdown';
import StockAnalysis from '../components/StockAnalysis';

const HomePage = () => {
  const theme = useTheme();
  const [stockData, setStockData] = useState<{ date: string, price: number }[]>([]);
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<number[]>([]);
  const [arrowBob, setArrowBob] = useState<boolean>(false);
  const [sentiment, setSentiment] = useState<number>(0);
  const [articleSummary, setArticleSummary] = useState<string>('');

  // Fetching stock parameter from URL query parameters
  const [stock, setStock] = useState<string | null>(null);
  const [searchParamsLoaded, setSearchParamsLoaded] = useState(false);

  useEffect(() => {
    const loadSearchParams = async () => {
      const params = new URLSearchParams(window.location.search);
      const stockParam = params.get('stock');
      if (stockParam) {
        setStock(stockParam);
      }
      setSearchParamsLoaded(true);
    };

    loadSearchParams();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (stock) {
        const data = await fetchStockData(stock);
        setStockData(data);

        const newsData = await fetchNewsData(stock);
        setNewsArticles(newsData);

        const predictionData = await fetchStockPrediction(stock);
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
  }, [stock]); // Depend on stock to re-fetch data when it changes

  useEffect(() => {
    const interval = setInterval(() => {
      setArrowBob(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  if (!searchParamsLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        paddingTop: '64px',
        paddingRight: '8px',
      }}
    >
      <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <Box display="flex" justifyContent="left" alignItems="center" mt={2} mb={2}>
        <Button variant="contained" color="primary" onClick={() => window.location.href = '/'}>
          Back to Home
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mt={2} mb={2}>
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
          {predictions.length > 0 ? (
            <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
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
                  whileHover={{ y: arrowBob ? -3 : 3 }}
                >
                  <ArrowUpward fontSize="large" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ color: 'red' }}
                  whileHover={{ y: arrowBob ? -3 : 3 }}
                >
                  <ArrowDownward fontSize="large" />
                </motion.div>
              )}
            </Box>
            </motion.div>
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
        <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
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
        </motion.div>
        <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
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
      </motion.div>
      </motion.div>
    </Container>
  );
};

export default HomePage;
