import {Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useInflationRateStyles from './InflationRateStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

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

const InflationRate = ({cryptos}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useInflationRateStyles();
  const years = [
    {
      year: 2022,
    },
    {
      year: 2023,
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
  const [activeCrypto, setActiveCrypto] = useState(cryptos[0]);
  const [currentPercentage, setCurrentPercentage] = useState(null);

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

  const findImageByInflationRate = rate => {
    if (rate <= 0) {
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
            ? findInflationRateByYear(activeYear, activeCrypto)
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
    </View>
  );
};

export default InflationRate;
