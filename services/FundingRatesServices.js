import { COINALYZE_API_KEY } from "../src/constants";;
const exchanges = [
  {
    name: 'Kraken',
    code: 'K',
    id: 'kraken',
  },
  {
    name: 'Bitstamp',
    code: 'B',
    id: 'bitstamp',
  },
  {
    name: 'OKX',
    code: '3',
    id: 'okex',
  },
  {
    name: 'Coinbase',
    code: 'C',
    id: 'gdax',
  },
  {
    name: 'dYdX',
    code: '8',
  },
  {
    name: 'Bybit',
    code: '6',
    id: 'bybit_spót',
  },
  {
    name: 'Binance',
    code: 'A',
    id: 'binance',
  },
];
// DEPRECATED - CoinGlass API Key is no longer free, the api key has been deleted and the endpoint isn't working
// async function getBtcFundingRates() {
//   const url = 'https://open-api.coinglass.com/public/v2/funding';
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       coinglassSecret: 'fc202990fd494761a661e90a0c24eb49',
//     },
//   };

//   try {
//     const response = await fetch(url, options);

//     if (!response.ok) {
//       throw new Error(`Request failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     const btcFundRate = data.data.find(obj => obj.symbol === 'BTC');
//     return btcFundRate;
//   } catch (error) {
//     console.error('Error: ', error);
//     return [];
//   }
// }

// CoinGecko - Exchanges API - Get metadata from exchanges for using on BTC Funding Rates section

// async function getExchangesMetaData(exchanges) {
//   try {
//   } catch (error) {}
// }

//  NEW - Coinalyze API - Funding rates (WORKING 03/01)
function filterByExchanges(data, exchanges) {
  return data
    .map(item => {
      const exchangeCode = item.symbol.split('.')[1];
      const exchange = exchanges.find(ex => ex.code === exchangeCode);

      if (exchange) {
        const formattedValue = item.value.toFixed(4);
        return {
          symbol: item.symbol,
          value: formattedValue,
          exchange: exchange.name,
        };
      }

      return [];
    })
    .filter(Boolean);
}

async function getBtcFundingRates() {
  const url = `https://api.coinalyze.net/v1/funding-rate?api_key=${COINALYZE_API_KEY}&symbols=BTCUSD_PERP.3,BTCUSD_PERP.A,BTCUSD.C,BTCUSD.B,BTCUSD.K,BTCUSD.6,BTC-USD.8,BTCUSDT.K,BTCUSDT.C`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(filterByExchanges(data, exchanges));
    // const btcFundRate = data.data.find(obj => obj.symbol === 'BTC');
    return filterByExchanges(data, exchanges);
  } catch (error) {
    console.error('Error: ', error);
    return [];
  }
}
/*
- - - test only - - -
const main = async () => {
  await getBtcFundingRates();
};

main();
*/

const FundingRatesServices = {
  getBtcFundingRates,
};

export default FundingRatesServices;
