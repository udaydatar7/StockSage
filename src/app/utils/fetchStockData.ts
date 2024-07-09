const ALPHA_VANTAGE_API_KEY = 'I6Y2KESEOAXB59YP'; // Replace with your Alpha Vantage API key

export const fetchStockData = async (symbol: string) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  console.log('Raw Data:', data); // Log raw data

  if (data['Time Series (Daily)']) {
    const stockData = Object.keys(data['Time Series (Daily)']).map((date) => ({
      date,
      price: parseFloat(data['Time Series (Daily)'][date]['4. close']),
    })).reverse(); // Reverse to get chronological order

    console.log('Parsed Stock Data:', stockData); // Log parsed stock data

    return stockData;
  } else {
    console.error('Error fetching stock data:', data); // Log error
    return [];
  }
};
