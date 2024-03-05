import {Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useInflationRateStyles from './InflationRateStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';

const SelectorItem = ({year, activeYear, handleYearChange, styles}) => {
  return (
    <TouchableOpacity
      style={[
        styles.selectorItem,
        activeYear && activeYear === year ? styles.active : styles.inactive,
      ]}
      onPress={() => handleYearChange(year)}>
      <Text
        style={[
          styles.yearText,
          activeYear && activeYear === year && styles.activeText,
        ]}>
        {year}
      </Text>
    </TouchableOpacity>
  );
};

const YearSelector = ({years, activeYear, handleYearChange, styles}) => {
  return (
    <View style={styles.yearSelectorContainer}>
      {years &&
        years.map(year => (
          <SelectorItem
            year={year.year}
            key={year.year}
            activeYear={activeYear}
            handleYearChange={handleYearChange}
            styles={styles}
          />
        ))}
    </View>
  );
};

const InflationRate = ({competitorsData}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const [cryptos, setCryptos] = useState([]);
  const styles = useInflationRateStyles();
  const years = [
    {
      year: 2022,
    },
    {
      year: 2023,
    },
    {
      year: 2024,
    },
  ];

  const inflationValues = [
    {
      values: [0],
      image: isDarkMode
        ? require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-0-dark.png')
        : require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-0.png'),
    },
    {
      values: [0, 2],
      image: isDarkMode
        ? require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-2-dark.png')
        : require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-2.png'),
    },
    {
      values: [2, 4],
      image: isDarkMode
        ? require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-4-dark.png')
        : require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-4.png'),
    },
    {
      values: [4, 6],
      image: isDarkMode
        ? require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-6-dark.png')
        : require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-6.png'),
    },
    {
      values: [6, 8],
      image: isDarkMode
        ? require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-8-dark.png')
        : require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-8.png'),
    },
    {
      values: [8, 10],
      image: isDarkMode
        ? require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-10-dark.png')
        : require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-10.png'),
    },
  ];

  const [activeYear, setActiveYear] = useState(2022);
  const [activeCrypto, setActiveCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPercentage, setCurrentPercentage] = useState(null);

  const coins_names = [
    {symbol: 'ETH', name: 'Ethereum'},
    {symbol: 'BTC', name: 'Bitcoin'},
    {symbol: 'ADA', name: 'Cardano'},
    {symbol: 'SOL', name: 'Solana'},
    {symbol: 'AVAX', name: 'Avalanche'},
    {symbol: 'QNT', name: 'Quantum'},
    {symbol: 'DOT', name: 'Polkadot'},
    {symbol: 'ATOM', name: 'Cosmos'},
    {symbol: 'LINK', name: 'ChainLink'},
    {symbol: 'BAND', name: 'Band Protocol'},
    {symbol: 'API3', name: 'API3'},
    {symbol: 'RPL', name: 'Rocket Pool'},
    {symbol: 'LDO', name: 'Lido Finance'},
    {symbol: 'FXS', name: 'Frax Finance'},
    {symbol: 'OP', name: 'Optimism'},
    {symbol: 'MATIC', name: 'Polygon'},
    {symbol: 'ARB', name: 'Arbitrum'},
    {symbol: 'XLM', name: 'Stellar'},
    {symbol: 'XRP', name: 'Ripple'},
    {symbol: 'ALGO', name: 'Algorand'},
    {symbol: '1INCH', name: '1Inch Network'},
    {symbol: 'AAVE', name: 'Aave'},
    {symbol: 'GMX', name: 'GMX'},
    {symbol: 'PENDLE', name: 'Pendle'},
    {symbol: 'CAKE', name: 'PanCake Swap'},
    {symbol: 'SUSHI', name: 'Sushi Swap'},
    {symbol: 'UNI', name: 'UNISWAP'},
    {symbol: 'VELO', name: 'Velo'},
    {symbol: 'DYDX', name: 'dYdX'},
  ];

  const findCoinNameBySymbol = symbol => {
    const found = coins_names.find(coin => coin.symbol === symbol);
    return found !== undefined ? found.name : null;
  };

  useEffect(() => {
    setLoading(true);
    const inflation_rate_data = [];
    competitorsData.forEach((item, index) => {
      if (
        inflation_rate_data.find(
          mappedItem =>
            mappedItem.crypto ===
            item.competitor.token.replace(/\s/g, '').toUpperCase(),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: index + 1,
          name: findCoinNameBySymbol(
            item.competitor.token.replace(/\s/g, '').toUpperCase(),
          ),
          crypto: item.competitor.token.replace(/\s/g, '').toUpperCase(),
          inflationRate: getInflationRateFromYears(
            years,
            competitorsData,
            item.competitor.token,
          ),
        };
        inflation_rate_data.push(mapped_crypto);
      }
    });
    // console.log(inflation_rate_data);
    setCryptos(inflation_rate_data);
    setActiveCrypto(inflation_rate_data[0]);
    setLoading(false);
  }, [competitorsData]);

  const getInflationRateFromYears = (years, competitors_data, token) => {
    const inflationRate = [];
    years.forEach(year => {
      const current_year_value = {
        year: year.year,
        value: parseInflationRateValue(
          findKeyInCompetitorItem(
            competitors_data,
            `inflation rate ${year.year}`,
            token,
          ),
        ),
      };
      // console.log(current_year_value);
      inflationRate.push(current_year_value);
    });
    return inflationRate;
  };

  const parseInflationRateValue = stringValue => {
    if (!stringValue) {
      return 0;
    }
    const filtered_string = stringValue.replace(/\s/g, '');
    // console.log('Filtered string: ', Number(filtered_string));
    return Number(filtered_string);
  };

  const handleYearChange = year => {
    setActiveYear(year);
  };

  const handleActiveCryptoChange = crypto => {
    setActiveCrypto(crypto);
    setCurrentPercentage(crypto.inflationRate);
  };

  const findInflationRateByYear = (year, activeCrypto) => {
    if (activeCrypto.inflationRate) {
      const rate = activeCrypto.inflationRate.find(rate => rate.year === year);
      return rate ? rate.value : 0;
    } else {
      return 0;
    }
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    return found && found !== undefined ? found.competitor.value : null;
  };

  const findImageByInflationRate = rate => {
    if (rate <= 0 || isNaN(rate)) {
      return inflationValues[0].image;
    } else {
      let selectedImage = inflationValues.find(
        obj => rate > obj.values[0] && rate <= obj.values[1],
      );
      return selectedImage.image;
    }
  };

  return (
    <View>
      {loading ? (
        <Loader />
      ) : cryptos?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          <YearSelector
            years={years}
            activeYear={activeYear}
            handleYearChange={handleYearChange}
            styles={styles}
          />
          <CryptosSelector
            cryptos={cryptos}
            activeCrypto={activeCrypto}
            handleActiveCryptoChange={handleActiveCryptoChange}
          />
          <View style={styles.container}>
            <Text style={styles.currentValue}>
              {activeYear && activeCrypto
                ? isNaN(findInflationRateByYear(activeYear, activeCrypto))
                  ? 0
                  : findInflationRateByYear(activeYear, activeCrypto)
                : 0}
              %
            </Text>
            <View style={styles.imageContainer}>
              <Image
                style={styles.inflationImage}
                resizeMode={'contain'}
                source={
                  activeYear && activeCrypto
                    ? findImageByInflationRate(
                        findInflationRateByYear(activeYear, activeCrypto),
                      )
                    : isDarkMode
                    ? require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-0-dark.png')
                    : require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-0.png')
                }
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default InflationRate;
