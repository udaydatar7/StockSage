import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { motion } from 'framer-motion'; // Import motion for animations
import { useThemeContext } from '../ThemeContext'; // Import the theme context

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = ({ stockData, predictions }: { stockData: { date: string, price: number }[], predictions: (number | null)[] }) => {
  const { theme } = useThemeContext(); // Access the current theme

  // Calculate latest and previous prices
  const latestPrice = stockData.length > 0 ? stockData[stockData.length - 1].price : 0; // Latest price
  const previousPrice = stockData.length > 1 ? stockData[stockData.length - 2].price : 0; // Previous price

  // Calculate percentage change
  const percentageChange = ((latestPrice - previousPrice) / previousPrice) * 100;

  // Determine arrow direction and color
  const arrowColor = percentageChange >= 0 ? 'green' : 'red';
  const arrowDirection = percentageChange >= 0 ? 'up' : 'down';

  // Prepare chart data
  const labels = stockData.map((data) => data.date);
  const extendedLabels = [...labels]; // Clone the existing labels array
  const daysToAdd = 7; // Number of additional days to add
  const lastDate = new Date(labels[labels.length - 1]); // Get the last date in current data

  for (let i = 1; i <= daysToAdd; i++) {
    // Clone the last date and add days to it
    const nextDate = new Date(lastDate.getTime());
    nextDate.setDate(nextDate.getDate() + i);

    // Format the date to YYYY-MM-DD
    const formattedDate = `${nextDate.getFullYear()}-${(nextDate.getMonth() + 1).toString().padStart(2, '0')}-${nextDate.getDate().toString().padStart(2, '0')}`;
    extendedLabels.push(formattedDate);
  }

  // Construct datasets for chartData
  const datasets = [
    {
      label: 'Stock Price',
      data: stockData.map((data) => data.price),
      fill: false,
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper,
      tension: 0.1
    }
  ];

  // Find the index of the first prediction that is not null
  const firstPredictionIndex = predictions.findIndex(pred => pred !== null);

  // Add the predicted price dataset only if there's a valid prediction
  if (firstPredictionIndex !== -1) {
    // Create an array to hold predicted prices and nulls
    const predictedPrices = new Array(stockData.length).fill(null);
    predictedPrices[stockData.length] = predictions[firstPredictionIndex];

    datasets.push({
      label: 'Predicted Price',
      data: predictedPrices,
      fill: false,
      borderColor: theme.palette.secondary.main,
      backgroundColor:theme.palette.primary.main ,
      tension: 0.1
    });
  }

  const chartData = {
    labels: extendedLabels,
    datasets: datasets
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: theme.palette.text.primary
        },
        ticks: {
          color: theme.palette.text.primary
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price',
          color: theme.palette.text.primary
        },
        ticks: {
          color: theme.palette.text.primary
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: theme.palette.text.primary
        }
      }
    }
  };

  return (
    <>
      <Line data={chartData} options={options} />
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', color: theme.palette.text.primary }}>
        <h3>Latest Price: ${latestPrice.toFixed(2)}</h3>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginLeft: '10px' }}
        >
          {percentageChange !== 0 && (
            <svg width="10" height="10" style={{ marginLeft: '5px', transform: `rotate(${arrowDirection === 'up' ? 0 : 180}deg)` }}>
              <polygon
                points="0,0 10,0 5,10"
                fill={arrowColor}
              />
            </svg>
          )}
        </motion.div>
        <p style={{ marginLeft: '10px' }}>Percentage Change: {percentageChange.toFixed(2)}%</p>
      </div>
    </>
  );
};

export default StockChart;
