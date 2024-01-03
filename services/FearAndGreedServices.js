async function getFearAndGreedIndex() {
  const url = 'https://fear-and-greed-index.p.rapidapi.com/v1/fgi';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4d00f24fe2msh01b7deea2c097dap11885djsn440204c677d3', // TODO - Set-up this api key on a environment variable
      'X-RapidAPI-Host': 'fear-and-greed-index.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result);
    return result.fgi.now.value;
  } catch (error) {
    console.error(error);
  }
}

async function getFearAndGreedFullData() {
  try {
    const response = await fetch(
      'https://api.alternative.me/fng/?date_format=us',
    );

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.error('Error trying to get data of fear and greed index: ', error);
    return [];
  }
}

/*
 - - - TEST ONLY - - -
 const main = async () => {
   // getFearAndGreedIndex();
   getFearAndGreedFullData();
  }
  
  main();
  */

const fearAndGreedService = {
  getFearAndGreedIndex,
  getFearAndGreedFullData,
};

export default fearAndGreedService;
