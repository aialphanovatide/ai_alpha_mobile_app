import {Text, View, ScrollView, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useTypeOfTokenStyles from './TypeOfTokenStyles';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import {findCoinNameBySymbol} from '../../coinsNames';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../../../../../../../../Loader/SkeletonLoader';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const TokenItem = ({crypto, styles, TYPES}) => {
  return (
    <View style={styles.tokenContainer}>
      <View style={[styles.column, {width: 70}]}>
        <FastImage
          style={styles.tokenImage}
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${crypto.crypto.toLowerCase()}.png`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={'contain'}
        />
        <Text style={styles.tokenName}>{crypto.name.split(' ')[0]}</Text>
      </View>
      <TokenDataRow crypto={crypto} TYPES={TYPES} />
    </View>
  );
};

const TokenDataRow = ({crypto, TYPES}) => {
  // Function to insert extra elements for the types that aren't on the crypto data, for displaying them as a red square

  const fillTOTData = array => {
    return [...array, ...Array(Math.max(3 - array.length, 0)).fill('N/A')];
  };

  const filledCryptoTypes = fillTOTData(crypto.typeOfToken);

  const styles = useTypeOfTokenStyles();
  const {theme} = useContext(AppThemeContext);
  return (
    <View style={[styles.row, {justifyContent: 'flex-end'}]}>
      {filledCryptoTypes.map((type, index) => {
        return (
          <View
            key={index}
            style={[
              styles.colorSquare,
              TYPES.find(option => option.id === type.toLowerCase()) !==
              undefined
                ? {backgroundColor: theme.priceUpColor}
                : {backgroundColor: theme.priceDownColor},
              index === 0 ? {marginLeft: 10} : {},
            ]}
          />
        );
      })}
    </View>
  );
};

const TypeOfToken = ({competitorsData}) => {
  const styles = useTypeOfTokenStyles();
  const TYPES = [
    {
      id: 'utility',
      name: 'Utility',
      icon: require('../../../../../../../../../../assets/images/fundamentals/tokenUtility/utility.png'),
    },
    {
      id: 'governance',
      name: 'Governance',
      icon: require('../../../../../../../../../../assets/images/fundamentals/tokenUtility/governance.png'),
    },
    {
      id: 'staking',
      name: 'Staking',
      icon: require('../../../../../../../../../../assets/images/fundamentals/tokenUtility/staking.png'),
    },
  ];
  const [mappedData, setMappedData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setLoading(true);
    const type_of_token_data = [];
    competitorsData.forEach((item, index) => {
      if (
        type_of_token_data.find(mapped =>
          mapped.crypto.includes(
            item.competitor.token.replace(' ', '').toUpperCase(),
          ),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: type_of_token_data.length + 1,
          name: findCoinNameBySymbol(
            item.competitor.token.replace(' ', '').toUpperCase(),
          ),
          crypto: item.competitor.token.replace(' ', '').toUpperCase(),
          typeOfToken: findKeyInCompetitorItem(
            competitorsData,
            'type of token',
            item.competitor.token,
          )
            .replace(/\s/g, '')
            .split('/')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)),
        };
        type_of_token_data.push(mapped_crypto);
      }
    });
    setLoading(false);
    setMappedData(type_of_token_data);
  }, [competitorsData]);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <SkeletonLoader quantity={4} style={{height: 120}} />
      ) : mappedData?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <View
          style={[
            styles.table,
            mappedData.length <= 3 ? {justifyContent: 'center'} : {},
          ]}>
          <View style={styles.typesHeader}>
            <View style={[styles.header, {borderWidth: 0}]} />
            {TYPES.map(type => {
              return (
                <View style={styles.header} key={type.id}>
                  <Image
                    source={type.icon}
                    style={styles.typeImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.headerName}>{type.name}</Text>
                </View>
              );
            })}
          </View>
          <View style={[styles.column, {justifyContent: 'space-between'}]}>
            {mappedData.map((crypto, index) => (
              <TokenItem
                key={index}
                crypto={crypto}
                styles={styles}
                TYPES={TYPES}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default TypeOfToken;
