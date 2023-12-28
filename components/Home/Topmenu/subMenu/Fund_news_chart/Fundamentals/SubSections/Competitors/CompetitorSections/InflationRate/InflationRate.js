import {Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './InflationRateStyles';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';

const SelectorItem = ({year, activeYear, handleYearChange}) => {
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

const YearSelector = ({years, activeYear, handleYearChange}) => {
  return (
    <View style={styles.yearSelectorContainer}>
      {years &&
        years.map(year => (
          <SelectorItem
            year={year.year}
            key={year.year}
            activeYear={activeYear}
            handleYearChange={handleYearChange}
          />
        ))}
    </View>
  );
};

const InflationRate = ({cryptos}) => {
  const years = [
    {
      year: 2022,
    },
    {
      year: 2023,
    },
  ];

  const inflationValues = [
    {values: [0, 2], color: '#52DD8D'},
    {values: [2, 4], color: '#20CBDD'},
    {values: [4, 6], color: '#FFB822'},
    {values: [6, 8], color: '#F7734B'},
    {values: [8, 10], color: '#EA0052'},
  ];

  const [activeYear, setActiveYear] = useState(null);
  const [activeCrypto, setActiveCrypto] = useState(null);
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

  return (
    <View>
      <YearSelector
        years={years}
        activeYear={activeYear}
        handleYearChange={handleYearChange}
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
            source={require('../../../../../../../../../../assets/images/fundamentals/competitors/inflationRate/infrate-empty.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default InflationRate;
