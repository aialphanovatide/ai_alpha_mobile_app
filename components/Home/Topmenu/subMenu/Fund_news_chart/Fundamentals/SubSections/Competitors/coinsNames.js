const coins_names = [
  {symbol: 'ETH', name: 'Ethereum'},
  {symbol: 'BTC', name: 'Bitcoin'},
  {symbol: 'ADA', name: 'Cardano'},
  {symbol: 'SOL', name: 'Solana'},
  {symbol: 'AVAX', name: 'Avalanche'},
  {symbol: 'QNT', name: 'Quantum'},
  {symbol: 'DOT', name: 'Polkadot'},
  {symbol: 'ATOM', name: 'Cosmos'},
  {symbol: 'LINK', name: 'ChainLink'},
  {symbol: 'BAND', name: 'Band Protocol'},
  {symbol: 'API3', name: 'API3'},
  {symbol: 'RPL', name: 'Rocket Pool'},
  {symbol: 'LDO', name: 'Lido Finance'},
  {symbol: 'FXS', name: 'Frax Finance'},
  {symbol: 'OP', name: 'Optimism'},
  {symbol: 'MATIC', name: 'Polygon'},
  {symbol: 'ARB', name: 'Arbitrum'},
  {symbol: 'XLM', name: 'Stellar'},
  {symbol: 'XRP', name: 'Ripple'},
  {symbol: 'ALGO', name: 'Algorand'},
  {symbol: '1INCH', name: '1Inch Network'},
  {symbol: 'AAVE', name: 'Aave'},
  {symbol: 'GMX', name: 'GMX'},
  {symbol: 'PENDLE', name: 'Pendle'},
  {symbol: 'CAKE', name: 'PanCake Swap'},
  {symbol: 'SUSHI', name: 'Sushi Swap'},
  {symbol: 'UNI', name: 'UNISWAP'},
  {symbol: 'VELO', name: 'Velo'},
  {symbol: 'DYDX', name: 'dYdX'},
  {symbol: 'NEAR', name: 'Near'},
  {symbol: 'FTM', name: 'Fantom'},
  {symbol: 'KAS', name: 'Kaspas'},
];

const findCoinNameBySymbol = symbol => {
  const found = coins_names.find(coin => coin.symbol === symbol);
  return found !== undefined ? found.name : symbol;
};

const findCoinMatch = value => {
  const found = coins_names.find(
    coin =>
      coin.symbol === value ||
      coin.name.toLowerCase().includes(value.toLowerCase()),
  );
  const alt_found = coins_names.find(coin => coin.symbol.includes(value));
  return found !== undefined
    ? found
    : alt_found && alt_found !== undefined
    ? alt_found
    : null;
};

export {coins_names, findCoinNameBySymbol, findCoinMatch};
