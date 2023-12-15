
// export const API_BASE_URL = 'https://debd-181-51-89-43.ngrok-free.app';
export const API_BASE_URL = 'https://star-oyster-known.ngrok-free.app';

// Function to handle HTTP errors
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

// Function to make a GET request
export const getService = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
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

