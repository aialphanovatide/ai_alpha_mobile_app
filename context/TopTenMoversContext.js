import React, {createContext, useEffect, useState} from 'react';
import {getService, getServiceV2} from '../services/aiAlphaApi';

const Top10MoversContext = createContext();

const Top10MoversContextProvider = ({children}) => {
  const [topTenMoversData, setTopTenMoversData] = useState([]);
  const [topTenLosersData, setTopTenLosersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchTopTenCoinsFromServer = async () => {
      try {
        // const response = await getService(
        //   `api/top-movers?vs_currency=usd&order=price_change_desc&precision=2`,
        // );
        // [TEMPORARY] Development server configuration
        const data = await fetch(
          `https://aialpha2-dev.ngrok.io/chart/top-movers`,
          {
            headers: {
              'X-API-KEY': 'alpha_auxQDT_5rIy7unRVveat6Nb6pwqhXPW4_e9e5',
            },
          },
        );
        const response = await data.json();
        // const response = await getServiceV2('/chart/top-movers')
        const top10CoinsInfo = [];
        const top10LosersInfo = [];

        if (response.success) {
          for (let i = 0; i < response.data.top_10_gainers.length; i++) {
            const coin = response.data.top_10_gainers[i];
            const coinInfo = {
              name:
                coin.name.length > 15
                  ? coin.name.trim().split(/\s+/g)[0]
                  : coin.name,
              symbol:
                coin.symbol.toLowerCase() === 'ethdydx'
                  ? 'dydx'
                  : coin.symbol.toLowerCase() === 'matic'
                  ? 'pol'
                  : coin.symbol.toLowerCase() === 'render'
                  ? 'rndr'
                  : coin.symbol,
              image: coin.image,
              currentPrice: coin.current_price,
              priceChange24H: coin.price_change_percentage_24h
                ? coin.price_change_percentage_24h
                : 0.0,
            };
            top10CoinsInfo.push(coinInfo);
          }

          for (let i = 0; i < response.data.top_10_losers.length; i++) {
            const coin = response.data.top_10_losers[i];
            const coinInfo = {
              name:
                coin.name.length > 15
                  ? coin.name.trim().split(/\s+/)[0]
                  : coin.name,
              symbol:
                coin.symbol.toLowerCase() === 'ethdydx'
                  ? 'dydx'
                  : coin.symbol.toLowerCase() === 'matic'
                  ? 'pol'
                  : coin.symbol.toLowerCase() === 'render'
                  ? 'rndr'
                  : coin.symbol,
              image: coin.image,
              currentPrice: coin.current_price,
              priceChange24H: coin.price_change_percentage_24h
                ? coin.price_change_percentage_24h
                : 0.0,
            };
            top10LosersInfo.push(coinInfo);
          }
        }

        setTopTenMoversData(top10CoinsInfo);
        setTopTenLosersData(top10LosersInfo);
      } catch (error) {
        console.error('Error fetching top 10 movers data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopTenCoinsFromServer();
  }, []);

  return (
    <Top10MoversContext.Provider
      value={{topTenMoversData, topTenLosersData, loading}}>
      {children}
    </Top10MoversContext.Provider>
  );
};

export {Top10MoversContext, Top10MoversContextProvider};
