import React, {createContext, useContext, useEffect, useState} from 'react';
import {getService} from '../services/aiAlphaApi';
import {io} from 'socket.io-client';
import {CategoriesContext} from './categoriesContext';

const Top10MoversContext = createContext();

const Top10MoversContextProvider = ({children}) => {
  const [topTenMoversData, setTopTenMoversData] = useState([]);
  const [topTenLosersData, setTopTenLosersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {categories, findCategoryOfItem} = useContext(CategoriesContext);

  // useEffect(() => {
  //   const socket = io('https://aialpha.ngrok.io/');
  //   socket.emit('subscribe_to_top_movers', {
  //     vs_currency: 'usd',
  //     order: 'price_change_desc',
  //     precision: 2,
  //   });
  //   socket.on('subscribe_to_top_movers', messageData => {
  //     console.log('Received top 10 gainers socket data:', messageData);
  //     // const data =
  //     //   typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
  //     // console.log('Parsed top 10 gainers socket data: ', data);
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    setLoading(true);
    const fetchTopTenCoinsFromServer = async () => {
      try {
        const response = await getService(
          `api/top-movers?vs_currency=usd&order=price_change_desc&precision=2`,
        );
        const top10CoinsInfo = [];
        const top10LosersInfo = [];

        if (response.success) {
          for (let i = 0; i < response.data.top_10_gainers.length; i++) {
            const coin = response.data.top_10_gainers[i];
            const coin_category = findCategoryOfItem(
              coin.symbol.toLowerCase(),
              coin.name.toLowerCase(),
            );
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
                  : coin.symbol,
              image: coin.image,
              currentPrice: coin.current_price,
              priceChange24H: coin.price_change_percentage_24h
                ? coin.price_change_percentage_24h
                : 0.0,
              category: coin_category,
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
                coin.symbol.toLowerCase() === 'matic' ? 'pol' : coin.symbol,
              image: coin.image,
              currentPrice: coin.current_price,
              priceChange24H: coin.price_change_percentage_24h
                ? coin.price_change_percentage_24h
                : 0.0,
              category: findCategoryOfItem(coin.symbol, coin.name, categories),
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
