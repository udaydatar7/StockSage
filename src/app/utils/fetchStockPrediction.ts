export const fetchStockPrediction = async (symbol: string): Promise<{ predictions: number[], sentiment?: number, article_titles_summary?: string }> => {
  const apiUrl = `http://localhost:5000/predict`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symbol }), 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch predictions: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data from server:", data);

    // Ensure to check if sentiment and article_titles_summary exist in data
    const { predictions, sentiment, article_titles_summary } = data;

    return {
      predictions,
      sentiment,
      article_titles_summary
    };
  } catch (error) {
    console.error('Error fetching predictions:', error);
    throw error;
  }
};
