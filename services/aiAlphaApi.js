export const API_BASE_URL = 'https://aialpha.ngrok.io/';
export const API_BASE_URL_ALT = 'https://ntf1vmdf-9000.use.devtunnels.ms';
export const TEST_API_URL = 'https://ai-alpha-api.onrender.com';

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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
    const response = await fetch(`${TEST_API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'alpha_U-06Jgo3vbkcUmD2pVGONhYeb9iNFN-C_7086',
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

// Function to make a GET request
export const altGetService = async endpoint => {
  try {
    const response = await fetch(`${API_BASE_URL_ALT}${endpoint}`, {
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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
