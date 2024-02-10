import {Image, ImageBackground, Text, View} from 'react-native';
import React, {useContext} from 'react';
import useRevenueStyles from './RevenueStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import {revenueImagesUrls} from './revenueImagesUrl';

const GraphItem = ({value, scale, color, imageNumber, styles}) => {
  const imagePath = revenueImagesUrls[color][imageNumber - 1];
  return (
    <View>
      <Text style={styles.itemText}>${value}</Text>
      <Image
        source={imagePath}
        style={[
          {...styles.graphImage, width: 40},
          imageNumber > 10 ? styles.marginBottom : {},
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const RevenueGraphReferences = ({cryptos, styles}) => {
  return (
    <View style={styles.selectorContainer}>
      {cryptos.map((item, index) => (
        <View
          key={index}
          style={[styles.selectorItem, {backgroundColor: item.color}]}>
          <Text style={styles.itemText}>{item.crypto}</Text>
          {/* <Image
            source={item.image}
            resizeMode="contain"
            style={styles.itemIcon}
          /> */}
        </View>
      ))}
    </View>
  );
};

const Revenue = ({cryptos}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useRevenueStyles();
  const values = cryptos.map(crypto => {
    return {symbol: crypto.symbol, value: crypto.revenue};
  });
  const colors = ['blue', 'cyan', 'purple', 'magenta'];
  const sortedValues = values.slice().sort((a, b) => b.value - a.value);
  const maxValue = sortedValues[0];
  const minValue = sortedValues[sortedValues.length - 1];
  const valueRange = maxValue.value - minValue.value;

  function formatNumber(num) {
    const absNum = Math.abs(num);
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const thousand = 1000;

    const tier = (Math.log10(absNum) / 3) | 0;

    if (tier == 0) return num;

    const divisor = Math.pow(thousand, tier);
    const formattedNum = (num / divisor).toFixed(1);

    return formattedNum + abbrev[tier];
  }

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <RevenueGraphReferences cryptos={cryptos} styles={styles} />
        <ImageBackground
          style={[styles.bgImage, styles.first]}
          source={require('../../../../../../../../../../assets/images/fundamentals/competitors/revenue/bg-1.png')}
          resizeMode="contain">
          <ImageBackground
            style={[styles.bgImage, styles.second]}
            source={require('../../../../../../../../../../assets/images/fundamentals/competitors/revenue/bg-2.png')}
            resizeMode="contain">
            <ImageBackground
              style={[styles.bgImage]}
              source={require('../../../../../../../../../../assets/images/fundamentals/competitors/revenue/bg-3.png')}
              resizeMode="contain"></ImageBackground>
          </ImageBackground>
        </ImageBackground>
        <View style={styles.imagesContainer}>
          {values.map((revenueValue, index) => {
            const scale =
              1 - (revenueValue.value - minValue.value) / valueRange;
            const color = colors[index % colors.length];
            const imageNumber = Math.floor(scale * 14) + 1;
            return (
              <GraphItem
                color={color}
                imageNumber={imageNumber}
                scale={scale}
                key={index}
                value={formatNumber(revenueValue.value)}
                styles={styles}
              />
            );
          })}
        </View>
        <View style={styles.grayRectangle} />
      </View>
    </View>
  );
};

export default Revenue;
