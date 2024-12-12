/* eslint-disable prettier/prettier */
// import Config from 'react-native-config';
//import {COINGECKO_API_KEY_ENVVAR} from '@env';
import {COINGECKO_API_KEY_ENVVAR} from '@env';

// Function to get the top 10 coins ordering them by the price change for the recent 24h
async function getTop10Coins() {
  const top10CoinsInfo = [];
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Ccosmos%2Cpolkadot%2Cquant-network%2Ccardano%2Csolana%2Cavalanche-2%2Cnear%2Cfantom%2Ckaspa%2Cstellar%2Calgorand%2Cripple%2Clido-dao%2Crocket-pool%2Cfrax-share%2Cmatic-network%2Carbitrum%2Coptimism%2Cchainlink%2Capi3%2Cband-protocol%2Cdydx%2Cgmx%2Cvelo%2Cuniswap%2Csushi%2Cpancakeswap-token%2Caave%2Cpendle%2C1inch%2Cocean-protocol%2Cfetch-ai%2Crender-token&order=price_desc&per_page=100&page=1&sparkline=false&price_change_percentage='24h'&locale=en&precision=2&x_cg_demo_api_key=${COINGECKO_API_KEY_ENVVAR}`,
  );
  const data = await response.json();
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const coin = data[i];
      const coinInfo = {
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        currentPrice: coin.current_price,
        priceChange24H: coin.price_change_percentage_24h
          ? coin.price_change_percentage_24h
          : 0.0,
      };
      top10CoinsInfo.push(coinInfo);
    }
  }
  return {
    top10Gainers: top10CoinsInfo
      .sort((a, b) => {
        return b.priceChange24H - a.priceChange24H;
      })
      .splice(0, 10),
    top10Losers: [...top10CoinsInfo]
      .sort((a, b) => a.priceChange24H - b.priceChange24H)
      .slice(0, 10),
  };
}

async function main() {
  const top10CoinsInfo = await getTop10Coins();
  //console.log('Información de los 10 coins con mayor valor:', top10CoinsInfo);
}

const topTenGainersService = {
  getTop10Coins,
};

export default topTenGainersService;
