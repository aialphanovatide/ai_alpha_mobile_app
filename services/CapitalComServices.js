import {
  CAPITAL_COM_API_KEY_ENVVAR,
  CAPITAL_COM_PASSWORD_ENVVAR,
  CAPITAL_COM_ID_ENVVAR,
} from '@env';

async function postCCSession() {
  try {
    const options = {
      method: 'POST',
      headers: {
        'X-CAP-API-KEY': CAPITAL_COM_API_KEY_ENVVAR,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: CAPITAL_COM_ID_ENVVAR,
        password: CAPITAL_COM_PASSWORD_ENVVAR,
      }),
      redirect: 'follow',
    };
    const response = await fetch(
      `https://api-capital.backend-capital.com/api/v1/session`,
      options,
    );
    const security_token = response.headers.get('X-SECURITY-TOKEN');
    const security_cst = response.headers.get('CST');
    return {
      security_token,
      security_cst,
    };
    // }
  } catch (error) {
    console.error('Error getting the capitalcom session auth');
    return {
      security_token: null,
      security_cst: null,
    };
  }
}

async function getCapitalComPrices(
  symbol,
  interval,
  quantity,
  security_token,
  security_cst,
) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-SECURITY-TOKEN': security_token,
        CST: security_cst,
      },
      redirect: 'follow',
    };
    const response = await fetch(
      `https://api-capital.backend-capital.com/api/v1/prices/${symbol.toUpperCase()}?resolution=${interval.toUpperCase()}&max=${quantity}`,
      options,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting the capital com charts data:', error.message);
    return [];
  }
}

export {postCCSession, getCapitalComPrices};

/*
// Testing purposes
const main = async () => {
  // const session = await postCCSession();
  // console.log(session);
  const prices_data = await getCapitalComPrices(
    'DXY',
    'HOUR',
    40,
    'p6iYb6tCYC1fHjGWmZgeFvCorFw0um3',
    '4UCHNHU3RVXnLndyGRVse7V9',
  );
  console.log('Response after executing: ', prices_data);
};

main();
*/
