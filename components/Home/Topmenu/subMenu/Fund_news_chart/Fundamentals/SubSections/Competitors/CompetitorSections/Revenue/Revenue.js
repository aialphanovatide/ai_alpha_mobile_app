import {Image, ImageBackground, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useRevenueStyles from './RevenueStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import {revenueImagesUrls} from './revenueImagesUrl';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import Loader from '../../../../../../../../../Loader/Loader';
import {findCoinNameBySymbol} from '../../coinsNames';

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
          <Text style={[styles.itemText, {color: '#FFFFFF'}]}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};

const Revenue = ({competitorsData, isSectionWithoutData}) => {
  const [cryptos, setCryptos] = useState([]);
  const [valuesData, setValuesData] = useState(null);
  const {theme} = useContext(AppThemeContext);
  const styles = useRevenueStyles();
  const colors = ['blue', 'cyan', 'purple', 'magenta'];
  const tintColors = ['#20CBDD', '#895EF6', '#FF3BC3', '#C539B4'];
  const [loading, setLoading] = useState(true);

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
    const numberWithoutSpaces = numberString.replace(/\s/g, '');
    const decimalNumberString = numberWithoutSpaces.replace(/,/g, '');

    return isNaN(Number(decimalNumberString)) ? 0 : Number(decimalNumberString);
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    console.log('Key received: ', key, 'Revenue value found: ', found);
    return found && found !== undefined
      ? found.competitor.value !== '-'
        ? found.competitor.value
        : ''
      : null;
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
    setLoading(true);
    const revenue_data = [];
    let artificial_id = 0;
    competitorsData.forEach((item, index) => {
      if (
        revenue_data.find(
          mappedItem =>
            mappedItem.crypto ===
            item.competitor.token.replace(/\s/g, '').toUpperCase(),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: artificial_id,
          name: findCoinNameBySymbol(
            item.competitor.token.replace(/\s/g, '').toUpperCase(),
          ),
          crypto: item.competitor.token.replace(/\s/g, '').toUpperCase(),
          value: parseLargeNumberString(
            findKeyInCompetitorItem(
              competitorsData,
              'revenue',
              item.competitor.token,
            ),
          ),
          color:
            tintColors[artificial_id > 3 ? artificial_id % 3 : artificial_id],
        };
        revenue_data.push(mapped_crypto);
        artificial_id += 1;
      }
    });
    setCryptos(revenue_data);
    getRequiredValues(revenue_data);
    setLoading(false);
  }, [competitorsData]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : cryptos?.length === 0 ||
        isSectionWithoutData(competitorsData, 'revenue', '-') ? (
        <NoContentMessage />
      ) : (
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
      )}
    </View>
  );
};

export default Revenue;
