async function getBtcFundingRates() {
  const url = 'https://open-api.coinglass.com/public/v2/funding';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      coinglassSecret: 'fc202990fd494761a661e90a0c24eb49',
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const btcFundRate = data.data.find(obj => obj.symbol === 'BTC');
    return btcFundRate;
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
