import {REVENUECAT_SECRET_ENVVAR} from '@env';

async function loadSubscriberData(revenueCatUserId) {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${REVENUECAT_SECRET_ENVVAR}`,
      },
    };

    const response = await fetch(
      `https://api.revenuecat.com/v1/subscribers/${revenueCatUserId}`,
      options,
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error: ', error);
  }
}
const revenueCatServices = {
  loadSubscriberData,
};

export default revenueCatServices;
