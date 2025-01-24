export const COLORS_PER_COIN = {
  '1inch': '#7625BF',
  aave: '#8A62A6',
  ada: '#2C77D1',
  algo: '#353535',
  api3: '#353535',
  arb: '#2588D2',
  atom: '#2C77D1',
  avax: '#DF3845',
  band: '#2588D2',
  cake: '#DD9F61',
  dot: '#CF006E',
  dydx: '#634597',
  fet: '#4E9ED9',
  ftm: '#2C77D1',
  fxs: '#353535',
  gmx: '#2D62E7',
  kas: '#DF3845',
  ldo: '#00A4C1',
  link: '#2588D2',
  pol: '#634597',
  polygon: '#634597',
  near: '#01C981',
  ocean: '#353535',
  op: '#DF3845',
  pendle: '#2588D2',
  qnt: '#353535',
  rndr: '#DF3845',
  rpl: '#FFA26D',
  sol: '#40C4B9',
  sushi: '#D563AD',
  tao: '#353535',
  uni: '#D7195E',
  velo: '#D7195E',
  xlm: '#353535',
  xrp: '#353535',
  default: '#353535',
};

export const findColorByCoinName = coinName => {
  if (!coinName) {
    return COLORS_PER_COIN.default;
  }
  const color = COLORS_PER_COIN[coinName];
  return color && color !== undefined ? color : COLORS_PER_COIN.default;
};
