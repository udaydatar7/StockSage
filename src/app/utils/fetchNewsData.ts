// utils/fetchNewsData.ts

export const fetchNewsData = async (stockSymbol: string) => {
    const apiKey = '95ac3368f4254a298e9deef7f0db81a7'; // Replace with your actual API key
    const url = `https://newsapi.org/v2/top-headlines?q=TSLA&apiKey=95ac3368f4254a298e9deef7f0db81a7`; // Adjusted query to include 'stock'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch news data');
        }
        const data = await response.json();
        return data.articles; // Assuming the API returns articles array
    } catch (error) {
        console.error('Error fetching news data:', error);
        return []; // Return empty array or handle error as needed
    }
};
