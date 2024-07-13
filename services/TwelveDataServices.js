const {TWELVEDATA_API_KEY} = require('../src/constants');

async function getVixIndexData(interval = '1day') {
  const url = `https://api.twelvedata.com/time_series?symbol=VIX&interval=${interval}&apikey=${TWELVEDATA_API_KEY}&outputsize=40`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.values;
  } catch (error) {
    console.error('Error trying to get VIX Index data: ', error);
    return [];
  }
}

const TwelveDataService = {
  getVixIndexData,
};

export default TwelveDataService;
