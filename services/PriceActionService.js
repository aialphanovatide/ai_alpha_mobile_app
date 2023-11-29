// Funcion para obtener información de todos los coins
/*
const coins_to_fetch = [
  'btc',
  'eth',
  'atom',
  'dot',
  'qnt',
  'ada',
  'sol',
  'avax',
  'near',
  'ftm',
  'kas',
  'xlm',
  'algo',
  'xrp',
  'ldo',
  'rpl',
  'fxs',
  'matic',
  'arb',
  'op',
  'link',
  'api3',
  'band',
  'ethdydx',
  'gmx',
  'velo',
  'uni',
  'sushi',
  'cake',
  'aave',
  'pendle',
  '1inch',
  'ocean-protocol',
  'fet',
  'rndr',
];
*/

async function getAllCoinsInfo() {
  const coinsInfo = [];
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Ccosmos%2Cpolkadot%2Cquant-network%2Ccardano%2Csolana%2Cavalanche-2%2Cnear%2Cfantom%2Ckaspa%2Cstellar%2Calgorand%2Cripple%2Clido-dao%2Crocket-pool%2Cfrax-share%2Cmatic-network%2Carbitrum%2Coptimism%2Cchainlink%2Capi3%2Cband-protocol%2Cdydx%2Cgmx%2Cvelo%2Cuniswap%2Csushi%2Cpancakeswap-token%2Caave%2Cpendle%2C1inch%2Cocean-protocol%2Cfetch-ai%2Crender-token&per_page=100&page=1&sparkline=false&price_change_percentage=&price_change_percentage=24h%2C7d%2C30d%2C1y&locale=en&precision=2`,
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
        marketCap: coin.market_cap / 1000000,
        price_change_24H: coin.price_change_percentage_24h_in_currency,
        price_change_7D: coin.price_change_percentage_7d_in_currency,
        price_change_30D: coin.price_change_percentage_30d_in_currency,
        price_change_1Y: coin.price_change_percentage_1y_in_currency
          ? coin.price_change_percentage_1y_in_currency
          : 0.0,
      };
      coinsInfo.push(coinInfo);
    }
  }
  return coinsInfo;
}

// ONLY FOR TESTING
// async function main() {
//   const coinsInfo = await getAllCoinsInfo();
//   console.log('All coins info', coinsInfo);
// }

// main();

const priceActionService = {
  getAllCoinsInfo,
};

export default priceActionService;
