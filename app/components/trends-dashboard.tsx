"use client";

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ArrowUpRight, TrendingUp, ArrowDownRight, TrendingDown, Calendar, BarChart2, Bitcoin, Users, LineChart } from "lucide-react"
import Image from 'next/image';

export default function TrendsDashboard() {
  console.log('TrendsDashboard rendering', { isLoading: true, trends: { news: [], trends: [], sales: [], sentiments: [], insiderTrades: [], analystChanges: [], bitcoinPrice: { price: 0, change: 0, changePercent: 0, date: new Date().toISOString() }, houseTrades: [] } });
  const [trends, setTrends] = useState<TrendsData>({
    news: [],
    trends: [],
    sales: [],
    sentiments: [],
    insiderTrades: [],
    analystChanges: [],
    bitcoinPrice: { price: 0, change: 0, changePercent: 0, date: new Date().toISOString() },
    houseTrades: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrends = async () => {
    try {
      console.log('Fetching trends...');
      const response = await fetch('/api/trends');
      console.log('Response received:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: TrendsData = await response.json();
      console.log('Data received:', data);
      setTrends(data);
      console.log('Trends state updated');
      setIsLoading(false);
      console.log('Loading state set to false');
    } catch (error) {
      console.error('Error fetching trends:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect running');
    fetchTrends();
  }, []);

  console.log('Rendering component', { isLoading, trends });

  if (isLoading) {
    return <div>Loading trends...</div>;
  }

  if (!trends.news.length && !trends.trends.length && !trends.sales.length && !trends.sentiments.length && !trends.insiderTrades.length && !trends.analystChanges.length && trends.bitcoinPrice.price === 0 && !trends.houseTrades.length) {
    return <div>No trends data available</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Stock Alarm Trends</h1>
      <button 
        onClick={fetchTrends}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Trends
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <TrendCard title="Stock News" icon={<TrendingUp className="h-4 w-4" />}>
          <div className="space-y-2">
            {trends.news.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Image src={item.image} alt={item.title} width={50} height={50} className="w-12 h-12 object-cover rounded" />
                <div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline">{item.title}</a>
                  <p className="text-xs text-muted-foreground">
                    Symbol: <a href={`https://app.stockalarm.io/symbols/${item.symbol}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.symbol}</a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TrendCard>
        <TrendCard title="Market Movers" icon={<TrendingUp className="h-4 w-4" />}>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {trends.trends.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <a href={`https://app.stockalarm.io/symbols/${item.symbol}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline">{item.symbol}</a>
                  <p className="text-xs text-muted-foreground">{item.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">${parseFloat(item.price).toFixed(2)}</p>
                  <p className={`text-xs ${parseFloat(item.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {parseFloat(item.change) >= 0 ? '+' : ''}{parseFloat(item.change).toFixed(2)} ({item.changesPercentage}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TrendCard>
        <TrendCard title="Sector Performance" icon={<TrendingUp className="h-4 w-4" />}>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {trends.sales.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </TrendCard>
        <TrendCard title="Social Sentiments" icon={<TrendingUp className="h-4 w-4" />}>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {trends.sentiments.map((item, index) => (
              <SentimentItem
                key={index}
                symbol={item.symbol}
                name={item.name}
                sentiment={item.sentiment}
                sentimentChange={item.sentimentChange}
              />
            ))}
          </div>
        </TrendCard>
        <TrendCard title="Insider Trades" icon={<Calendar className="h-4 w-4" />}>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {trends.insiderTrades.map((item, index) => (
              <InsiderTradeItem
                key={index}
                symbol={item.symbol}
                filingDate={item.filingDate}
                transactionType={item.transactionType}
                company={item.company}
                url={item.url}
              />
            ))}
          </div>
        </TrendCard>
        <TrendCard title="Analyst Changes" icon={<BarChart2 className="h-4 w-4" />}>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {trends.analystChanges.map((item, index) => (
              <AnalystChangeItem
                key={index}
                symbol={item.symbol}
                publishedDate={item.publishedDate}
                newGrade={item.newGrade}
                previousGrade={item.previousGrade}
                gradingCompany={item.gradingCompany}
                action={item.action}
              />
            ))}
          </div>
        </TrendCard>
        <TrendCard title="Bitcoin Price" icon={<Bitcoin className="h-4 w-4" />}>
          <BitcoinPriceItem
            price={trends.bitcoinPrice.price}
            change={trends.bitcoinPrice.change}
            changePercent={trends.bitcoinPrice.changePercent}
            date={trends.bitcoinPrice.date}
          />
        </TrendCard>
        <TrendCard title="House Trades" icon={<Users className="h-4 w-4" />}>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {trends.houseTrades.map((item, index) => (
              <HouseTradeItem
                key={index}
                representative={item.representative}
                ticker={item.ticker}
                assetDescription={item.assetDescription}
                type={item.type}
                amount={item.amount}
                transactionDate={item.transactionDate}
              />
            ))}
          </div>
        </TrendCard>
      </div>
    </div>
  )
}

function TrendCard({ title, children, icon }: { title: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function ProductItem({ name, price }: { name: string; price: string }) {
  const priceValue = parseFloat(price);
  const isPositive = priceValue >= 0;
  const priceColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">{name}</p>
      <div className="flex items-center">
        <p className={`text-sm font-bold ${priceColor}`}>
          {isPositive ? '+' : ''}{price}
        </p>
        {isPositive ? 
          <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" /> : 
          <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
        }
      </div>
    </div>
  )
}

function SentimentItem({ symbol, name, sentiment, sentimentChange }: { symbol: string; name: string; sentiment: number; sentimentChange: number }) {
  const isPositive = sentimentChange >= 0;
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div className="flex items-center justify-between">
      <div>
        <a href={`https://app.stockalarm.io/symbols/${symbol}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline">{symbol}</a>
        <p className="text-xs text-muted-foreground">{name}</p>
      </div>
      <div className="flex items-center">
        <p className="text-sm font-bold mr-2">{sentiment.toFixed(2)}</p>
        <p className={`text-xs ${changeColor}`}>
          {isPositive ? '+' : ''}{sentimentChange.toFixed(2)}%
        </p>
        {isPositive ? 
          <TrendingUp className="h-4 w-4 text-green-500 ml-1" /> : 
          <TrendingDown className="h-4 w-4 text-red-500 ml-1" />
        }
      </div>
    </div>
  )
}

function InsiderTradeItem({ symbol, filingDate, transactionType, company, url }: { symbol: string; filingDate: string; transactionType: string; company: string; url: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <a href={`https://app.stockalarm.io/symbols/${symbol}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline">{symbol}</a>
        <p className="text-xs text-muted-foreground">{company}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{transactionType}</p>
        <p className="text-xs text-muted-foreground">{new Date(filingDate).toLocaleDateString()}</p>
      </div>
    </div>
  )
}

function AnalystChangeItem({ symbol, publishedDate, newGrade, previousGrade, gradingCompany, action }: { symbol: string; publishedDate: string; newGrade: string; previousGrade: string; gradingCompany: string; action: string }) {
  const isUpgrade = action === 'upgrade';
  const changeColor = isUpgrade ? 'text-green-500' : 'text-red-500';

  return (
    <div className="flex items-center justify-between">
      <div>
        <a href={`https://app.stockalarm.io/symbols/${symbol}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline">{symbol}</a>
        <p className="text-xs text-muted-foreground">{gradingCompany}</p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-medium ${changeColor}`}>{newGrade}</p>
        <p className="text-xs text-muted-foreground">{new Date(publishedDate).toLocaleDateString()}</p>
      </div>
    </div>
  )
}

function BitcoinPriceItem({ price, change, changePercent, date }: { price: number; change: number; changePercent: number; date: string }) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  // Format the price with commas and two decimal places
  const formattedPrice = price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold">${formattedPrice}</p>
      <div className={`flex items-center ${changeColor}`}>
        <p className="text-sm font-medium">
          {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
        </p>
        {isPositive ? 
          <ArrowUpRight className="h-4 w-4 ml-1" /> : 
          <ArrowDownRight className="h-4 w-4 ml-1" />
        }
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        As of {new Date(date).toLocaleString()}
      </p>
    </div>
  )
}

function HouseTradeItem({ representative, ticker, assetDescription, type, amount, transactionDate }: { representative: string; ticker: string; assetDescription: string; type: string; amount: string; transactionDate: string }) {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{representative}</span>
        <span className="text-sm">{type}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs">{ticker ? ticker : assetDescription}</span>
        <span className="text-xs">{amount}</span>
      </div>
      <span className="text-xs text-muted-foreground">{new Date(transactionDate).toLocaleDateString()}</span>
    </div>
  )
}

interface TrendsData {
  trends: {
    symbol: string;
    name: string;
    price: string;
    change: string;
    changesPercentage: string;
  }[];
  news: { title: string; url: string; symbol: string; image: string }[];
  sales: { name: string; price: string }[];
  sentiments: { symbol: string; name: string; sentiment: number; sentimentChange: number }[];
  insiderTrades: {
    symbol: string;
    filingDate: string;
    transactionType: string;
    company: string;
    url: string;
  }[];
  analystChanges: {
    symbol: string;
    publishedDate: string;
    newGrade: string;
    previousGrade: string;
    gradingCompany: string;
    action: string;
  }[];
  bitcoinPrice: {
    price: number;
    change: number;
    changePercent: number;
    date: string;
  };
  houseTrades: {
    representative: string;
    ticker: string;
    assetDescription: string;
    type: string;
    amount: string;
    transactionDate: string;
  }[];
}