import {Image, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useAprStyles from './AprStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const Graph = ({value, color, styles}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={
          isDarkMode
            ? require('../../../../../../../../../../assets/images/fundamentals/competitors/apr/apr-dark.png')
            : require('../../../../../../../../../../assets/images/fundamentals/competitors/apr/apr.png')
        }
        resizeMode='contain'
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
  const styles = useAprStyles();
  const [activeOption, setActiveOption] = useState(cryptos[0]);

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
      <View
        style={[
          styles.activeOptionContainer,
          activeOption && {borderColor: activeOption.color},
        ]}>
        <Text
          style={[
            styles.activeOptionValue,
            activeOption && {color: activeOption.color},
          ]}>
          {`${activeOption ? activeOption.apr : 0.0}%`}
        </Text>
      </View>
      <View style={styles.graphsContainer}>
        <Graph
          value={activeOption ? activeOption.apr : 0}
          color={activeOption ? activeOption.color : null}
          styles={styles}
        />
      </View>
    </View>
  );
};

export default Apr;
