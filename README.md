# StockSage: A Bloomberg Terminal Inspired Stock Analysis Web App

## Overview

This project is a web application inspired by the Bloomberg Terminal, providing a simplified interface for stock analysis. It uses Next.js for the frontend, Flask for the backend, and integrates with various APIs and machine learning models.

### Features

- **Stock Data:** Displays stock closing data on a graph.
- **News:** Fetches news related to a specified stock symbol from The News API.
- **Prediction:** Uses Linear Regression for predicting the next closing price of stocks.
- **Sentiment Analysis:** Analyzes sentiment using text blobs.
- **Summary:** Summarizes news stories based on sentiment using Gemini.

## Frontend (Next.js, Material UI, Framer Motion)

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open http://localhost:3000 in your browser.

### Editing

Modify pages/index.tsx to edit the main page. The page auto-updates as you make changes.

### Font

This project uses next/font to automatically optimize and load Inter, a custom Google Font.