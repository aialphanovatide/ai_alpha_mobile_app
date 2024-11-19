import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useCirculatingSupplyStyles from './CirculatingSupplyStyles';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import {findCoinNameBySymbol} from '../../coinsNames';
import {fundamentals_static_content} from '../../../../../../../../../../assets/static_data/fundamentalsStaticData';
import SupplyModal from '../../../SupplyModal/SupplyModal';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../../../../../../../../Loader/SkeletonLoader';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const CirculatingSupplyItem = ({
  item,
  styles,
  handleSupplyDataPress,
  activeSupply,
}) => {
  const descriptionName =
    fundamentals_static_content.competitors.subsections.supplyModel
      .supplyDescriptions[item.crypto.toLowerCase()] ||
    fundamentals_static_content.competitors.subsections.supplyModel
      .supplyDescriptions.default;
  const {isDarkMode} = useContext(AppThemeContext);
  function formatNumber(value) {
    const suffixes = ['', 'thousand', 'million', 'billion', 'trillion'];
    const formatRecursive = (num, suffixIndex) => {
      if (num < 1000 || suffixIndex === suffixes.length - 1) {
        return (
          num.toFixed(2).replace(/\.00$/, '') + ' ' + suffixes[suffixIndex]
        );
      } else {
        return formatRecursive(num / 1000, suffixIndex + 1);
      }
    };
    return formatRecursive(value, 0);
  }

  return (
    <View style={styles.circulatingSupplyItem}>
      <View style={styles.itemRow}>
        <FastImage
          style={styles.image}
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${item.crypto.toLowerCase()}.png`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={'contain'}
        />
        <Text style={styles.tokenName}>{item.name}</Text>
        <Image
          style={styles.inflationaryArrow}
          resizeMode="contain"
          source={
            item.inflationary === null
              ? require('../../../../../../../../../../assets/images/fundamentals/tokenomics/hybrid.png')
              : item.inflationary === true
              ? isDarkMode
                ? require('../../../../../../../../../../assets/images/fundamentals/tokenomics/inflationary-dark.png')
                : require('../../../../../../../../../../assets/images/fundamentals/tokenomics/inflationary-light.png')
              : isDarkMode
              ? require('../../../../../../../../../../assets/images/fundamentals/tokenomics/deflationary-dark.png')
              : require('../../../../../../../../../../assets/images/fundamentals/tokenomics/deflationary-light.png')
          }
        />
        <Text style={[styles.text, styles.marginLeft]}>
          {item.inflationary === null
            ? 'Hybrid'
            : item.inflationary === true
            ? 'Inflationary'
            : 'Deflationary'}
        </Text>
        {item.maxValue === Infinity ? (
          <TouchableOpacity
            onPress={() =>
              handleSupplyDataPress(
                `${item.name} circulating supply`,
                descriptionName,
              )
            }
            style={styles.infinityButton}>
            <Text style={[styles.infinityLabel]}>{'∞'}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={[styles.valueLabel]}>
            {`${formatNumber(item.maxValue)} ${item.crypto}`}
          </Text>
        )}
      </View>
      <View style={styles.dataContainer}>
        <ProgressBar
          maxValue={item.maxValue}
          percentageValue={item.percentageValue}
          styles={styles}
          activeSupply={activeSupply}
        />
      </View>
    </View>
  );
};

const ProgressBar = ({maxValue, percentageValue, styles, activeSupply}) => {
  function formatNumber(value) {
    const suffixes = ['', 'thousand', 'million', 'billion', 'trillion'];

    const formatRecursive = (num, suffixIndex) => {
      if (num < 1000 || suffixIndex === suffixes.length - 1) {
        return (
          num.toFixed(2).replace(/\.00$/, '') + ' ' + suffixes[suffixIndex]
        );
      } else {
        return formatRecursive(num / 1000, suffixIndex + 1);
      }
    };

    return formatRecursive(value, 0);
  }
  return (
    <View style={styles.progressBarContainer}>
      <View
        style={[
          styles.progressBar,
          maxValue === Infinity ? styles.infinityBar : {},
        ]}>
        <View
          style={[
            activeSupply ? {} : styles.none,
            {width: `${percentageValue}%`},
            styles.progressBarFill,
          ]}
        />
      </View>
      <Text
        style={[
          styles.labelBottom,
          {
            left: `${
               15 + (percentageValue > 85
                ? percentageValue - 25
                : percentageValue < 20
                ? percentageValue
                : percentageValue - 15)
            }%`,
          },
        ]}>{`${percentageValue}%`}</Text>
    </View>
  );
};

const CirculatingSupply = ({cryptos, tokenomicsData, competitorsData}) => {
  const [mappedData, setMappedData] = useState([]);
  const styles = useCirculatingSupplyStyles();
  const [loading, setLoading] = useState(true);
  const [supplyDataVisible, setSupplyDataVisible] = useState(false);
  const [supplyData, setSupplyData] = useState({title: '', description: ''});
  const [activeSupply, setActiveSupply] = useState(true);

  const handleSupplyButton = () => {
    setActiveSupply(!activeSupply);
  };

  const handleSupplyDataPress = (title = null, description = null) => {
    if (description) {
      const new_supply_data = {title, description};
      setSupplyData(new_supply_data);
    }
    setSupplyDataVisible(!supplyDataVisible);
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token.replace(/\s/g, '') ===
          crypto.replace(/\s/g, '') && item.competitor.key.includes(key),
    );
    return found && found !== undefined
      ? found.competitor.value !== '-'
        ? found.competitor.value
        : ''
      : null;
  };

  const parseNumberFromString = str => {
    const cleanedStr = str.replace(/\s|,/g, '');
    const numberValue = Number(cleanedStr);
    return numberValue;
  };

  const findMaxValueInTokenomics = (tokenomicsData, crypto) => {
    const found = tokenomicsData.find(item => item.name.includes(crypto));
    // console.log('Found value in tokenomics:', found);
    return found && found !== undefined ? found.maxSupply : null;
  };

  useEffect(() => {
    setLoading(true);
    const tokenomics_mapped = tokenomicsData.map(crypto => {
      return {
        name: crypto.tokenomics.token.replace(' ', '').toUpperCase(),
        maxSupply:
          crypto.tokenomics.max_supply.replace(' ', '') === '∞'
            ? Infinity
            : parseNumberFromString(crypto.tokenomics.max_supply),
      };
    });
    const supply_model_data = [];
    competitorsData.forEach((item, index) => {
      if (
        supply_model_data.find(mappedItem =>
          item.competitor.token
            .replace(' ', '')
            .toUpperCase()
            .includes(mappedItem.crypto),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: index + 1,
          name: findCoinNameBySymbol(
            item.competitor.token.replace(' ', '').toUpperCase(),
          ),
          crypto: item.competitor.token.replace(' ', '').toUpperCase(),
          percentageValue: parseFloat(
            findKeyInCompetitorItem(
              competitorsData,
              'circulating supply',
              item.competitor.token,
            ),
          ),
          inflationary:
            findKeyInCompetitorItem(
              competitorsData,
              'token supply model',
              item.competitor.token,
            )
              .replace(' ', '')
              .toLowerCase() === 'hybrid'
              ? null
              : findKeyInCompetitorItem(
                  competitorsData,
                  'token supply model',
                  item.competitor.token,
                ).toLowerCase() === 'inflationary'
              ? true
              : false,
          maxValue:
            findMaxValueInTokenomics(
              tokenomics_mapped,
              item.competitor.token.replace(' ', '').toUpperCase(),
            ) ||
            parseNumberFromString(
              findKeyInCompetitorItem(
                competitorsData,
                'fully diluted value',
                item.competitor.token,
              ),
            ),
        };
        supply_model_data.push(mapped_crypto);
      }
    });
    setMappedData(supply_model_data);
    setLoading(false);
  }, [competitorsData]);

  return (
    <View style={styles.container}>
      {loading ? (
        <SkeletonLoader quantity={4} />
      ) : cryptos?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          {supplyDataVisible && (
            <SupplyModal
              description={supplyData.description}
              title={supplyData.title}
              onClose={handleSupplyDataPress}
              visible={supplyDataVisible}
            />
          )}
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.alignLeft,
                activeSupply && styles.activeOrangeButton,
              ]}
              onPress={() => handleSupplyButton()}
            />
            <Text style={styles.supplyText}>Circulating Supply</Text>
            <View style={[styles.button, styles.alignRight]} />
            <Text style={styles.totalText}>Total Tokens in Supply</Text>
          </View>
          <View style={styles.itemsContainer}>
            {mappedData.map((item, index) => (
              <CirculatingSupplyItem
                item={item}
                key={index}
                styles={styles}
                handleSupplyDataPress={handleSupplyDataPress}
                activeSupply={activeSupply}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default CirculatingSupply;
