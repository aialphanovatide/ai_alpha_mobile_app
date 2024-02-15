import {Image, Text, View} from 'react-native';
import React from 'react';
import useCirculatingSupplyStyles from './CirculatingSupplyStyles';

const CirculatingSupplyItem = ({item, styles}) => {
  return (
    <View style={styles.circulatingSupplyItem}>
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.image}
            source={item.image}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.itemName}>{item.crypto}</Text>
        <Image
          style={styles.inflationaryArrow}
          resizeMode="contain"
          source={
            item.inflationary === null
              ? require('../../../../../../../../../../assets/images/fundamentals/competitors/circulatingSupply/hybrid.png')
              : item.inflationary
              ? require('../../../../../../../../../../assets/images/fundamentals/competitors/circulatingSupply/inflationary.png')
              : require('../../../../../../../../../../assets/images/fundamentals/competitors/circulatingSupply/deflationary.png')
          }
        />
      </View>
      <View style={styles.dataContainer}>
        <ProgressBar
          maxValue={item.maxValue}
          percentageValue={item.percentageValue}
          styles={styles}
        />
      </View>
    </View>
  );
};

const ProgressBar = ({
  maxValue,
  percentageValue,
  styles,
  inflationaryValue,
}) => {
  // TODO - Change this to receive the value and max value in numbers, and obtain the percentage from that values, also create a function to format the top-label that shows the max value, depending on if it is millions or billions, or even infinite.
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.row, styles.noVerticalMargin, styles.noPaddingH]}>
        <Text style={styles.valueLabel}>
          {maxValue === Infinity ? '∞' : maxValue}
        </Text>
      </View>
      <View
        style={[
          styles.progressBar,
          maxValue === Infinity ? styles.infinityBar : {},
        ]}>
        <View
          style={[{width: `${percentageValue}%`}, styles.progressBarFill]}
        />
      </View>
      <View style={[styles.row, styles.noVerticalMargin]}>
        <Text style={styles.labelBottom}>{`${percentageValue}%`}</Text>
      </View>
    </View>
  );
};

const CirculatingSupply = ({cryptos}) => {
  const styles = useCirculatingSupplyStyles();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.referenceLabel, styles.labelLeft]}>
          Circulating Supply
        </Text>
        <Text style={[styles.referenceLabel, styles.labelRight]}>
          Total tokens in Supply
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.referenceLabel, styles.symbolLabel]}>
          <View style={styles.symbolWrapper}>
            <Image
              source={require('../../../../../../../../../../assets/images/fundamentals/competitors/circulatingSupply/deflationary.png')}
              style={styles.referenceIconImage}
              resizeMode="contain"
            />
          </View>
          Deflationary
        </Text>
        <Text
          style={[styles.referenceLabel, styles.symbolLabel, styles.noMargin]}>
          <View style={styles.symbolWrapper}>
            <Image
              source={require('../../../../../../../../../../assets/images/fundamentals/competitors/circulatingSupply/inflationary.png')}
              style={styles.referenceIconImage}
              resizeMode="contain"
            />
          </View>
          Inflationary
        </Text>
      </View>

      <View style={styles.itemsContainer}>
        {cryptos.map((item, index) => (
          <CirculatingSupplyItem item={item} key={index} styles={styles} />
        ))}
      </View>
    </View>
  );
};

export default CirculatingSupply;
