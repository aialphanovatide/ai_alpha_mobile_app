import {Text, View, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTypeOfTokenStyles from './TypeOfTokenStyles';
import {icons} from '../../icons';
import Loader from '../../../../../../../../../Loader/Loader';

const TokenItem = ({crypto, styles}) => {
  return (
    <View style={styles.tokenContainer}>
      <View style={styles.row}>
        <View style={styles.tokenImageContainer}>
          <Image
            style={styles.tokenImage}
            source={icons[crypto.name.toUpperCase()]}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.tokenName}>{crypto.crypto}</Text>
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

  const extractSymbol = cryptoString => {
    const string_without_spaces = cryptoString.replace(' ', '');
    const name = string_without_spaces.split('(')[0];
    const symbol_index_start = string_without_spaces.indexOf('(');
    const symbol_index_end = string_without_spaces.indexOf(')');
    const symbol =
      symbol_index_start !== -1
        ? string_without_spaces
            .slice(symbol_index_start + 1, symbol_index_end)
            .toUpperCase()
        : name[0].toUpperCase() + name.slice(1);
    return symbol;
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item => item.competitor.token === crypto && item.competitor.key === key,
    );
    return found && found !== undefined ? found.competitor.value : null;
  };

  useEffect(() => {
    setLoading(true);
    const type_of_token_data = [];
    competitorsData.forEach((item, index) => {
      if (
        type_of_token_data.find(
          mapped => mapped.crypto === extractSymbol(item.competitor.token),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: type_of_token_data.length + 1,
          name:
            item.competitor.token.indexOf('(') !== -1
              ? item.competitor.token.slice(
                  0,
                  item.competitor.token.indexOf('(') - 1,
                )
              : item.competitor.token.replace(' ', ''),
          crypto: extractSymbol(item.competitor.token),
          typeOfToken: findKeyInCompetitorItem(
            competitorsData,
            'type of token',
            item.competitor.token,
          )
            .split(' / ')
            .map(word => word.trim().charAt(0).toUpperCase() + word.slice(1)),
        };
        type_of_token_data.push(mapped_crypto);
      }
    });
    // console.log(type_of_token_data);
    setLoading(false);
    setMappedData(type_of_token_data);
  }, [competitorsData]);

  if (loading) {
    return (
      <View>
        <Loader />
      </View>
    );
  }

  if (!mappedData || mappedData?.length === 0) {
    return null;
  }

  return (
    <View>
      {mappedData && mappedData.length > 0
        ? mappedData.map((crypto, index) => (
            <TokenItem key={index} crypto={crypto} styles={styles} />
          ))
        : null}
    </View>
  );
};

export default TypeOfToken;
