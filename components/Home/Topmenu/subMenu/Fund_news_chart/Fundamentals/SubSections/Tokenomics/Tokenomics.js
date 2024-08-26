import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useTokenomicsStyles from './TokenomicsStyles';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import SupplyModal from '../SupplyModal/SupplyModal';
import {fundamentals_static_content} from '../../fundamentalsStaticData';
import {findCoinNameBySymbol} from '../Competitors/coinsNames';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const TokenItem = ({item, styles, handleSupplyDataPress, activeSupply}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const descriptionName =
    fundamentals_static_content.competitors.subsections.supplyModel
      .supplyDescriptions[item.symbol.toLowerCase()] ||
    fundamentals_static_content.competitors.subsections.supplyModel
      .supplyDescriptions.default;
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
    <View style={styles.tokenItem}>
      <View style={styles.tokenRow}>
        <FastImage
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${item.symbol.toLowerCase()}.png`,
            priority: FastImage.priority.high,
          }}
          style={styles.itemIcon}
          resizeMode="contain"
        />
        <View style={[styles.tokenRow, {alignItems: 'center'}]}>
          <Text style={styles.tokenName}>{item.name}</Text>
          <Image
            style={styles.inflationaryArrow}
            resizeMode="contain"
            source={
              item.inflationary === null
                ? require('../../../../../../../../assets/images/fundamentals/tokenomics/hybrid.png')
                : item.inflationary === true
                ? isDarkMode
                  ? require('../../../../../../../../assets/images/fundamentals/tokenomics/inflationary-dark.png')
                  : require('../../../../../../../../assets/images/fundamentals/tokenomics/inflationary-light.png')
                : isDarkMode
                ? require('../../../../../../../../assets/images/fundamentals/tokenomics/deflationary-dark.png')
                : require('../../../../../../../../assets/images/fundamentals/tokenomics/deflationary-light.png')
            }
          />
          <Text style={styles.text}>
            {item.inflationary === null
              ? 'Hybrid'
              : item.inflationary === true
              ? 'Inflationary'
              : 'Deflationary'}
          </Text>
        </View>
        {item.maxSupply === Infinity ? (
          <TouchableOpacity
            onPress={() =>
              handleSupplyDataPress(
                `${item.name} circulating supply`,
                descriptionName,
              )
            }
            style={styles.infinityButton}>
            <Text style={[styles.progressBarMaxValue, styles.infinityLabel]}>
              {'∞'}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.progressBarMaxValue}>
            {formatNumber(item.maxSupply)}
          </Text>
        )}
      </View>
      <HorizontalProgressBar
        activeSupply={activeSupply}
        value={item.circulatingSupply}
        maxValue={item.maxSupply}
        styles={styles}
        name={item.name}
        crypto={item.symbol}
      />
    </View>
  );
};

const HorizontalProgressBar = ({maxValue, value, styles, activeSupply}) => {
  const percentage = maxValue === Infinity ? 65 : (value / maxValue) * 100;
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
    <View style={styles.progressBarWrapper}>
      <View
        style={[
          styles.progressBarContainer,
          maxValue === Infinity ? styles.infinityBar : null,
        ]}>
        <View
          style={[
            styles.progressBar,
            {width: `${percentage}%`},
            activeSupply ? {} : styles.none,
          ]}></View>
      </View>
      <View style={styles.tokenRow}>
        <Text
          style={[
            styles.progressBarValue,
            {
              left: `${
                percentage > 85
                  ? percentage - 35
                  : percentage < 20
                  ? percentage
                  : percentage - 15
              }%`,
            },
            activeSupply ? {} : styles.none,
          ]}>{`${
          maxValue === Infinity
            ? formatNumber(value)
            : formatNumber(value) + ' (' + Math.round(percentage) + ')%'
        }`}</Text>
      </View>
    </View>
  );
};

const Tokenomics = ({
  getSectionData,
  coin,
  handleSectionContent,
  globalData,
  loading,
}) => {
  const styles = useTokenomicsStyles();
  const [cryptos, setCryptos] = useState(null);
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

  const parseNumberFromString = str => {
    const cleanedStr = str.replace(/\s|,/g, '');
    const numberValue = Number(cleanedStr);
    return numberValue;
  };

  useEffect(() => {
    const fetchTokenomicsData = () => {
      if (!globalData || globalData.tokenomics.status !== 200) {
        setCryptos([]);
      } else {
        const parsed_cryptos =
          globalData.tokenomics.message.tokenomics_data.map(crypto => {
            return {
              name: findCoinNameBySymbol(
                crypto.tokenomics.token.replace(' ', '').toUpperCase(),
              ),
              symbol: crypto.tokenomics.token.replace(' ', '').toUpperCase(),
              circulatingSupply: Number(
                crypto.tokenomics.circulating_supply.replace(/,/g, ''),
              ),
              totalSupply:
                crypto.tokenomics.total_supply.replace(' ', '') === '∞'
                  ? Infinity
                  : parseNumberFromString(crypto.tokenomics.total_supply),
              maxSupply:
                crypto.tokenomics.max_supply.replace(' ', '') === '∞'
                  ? Infinity
                  : parseNumberFromString(crypto.tokenomics.max_supply),
              inflationary:
                crypto.tokenomics.supply_model === 'Inflationary'
                  ? true
                  : crypto.tokenomics.supply_model === 'Deflationary'
                  ? false
                  : null,
            };
          });
        setCryptos(parsed_cryptos);
      }
    };
    fetchTokenomicsData();
  }, [globalData, coin]);

  useEffect(() => {
    if (!loading && cryptos?.length === 0) {
      handleSectionContent('tokenomics', true);
    }
  }, [cryptos, loading, handleSectionContent]);

  return (
    <View style={styles.container}>
      {loading ? (
        <SkeletonLoader quantity={3} />
      ) : cryptos?.length === 0 ? (
        <NoContentMessage hasSectionName={false} />
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
          <View style={styles.numberTitles}>
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
          <View style={styles.tokenItemsContainer}>
            {cryptos &&
              cryptos.map((crypto, index) => (
                <TokenItem
                  key={index}
                  item={crypto}
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

export default Tokenomics;
