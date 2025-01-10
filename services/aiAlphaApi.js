import {
  AIALPHASERVER_2_BASE_URL_ENVVAR,
  API_BASE_URL_ENVVAR,
  API_BASE_URL_ALT_ENVVAR,
  NEWSBOTV2_BASE_URL_ENVVAR,
  TEST_API_URL_ENVVAR,
  OLD_NEWSBOT_BASE_URL_ENVVAR,
  AIALPHA2KEY_ENVVAR,
  AIALPHA2KEYDEV_ENVVAR,
  NEWSBOTV2_TEST_BASE_URL_ENVVAR,
} from '@env';

// Function to handle HTTP errors
const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

// Function to make a GET request
export const getService = async endpoint => {
  try {
    const response = await fetch(`${API_BASE_URL_ENVVAR}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      return [];
    }

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in GET request: ${error.message} for ${endpoint}`);
    throw error;
  }
};

// Function to make a GET request to the testing server's API
export const getTestService = async endpoint => {
  try {
    const response = await fetch(`${TEST_API_URL_ENVVAR}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': AIALPHA2KEYDEV_ENVVAR,
      },
    });
    //console.log('response is', response);
    if (response.status === 204) {
      return [];
    }

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in GET request: ${error.message} for ${endpoint}`);
    throw error;
  }
};

// Function to make a GET request to the testing server's API, receiving HTML data
export const getHTMLTestService = async endpoint => {
  try {
    const response = await fetch(`${TEST_API_URL_ENVVAR}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html',
        'X-API-Key': AIALPHA2KEYDEV_ENVVAR,
      },
    });

    if (response.status === 204) {
      return [];
    }

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(`Error in GET request: ${error.message} for ${endpoint}`);
    throw error;
  }
};

// Function to make a GET request
export const altGetService = async endpoint => {
  try {
    const response = await fetch(`${API_BASE_URL_ALT_ENVVAR}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (response.status === 204) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in GET request: ${error.message}`);
    throw error;
  }
};

// Function to make a POST request
export const postService = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL_ENVVAR}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.error(`Error in POST request: ${error.message}`);
    throw error;
  }
};

// Function to make a POST request to the updated (21-10-2024) AI Alpha Server
export const postServiceV2 = async (endpoint, data) => {
  try {
    const response = await fetch(
      `${AIALPHASERVER_2_BASE_URL_ENVVAR}${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': AIALPHA2KEY_ENVVAR,
        },
        body: JSON.stringify(data),
      },
    );

    const res = await response.json();
    return res;
  } catch (error) {
    console.error(`Error in POST request: ${error.message}`);
    throw error;
  }
};

// Function to make a get request using the updated (21-10-2024) AI Alpha Server

export const getServiceV2 = async endpoint => {
  try {
    const response = await fetch(
      `${AIALPHASERVER_2_BASE_URL_ENVVAR}${endpoint}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': AIALPHA2KEY_ENVVAR,
        },
      },
    );

    if (response.status === 204) {
      return [];
    }

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in GET request: ${error.message} for ${endpoint}`);
    throw error;
  }
};

// Function to make a get request to the updated (21-10-2024) news Server, for retrieving Top Stories and News

export const newsbotGetService = async endpoint => {
  try {
    const response = await fetch(`${NEWSBOTV2_BASE_URL_ENVVAR}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      console.log('Returning empty array due to 204 status');
      return [];
    }

    if (response.status === 404) {
      console.log('Returning empty array due to 404 status');
      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in GET request: ${error.message} for ${endpoint}`);
    throw error;
  }
};

// Function to make a get request to the old news Server, for retrieving Top Stories and News

export const oldNewsbotGetService = async endpoint => {
  try {
    const response = await fetch(`${OLD_NEWSBOT_BASE_URL_ENVVAR}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      return [];
    }

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in GET request: ${error.message} for ${endpoint}`);
    throw error;
  }
};

// Function to make a get request to the updated (21-10-2024) news Server, for retrieving Top Stories and News

export const newsbotGetTestService = async endpoint => {
  console.log('endpoint is', endpoint);
  try {
    const response = await fetch(
      `${NEWSBOTV2_TEST_BASE_URL_ENVVAR}${endpoint}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('response is', response);
    if (response.status === 204) {
      return [];
    }

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error in GET request: ${error.message} for ${endpoint}`);
    throw error;
  }
};
