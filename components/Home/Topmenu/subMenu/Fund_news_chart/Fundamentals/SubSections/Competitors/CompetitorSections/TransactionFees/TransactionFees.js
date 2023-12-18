import {Image, Text, View} from 'react-native';
import React, {useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import styles from './TransactionFeesStyles';

const DollarGraphs = ({value, color}) => {
  const images = [];
  if (value !== 0) {
    const intValue = Math.floor(value);
    const decimalValue = value - intValue;
    for (let i = 0; i < intValue; i++) {
      images.push(
        <View key={`image_${i}`} style={styles.imageContainer}>
          <Image
            style={styles.dollarImage}
            source={require('../../../../../../../../../../assets/dollar.png')}
          />
          <View style={[styles.overlay, {backgroundColor: color}]}></View>
        </View>,
      );
    }
    if (decimalValue > 0) {
      images.push(
        <View key={`${value}decimal`} style={styles.imageContainer}>
          <Image
            style={styles.dollarImage}
            source={require('../../../../../../../../../../assets/dollar.png')}
          />
          <View
            style={[
              styles.overlay,
              ,
              {
                height: 80 * decimalValue,
                backgroundColor: color,
              },
            ]}></View>
        </View>,
      );
    }
  } else {
    images.push(
      <Image
        key={'zero'}
        style={styles.dollarImage}
        source={require('../../../../../../../../../../assets/dollar.png')}
      />,
    );
  }

  return images;
};

const TransactionFees = ({cryptos}) => {
  const [activeOption, setActiveOption] = useState(null);

  const handleActiveOptionChange = option => {
    setActiveOption(option);
  };

  return (
    <View>
      <CryptosSelector
        cryptos={cryptos}
        activeCrypto={activeOption}
        handleActiveCryptoChange={handleActiveOptionChange}
      />
      <View style={styles.activeOptionContainer}>
        <Text style={styles.activeOptionValue}>
          {`$${activeOption ? activeOption.fee : 0.0} USD`}
        </Text>
      </View>
      <View style={styles.graphsContainer}>
        <DollarGraphs
          value={activeOption ? activeOption.fee : 0}
          color={activeOption ? activeOption.color : null}
        />
      </View>
    </View>
  );
};

export default TransactionFees;
