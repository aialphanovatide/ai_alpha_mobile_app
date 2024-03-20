import {PROFIT_COM_API_KEY} from '../src/constants';

const COINDAR_API_KEY = '78201:QAGjCPV2ddtwztI0U1x';
/*
const PROFIT_COM_API_KEY = 'f5b148c5fa2e4b228731a9a2becd50fe';

Helpers
Function to get the date range for using it on CoinDar
*/
function getEndDate(days) {
  const actualDate = new Date();
  actualDate.setDate(actualDate.getDate() + days);

  const yyyy = actualDate.getFullYear();
  const mm = String(actualDate.getMonth() + 1).padStart(2, '0');
  const dd = String(actualDate.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

// Function to get the date minus the quantity of days received

function getDaysBefore(days) {
  let current_date = new Date();

  current_date.setDate(current_date.getDate() - days);

  let year = current_date.getFullYear();
  let month = String(current_date.getMonth() + 1).padStart(2, '0');
  let day = String(current_date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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

async function getEconomicEvents(days = 1) {
  const interestingCountries = [
    {
      country: 'US',
      currency: 'USD',
    },
    {
      country: 'GB',
      currency: 'GBP',
    },
    {
      country: 'CN',
      currency: 'CNY',
    },
  ];
  const date = getDaysBefore(days);
  const end_date = getEndDate(0);
  const forexPromises = interestingCountries.map(async item => {
    try {
      const response = await fetch(
        `https://api.profit.com/data-api/economic_calendar/forex?token=${PROFIT_COM_API_KEY}&country_iso=${item.country}&currency=${item.currency}&start_date=${date}&impact=high&impact=medium&end_date=${end_date}`,
      );
      return response.json();
    } catch (error) {
      console.error(`Error getting the data from the country ${item.country}`);
      return null;
    }
  });

  const commoditiesPromises = interestingCountries.map(async item => {
    try {
      const response = await fetch(
        `https://api.profit.com/data-api/economic_calendar/commodities?token=${PROFIT_COM_API_KEY}&country_iso=${item.country}&start_date=${date}&end_date=${end_date}`,
      );
      return response.json();
    } catch (error) {
      console.error(
        `Error getting the commodities data from the country ${item.country}`,
      );
      return null;
    }
  });

  const forexResponses = await Promise.all(forexPromises);
  const commoditiesResponses = await Promise.all(commoditiesPromises);

  const filteredForex = forexResponses.filter(response => response !== null);
  const filteredCommodities = commoditiesResponses.filter(
    response => response !== null,
  );

  return [...filteredForex, ...filteredCommodities];
}

/*
- - - TEST ONLY - - -
async function main() {
  const data = await getEconomicEvents();
  console.log(data);
  // await getEventsData(7);
  //   getCurrenciesPercentages();
}

main();
*/
const calendarService = {
  getAvailableCoins,
  getEventsData,
  getEconomicEvents,
};

export default calendarService;
