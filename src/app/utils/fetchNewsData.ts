// utils/fetchNewsData.ts

export const fetchNewsData = async (stockSymbol: string) => {
    const apiKey = 'LxfOFGHySf3AAhfsdIN4t4cXZ4efT5ErOwZbPrnL'; // Replace with your actual API key for thenewsapi.com
    const url = `https://api.thenewsapi.com/v1/news/all?api_token=${apiKey}&search=${stockSymbol}&language=en&categories=business`; // Adjusted query to include 'stock' for thenewsapi.com

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch news data');
        }
        const data = await response.json();
        return data.data; // Return 'data' array from the API response
    } catch (error) {
        console.error('Error fetching news data:', error);
        return []; // Return empty array or handle error as needed
    }
};
