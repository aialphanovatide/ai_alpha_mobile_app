import {Image, Text, View} from 'react-native';
import React, {useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import styles from './AprStyles';

const Graph = ({value, color}) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={require('../../../../../../../../../../assets/apr.png')}
      />
      <View
        style={[
          styles.overlay,
          ,
          {
            height: 240 * (value / 100),
            backgroundColor: color,
          },
        ]}></View>
    </View>
  );
};

const Apr = ({cryptos}) => {
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
      <View style={styles.graphsContainer}>
        <Graph
          value={activeOption ? activeOption.apr : 0}
          color={activeOption ? activeOption.color : null}
        />
        <View
          style={[
            styles.activeOptionContainer,
            activeOption && {borderColor: activeOption.color},
          ]}>
          <Text style={[styles.activeOptionValue, activeOption && {color: activeOption.color}]}>
            {`${activeOption ? activeOption.apr : 0.0}%`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Apr;
