import {Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTypeOfTokenStyles from './TypeOfTokenStyles';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import {findCoinNameBySymbol} from '../../coinsNames';
import FastImage from 'react-native-fast-image';

const TokenItem = ({crypto, styles}) => {
  return (
    <View style={styles.tokenContainer}>
      <View style={styles.row}>
        <View style={styles.tokenImageContainer}>
          <FastImage
            style={styles.tokenImage}
            source={{
              uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${crypto.crypto.toLowerCase()}.png`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.tokenName}>{crypto.name}</Text>
      </View>
      <ScrollView style={styles.buttonContainer} horizontal>
        {crypto.typeOfToken?.map((type, index) => (
          <View style={styles.tokenButton} key={index}>
            <Text style={styles.tokenButtonText}>{type}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const TypeOfToken = ({competitorsData}) => {
  const styles = useTypeOfTokenStyles();
  const [mappedData, setMappedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
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
    // console.log('Type of token data: ', type_of_token_data);
    setMappedData(type_of_token_data);
  }, [competitorsData]);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : mappedData?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          {mappedData.map((crypto, index) => (
            <TokenItem key={index} crypto={crypto} styles={styles} />
          ))}
        </>
      )}
    </View>
  );
};

export default TypeOfToken;
