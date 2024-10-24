import {Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useInflationRateStyles from './InflationRateStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import {findCoinNameBySymbol} from '../../coinsNames';
import SkeletonLoader from '../../../../../../../../../Loader/SkeletonLoader';

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
        years.map(year => {
          return (
            <SelectorItem
              year={year.year}
              key={year.year}
              activeYear={activeYear}
              handleYearChange={handleYearChange}
              styles={styles}
            />
          );
        })}
    </View>
  );
};

const InflationRate = ({competitorsData, isSectionWithoutData}) => {
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

  // Function to get the current year in a numeric format, to set it as default in the year menu of this component
  const getCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }

  const [activeYear, setActiveYear] = useState(getCurrentYear());
  const [activeCrypto, setActiveCrypto] = useState(null);
  const [filteredYears, setFilteredYears] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPercentage, setCurrentPercentage] = useState(null);

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
    setCryptos(inflation_rate_data);
    setActiveCrypto(inflation_rate_data[0]);
    const filteredYearsByCurrentData = years.filter(
      year => !checkYearValues(year.year, inflation_rate_data),
    );
    setFilteredYears(filteredYearsByCurrentData);
    setActiveYear(filteredYearsByCurrentData[0].year);
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
            'inflation rate',
            `${year.year}`,
            token,
          ),
        ),
      };
      inflationRate.push(current_year_value);
    });
    return inflationRate;
  };

  const parseInflationRateValue = stringValue => {
    if (!stringValue) {
      return 0;
    }
    const filtered_string = stringValue.replace(/\s/g, '').replace(/,/g, '');
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

  const findKeyInCompetitorItem = (data, key, year, crypto) => {
    const found = data.find(
      item =>
        item.competitor.key.includes(key) &&
        item.competitor.token.replace(/\s/g, '') ===
          crypto.replace(/\s/g, '') &&
        item.competitor.key.includes(year),
    );
    return found && found !== undefined
      ? found.competitor.value !== '-'
        ? found.competitor.value
        : ''
      : null;
  };

  const findImageByInflationRate = rate => {
    if (rate <= 0 || isNaN(rate)) {
      return inflationValues[0].image;
    } else {
      if (rate > 10) {
        return inflationValues[inflationValues.length - 1].image;
      }
      let selectedImage = inflationValues.find(
        obj => rate > obj.values[0] && rate <= obj.values[1],
      );
      return selectedImage.image;
    }
  };

  const checkYearValues = (year, cryptos) => {
    let zerosCounter = 0;
    cryptos?.forEach(crypto => {
      crypto.inflationRate.forEach(yearValue => {
        if (yearValue.year === year && yearValue.value === 0) {
          zerosCounter++;
        }
      });
    });
    return cryptos.length === zerosCounter;
  };

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <SkeletonLoader
          type="selector"
          quantity={4}
          style={{width: 30, marginTop: 80, borderRadius: 14}}
        />
      ) : cryptos?.length === 0 ||
        isSectionWithoutData(competitorsData, 'inflation rate', '-') ? (
        <NoContentMessage />
      ) : (
        <>
          <YearSelector
            years={filteredYears}
            activeYear={activeYear}
            handleYearChange={handleYearChange}
            styles={styles}
            checkYearValues={checkYearValues}
            cryptos={cryptos}
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
