// src/components/StockDataTest.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { fetchStockData } from '../utils/fetchStockData';

const StockDataTest = ({ symbol }: { symbol: string }) => {
  const [stockData, setStockData] = useState<{ date: string, price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchStockData(symbol);
        setStockData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stock data');
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Stock Data for {symbol}</h3>
      <ul>
        {stockData.map((item) => (
          <li key={item.date}>
            {item.date}: {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockDataTest;
