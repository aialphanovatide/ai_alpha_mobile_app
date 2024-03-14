import {revenueCat_secret} from '../src/constants/index.js';

async function loadSubscriberData(revenueCatUserId) {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${revenueCat_secret}`,
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
