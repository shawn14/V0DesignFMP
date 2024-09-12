import { NextResponse } from 'next/server';
import axios from 'axios';

const FMP_API_KEY = process.env.FMP_API_KEY; // Make sure to set this in your environment variables

// Add this new function at the top of the file
function getCurrentTimestamp() {
  return new Date().toISOString();
}

async function fetchStockNews() {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v3/stock_news?apikey=3706e0acf29c4d06404c32b4487db342');
    return response.data.slice(0, 3).map((item: any) => ({
      title: item.title,
      url: item.url,
      symbol: item.symbol,
      image: item.image,
    }));
  } catch (error) {
    console.error('Error fetching stock news:', error);
    return [
      { title: 'Stock News 1', url: '#', symbol: 'N/A', image: '/placeholder.svg' },
      { title: 'Stock News 2', url: '#', symbol: 'N/A', image: '/placeholder.svg' },
      { title: 'Stock News 3', url: '#', symbol: 'N/A', image: '/placeholder.svg' },
    ];
  }
}

async function fetchMarketMovers() {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=3706e0acf29c4d06404c32b4487db342');
    const filteredMovers = response.data
      .filter((item: any) => parseFloat(item.price) > 10.00)
      .slice(0, 10)
      .map((item: any) => ({
        symbol: item.symbol,
        name: item.name,
        price: item.price,
        change: item.change,
        changesPercentage: item.changesPercentage,
      }));
    return filteredMovers;
  } catch (error) {
    console.error('Error fetching market movers:', error);
    return [
      { symbol: 'ERROR', name: 'Error fetching data', price: '0', change: '0', changesPercentage: '0' },
    ];
  }
}

// Remove this function
// async function fetchEconomicCalendar() { ... }

async function fetchSectorPerformance() {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v3/sectors-performance?apikey=3706e0acf29c4d06404c32b4487db342');
    return response.data
      .map((item: any) => ({
        name: item.sector,
        price: parseFloat(item.changesPercentage).toFixed(2) + '%',
        rawPrice: parseFloat(item.changesPercentage)
      }))
      .sort((a: any, b: any) => b.rawPrice - a.rawPrice); // Sort in descending order
  } catch (error) {
    console.error('Error fetching sector performance:', error);
    return [
      { name: 'Error fetching sectors', price: '0.00%', rawPrice: 0 },
    ];
  }
}

// Add this new function to fetch social sentiments
async function fetchSocialSentiments() {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v4/social-sentiments/change?type=bullish&source=stocktwits&apikey=3706e0acf29c4d06404c32b4487db342');
    return response.data.slice(0, 5).map((item: any) => ({
      symbol: item.symbol,
      name: item.name,
      sentiment: item.sentiment,
      sentimentChange: item.sentimentChange,
    }));
  } catch (error) {
    console.error('Error fetching social sentiments:', error);
    return [
      { symbol: 'ERROR', name: 'Error fetching data', sentiment: 0, sentimentChange: 0 },
    ];
  }
}

// Add this new function to fetch insider trades
async function fetchInsiderTrades() {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v4/insider-trading-rss-feed?apikey=3706e0acf29c4d06404c32b4487db342');
    return response.data.slice(0, 5).map((item: any) => ({
      symbol: item.symbol,
      filingDate: item.fillingDate,
      transactionType: item.title.split(' ')[0],
      company: item.title.split(' - ')[1],
      url: item.link,
    }));
  } catch (error) {
    console.error('Error fetching insider trades:', error);
    return [
      { symbol: 'ERROR', filingDate: 'N/A', transactionType: 'N/A', company: 'Error fetching data', url: '#' },
    ];
  }
}

// Add this new function to fetch analyst changes
async function fetchAnalystChanges() {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v4/upgrades-downgrades-rss-feed?page=0&apikey=3706e0acf29c4d06404c32b4487db342');
    return response.data.slice(0, 5).map((item: any) => ({
      symbol: item.symbol,
      publishedDate: item.publishedDate,
      newGrade: item.newGrade,
      previousGrade: item.previousGrade,
      gradingCompany: item.gradingCompany,
      action: item.action,
    }));
  } catch (error) {
    console.error('Error fetching analyst changes:', error);
    return [
      { symbol: 'ERROR', publishedDate: 'N/A', newGrade: 'N/A', previousGrade: 'N/A', gradingCompany: 'Error fetching data', action: 'N/A' },
    ];
  }
}

// Add this new function to fetch Bitcoin price
async function fetchBitcoinPrice() {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v3/historical-chart/1min/BTCUSD?apikey=3706e0acf29c4d06404c32b4487db342');
    const latestPrice = response.data[0]; // Get the most recent price
    return {
      price: latestPrice.close,
      change: latestPrice.close - latestPrice.open,
      changePercent: ((latestPrice.close - latestPrice.open) / latestPrice.open) * 100,
      date: latestPrice.date
    };
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    return {
      price: 0,
      change: 0,
      changePercent: 0,
      date: new Date().toISOString()
    };
  }
}

// Add this new function to fetch House of Representatives Trades
async function fetchHouseTrades() {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v4/senate-disclosure-rss-feed?apikey=3706e0acf29c4d06404c32b4487db342');
    return response.data.slice(0, 5).map((item: any) => ({
      representative: item.representative,
      ticker: item.ticker,
      assetDescription: item.assetDescription,
      type: item.type,
      amount: item.amount,
      transactionDate: item.transactionDate,
    }));
  } catch (error) {
    console.error('Error fetching House trades:', error);
    return [
      { representative: 'ERROR', ticker: 'N/A', assetDescription: 'Error fetching data', type: 'N/A', amount: 'N/A', transactionDate: 'N/A' },
    ];
  }
}

// Modify the GET function
export async function GET(request: Request) {
  try {
    const [news, trends, sales, sentiments, insiderTrades, analystChanges, bitcoinPrice, houseTrades] = await Promise.all([
      fetchStockNews(),
      fetchMarketMovers(),
      fetchSectorPerformance(),
      fetchSocialSentiments(),
      fetchInsiderTrades(),
      fetchAnalystChanges(),
      fetchBitcoinPrice(),
      fetchHouseTrades(),
    ]);

    const data = {
      news,
      trends,
      sales,
      sentiments,
      insiderTrades,
      analystChanges,
      bitcoinPrice,
      houseTrades,
      lastUpdated: getCurrentTimestamp(), // Add this line
    };

    console.log('Returning data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 });
  }
}