import {Image, Text, View} from 'react-native';
import React from 'react';
import styles from './CirculatingSupplyStyles';

const CirculatingSupplyItem = ({item}) => {
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.image}
            source={item.image}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.itemName}>{item.crypto}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.inflationaryLabel}>
          {item.inflationary === null
            ? '↔ Hybrid'
            : item.inflationary
            ? '↗ Inflationary'
            : '↘ Deflationary'}
        </Text>
        <ProgressBar
          maxValue={item.maxValue}
          percentageValue={item.percentageValue}
        />
      </View>
    </View>
  );
};

const ProgressBar = ({maxValue, percentageValue}) => {
  // TODO - Change this to receive the value and max value in numbers, and obtain the percentage from that values, also create a function to format the top-label that shows the max value, depending on if it is millions or billions, or even infinite.
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBar}>
        <View
          style={[{width: `${percentageValue}%`}, styles.progressBarFill]}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.labelBottom}>{`${percentageValue}%`}</Text>
        <Text style={styles.labelRight}>
          {maxValue === Infinity ? '∞' : maxValue}
        </Text>
      </View>
    </View>
  );
};

const CirculatingSupply = ({cryptos}) => {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.labelLeft}>Circulating Supply</Text>
        <Text style={styles.labelRight}>Total Supply</Text>
      </View>
      <View style={styles.itemsContainer}>
        {cryptos.map((item, index) => (
          <CirculatingSupplyItem item={item} key={index} />
        ))}
      </View>
    </View>
  );
};

export default CirculatingSupply;
