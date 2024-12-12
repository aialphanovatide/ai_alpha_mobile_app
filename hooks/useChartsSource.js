import {COINGECKO_PRO_KEY_ENVVAR} from '@env';

// This hook is used to retrieve the data for the charts in the Home page. It takes in the coin, pairing and interval as arguments and returns the appropriate url and options for executing the requests to the APIs.

const useChartsSource = (coin, pairing, interval) => {
  const DAYS_INTERVALS = {
    '1W': 180,
    '1D': 30,
    '4H': 7,
    '1H': 1,
  };

  const PRECISIONS = {
    BTC: 14,
    USDT: 4,
    ETH: 8,
    DEFAULT: 14,
  };

  const options = {
    method: 'GET',
    headers: {'x-cg-pro-api-key': COINGECKO_PRO_KEY_ENVVAR},
  };

  const COIN_SOURCES = [
    {
      name: 'btc',
      baseUrl: {USDT: 'binance'},
      urlName: {USDT: 'btc'},
      pairings: ['USDT'],
    },
    {
      name: 'eth',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'eth', BTC: 'eth'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'sol',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'sol', BTC: 'sol'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'ada',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'ada', BTC: 'ada'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'avax',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'avax', BTC: 'avax'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'atom',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'atom', BTC: 'atom'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'dot',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'dot', BTC: 'dot'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'qnt',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'qnt', BTC: 'link'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'link',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'link', BTC: 'link'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'api3',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'api3', BTC: 'api3'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'band',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'band', BTC: 'band'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'xlm',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'xlm', BTC: 'xlm'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'algo',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'algo', BTC: 'algo'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'xrp',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'xrp', BTC: 'xrp'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'ocean',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'ocean', BTC: 'ocean'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'fet',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'fet', BTC: 'fet'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'rndr',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'rndr', BTC: 'rndr'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'fxs',
      baseUrl: {USDT: 'binance', BTC: 'binance', ETH: 'coingecko'},
      urlName: {USDT: 'fxs', BTC: 'fxs', ETH: 'frax-share'},
      pairings: ['USDT', 'BTC', 'ETH'],
    },
    {
      name: 'ldo',
      baseUrl: {USDT: 'binance', BTC: 'binance', ETH: 'coingecko'},
      urlName: {USDT: 'ldo', BTC: 'ldo', ETH: 'lido-dao'},
      pairings: ['USDT', 'BTC', 'ETH'],
    },
    {
      name: 'rpl',
      baseUrl: {USDT: 'binance', BTC: 'binance', ETH: 'coingecko'},
      urlName: {USDT: 'rpl', BTC: 'rpl', ETH: 'rocket-pool'},
      pairings: ['USDT', 'BTC', 'ETH'],
    },
    {
      name: 'matic',
      baseUrl: {USDT: 'binance', ETH: 'binance'},
      urlName: {USDT: 'matic', ETH: 'matic'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'polygon',
      baseUrl: {USDT: 'binance', ETH: 'binance'},
      urlName: {USDT: 'matic', ETH: 'matic'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'pol',
      baseUrl: {USDT: 'binance', ETH: 'binance'},
      urlName: {USDT: 'matic', ETH: 'matic'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'arb',
      baseUrl: {USDT: 'binance', ETH: 'binance'},
      urlName: {USDT: 'arb', ETH: 'arb'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'op',
      baseUrl: {USDT: 'binance', ETH: 'binance'},
      urlName: {USDT: 'op', ETH: 'op'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'dydx',
      baseUrl: {USDT: 'binance', ETH: 'coingecko'},
      urlName: {USDT: 'dydx', ETH: 'dydx'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'gmx',
      baseUrl: {USDT: 'binance', ETH: 'coingecko'},
      urlName: {USDT: 'gmx', ETH: 'gmx'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'near',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'near', BTC: 'near'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'ftm',
      baseUrl: {USDT: 'binance', BTC: 'binance'},
      urlName: {USDT: 'ftm', BTC: 'ftm'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'kas',
      baseUrl: {USDT: 'coingecko', BTC: 'coingecko'},
      urlName: {USDT: 'kaspa', BTC: 'kaspa'},
      pairings: ['USDT', 'BTC'],
    },
    {
      name: 'velo',
      baseUrl: {USDT: 'coingecko', ETH: 'coingecko'},
      urlName: {USDT: 'velo', ETH: 'velo'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'uni',
      baseUrl: {USDT: 'binance', ETH: 'binance'},
      urlName: {USDT: 'uni', ETH: 'uni'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'sushi',
      baseUrl: {USDT: 'binance', ETH: 'coingecko'},
      urlName: {USDT: 'sushi', ETH: 'sushi'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'cake',
      baseUrl: {USDT: 'binance', ETH: 'coingecko'},
      urlName: {USDT: 'cake', ETH: 'pancakeswap-token'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'aave',
      baseUrl: {USDT: 'binance', ETH: 'coingecko'},
      urlName: {USDT: 'aave', ETH: 'aave'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'pendle',
      baseUrl: {USDT: 'binance', ETH: 'coingecko'},
      urlName: {USDT: 'pendle', ETH: 'pendle'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: '1inch',
      baseUrl: {USDT: 'binance', ETH: 'coingecko'},
      urlName: {USDT: '1inch', ETH: '1inch'},
      pairings: ['USDT', 'ETH'],
    },
    {
      name: 'ton',
      baseUrl: {USDT: 'binance', BTC: 'coingecko'},
      urlName: {USDT: 'ton', BTC: 'ton'},
      pairings: ['USDT', 'BTC'],
    },
  ];

  const foundCoin = COIN_SOURCES.find(coinObj => coinObj.name === coin);

  if (pairing !== null) {
    if (foundCoin) {
      const selectedUrl = foundCoin.baseUrl[pairing.toUpperCase()];
      const coinPairing =
        foundCoin.pairings.find(pair => pair === pairing) ||
        foundCoin.pairings[0];
      const activeCoinUrl =
        selectedUrl === 'binance'
          ? `https://api3.binance.com/api/v3/klines?symbol=${foundCoin.urlName[
              coinPairing.toUpperCase()
            ].toUpperCase()}${pairing}&limit=50&interval=${interval.toLowerCase()}`
          : `https://pro-api.coingecko.com/api/v3/coins/${foundCoin.urlName[
              coinPairing.toUpperCase()
            ].toLowerCase()}/ohlc?vs_currency=${
              coinPairing === 'USDT' ? 'usd' : coinPairing.toLowerCase()
            }&days=${DAYS_INTERVALS[interval.toUpperCase()]}&precision=${
              PRECISIONS[coinPairing] || PRECISIONS.DEFAULT
            }`;
      const activeCoinOptions = selectedUrl === 'binance' ? {} : options;
      return {
        pairings: foundCoin.pairings,
        url: activeCoinUrl,
        options: activeCoinOptions,
      };
    }
  } else {
    if (foundCoin) {
      const coinPairing = foundCoin.baseUrl.USDT;
      const activeCoinUrl =
        coinPairing === 'binance'
          ? `https://api3.binance.com/api/v3/klines?symbol=${foundCoin.urlName.USDT.toUpperCase()}${'USDT'}&limit=50&interval=${interval.toLowerCase()}`
          : `https://pro-api.coingecko.com/api/v3/coins/${foundCoin.urlName.USDT.toLowerCase()}/ohlc?vs_currency=usd&days=${
              DAYS_INTERVALS[interval.toUpperCase()]
            }&precision=${PRECISIONS.USDT}`;
      const activeCoinOptions = coinPairing === 'binance' ? {} : options;
      return {
        pairings: foundCoin.pairings,
        url: activeCoinUrl,
        options: activeCoinOptions,
      };
    }
  }
};

export default useChartsSource;
