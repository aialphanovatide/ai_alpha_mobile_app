import {Image, ImageBackground, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
          <Text style={[styles.itemText, {color: '#F9FAFC'}]}>
            {item.crypto}
          </Text>
        </View>
      ))}
    </View>
  );
};

const Revenue = ({competitorsData}) => {
  const [cryptos, setCryptos] = useState([]);
  const [valuesData, setValuesData] = useState(null);
  const {theme} = useContext(AppThemeContext);
  const styles = useRevenueStyles();
  const colors = ['blue', 'cyan', 'purple', 'magenta'];

  const getRequiredValues = cryptos => {
    const sortedValues = cryptos?.slice().sort((a, b) => b.value - a.value);
    const maxValue = sortedValues[0];
    const minValue = sortedValues[sortedValues.length - 1];
    const valueRange = maxValue.value - minValue.value;

    const data = {
      sortedValues: sortedValues,
      maxValue: maxValue,
      minValue: minValue,
      valueRange: valueRange,
    };

    setValuesData(data);
  };

  const parseLargeNumberString = numberString => {
    const numberWithoutSign = numberString.replace(/\$/g, '');
    const decimalNumberString = numberWithoutSign.replace(/,/g, '.');
    const [numberPart, unitPart] = decimalNumberString.split(/(?=[a-zA-Z])/);
    const numericValue = Number(numberPart);
    const unitValues = {
      k: 100000,
      m: 1000000,
      b: 1000000000,
      t: 1000000000000,
    };

    const scaledValue = numericValue * unitValues[unitPart.toLowerCase()];
    return Number(scaledValue.toFixed(3));
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item => item.competitor.token === crypto && item.competitor.key === key,
    );
    console.log('Key received: ', key, 'Revenue value found: ', found);
    return found && found !== undefined ? found.competitor.value : null;
  };

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

  useEffect(() => {
    const revenue_data = [];
    competitorsData.forEach((item, index) => {
      if (
        revenue_data.find(mappedItem =>
          item.competitor.token.includes(mappedItem.name),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: index + 1,
          name:
            item.competitor.token.indexOf('(') !== -1
              ? item.competitor.token.slice(
                  0,
                  item.competitor.token.indexOf('(') - 1,
                )
              : item.competitor.token.replace(' ', ''),
          crypto:
            item.competitor.token.indexOf('(') !== -1
              ? item.competitor.token
                  .slice(0, item.competitor.token.indexOf('(') - 1)
                  .toUpperCase()[0] +
                item.competitor.token
                  .slice(0, item.competitor.token.indexOf('(') - 1)
                  .slice(1)
              : item.competitor.token.replace(' ', '').toUpperCase()[0] +
                item.competitor.token.replace(' ', '').slice(1),
          value: parseLargeNumberString(
            findKeyInCompetitorItem(
              competitorsData,
              'revenue',
              item.competitor.token,
            ),
          ),
        };
        revenue_data.push(mapped_crypto);
      }
    });
    setCryptos(revenue_data);
    getRequiredValues(revenue_data);
  }, [competitorsData]);

  if (!cryptos || cryptos?.length === 0 || !valuesData) {
    return null;
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
          {cryptos.map((revenueValue, index) => {
            const scale =
              1 -
              (revenueValue.value - valuesData?.minValue.value) /
                valuesData?.valueRange;
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
