const COINDAR_API_KEY = '78201:QAGjCPV2ddtwztI0U1x';
// Helpers
// Function to get the date range for using it on CoinDar
function getEndDate(days) {
  const actualDate = new Date();
  actualDate.setDate(actualDate.getDate() + days);

  const yyyy = actualDate.getFullYear();
  const mm = String(actualDate.getMonth() + 1).padStart(2, '0');
  const dd = String(actualDate.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

// - - - COINDAR API - - -

// This function fetch all the available currencies on the API and filters only the coins that we are interested on.

const coinsFromApp = [
  '1',
  '2',
  '2609',
  '8667',
  '1956',
  '15',
  '7670',
  '9393',
  '9470',
  '2340',
  '22648',
  '32',
  '2871',
  '3205',
  '10415',
  '1751',
  '10270',
  '2721',
  '26447',
  '22166',
  '52',
  '10102',
  '3070',
  '15096',
  '15173',
  '9372',
  '9336',
  '19907',
  '9465',
  '9531',
  '11908',
  '10318',
  '2743',
  '2586',
  '8398',
];
async function getAvailableCoins() {
  try {
    const response = await fetch(
      `https://coindar.org/api/v2/coins?access_token=${COINDAR_API_KEY}`,
    );

    if (!response.ok)
      throw new Error('Request failed with response status: ', response.status);

    const data = await response.json();
    const filteredCoins = data.filter(coin => {
      return coinsFromApp.includes(coin.id);
    });

    console.log(filteredCoins);
    return filteredCoins;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

async function getEventsData(daysInterval) {
  try {
    const todayDate = getEndDate(0);
    const endDate = getEndDate(daysInterval);

    const response = await fetch(
      `https://coindar.org/api/v2/events?access_token=${COINDAR_API_KEY}&page=1&page_size=100&filter_date_start=${todayDate}&filter_date_end=${endDate}&filter_coins=1,2,2609,8667,1956,15,7670,9393,9470,2340,22648,32,2871,3205,10415,1751,10270,2721,26447,22166,52,10102,3070,15096,15173,9372,9336,19907, 9465,9531,11908,10318,2743,2586,8398&sort_by=date_start&filter_tags=5,6,7,22,4,10,24,14,19&order_by=1`,
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    // return data.filter(event => event.important === true);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// - - - TRADING ECONOMICS API - - -
/*
async function getCurrenciesPercentages() {
  try {
    const response = await fetch(
      `https://currencydatafeed.com/api/data.php?currency=DXY/USD+XAG/USD+SP500/USD&token=n67jgdddvkwagvxgie3w`,
    );

    if (!response.ok)
      throw new Error('Error trying to get data from CurrencyDataFeed API.');

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

/*
- - - TEST ONLY - - -
async function main() {
  const data = await getAvailableCoins();
  console.log(data);
  // await getEventsData(7);
  //   getCurrenciesPercentages();
}

main();
*/

const calendarService = {
  getAvailableCoins,
  getEventsData,
};

export default calendarService;
