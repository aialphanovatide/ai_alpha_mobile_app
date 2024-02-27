import {Image, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useAprStyles from './AprStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';

const Graph = ({value, itemIndex, styles, tintColors}) => {
  const chosenColor = tintColors[itemIndex > 3 ? itemIndex % 3 : itemIndex];
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={
          isDarkMode
            ? require('../../../../../../../../../../assets/images/fundamentals/competitors/apr/apr-dark.png')
            : require('../../../../../../../../../../assets/images/fundamentals/competitors/apr/apr.png')
        }
        resizeMode="contain"
      />
      <View
        style={[
          styles.overlay,
          ,
          {
            height: 240 * (value / 100),
            backgroundColor: chosenColor,
          },
        ]}></View>
    </View>
  );
};

const Apr = ({competitorsData}) => {
  const styles = useAprStyles();
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOption, setActiveOption] = useState(null);
  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];

  const findActiveOptionIndex = (cryptos, active) => {
    return cryptos.findIndex(crypto => crypto.crypto === active.crypto);
  };

  const handleActiveOptionChange = option => {
    setActiveOption(option);
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item => item.competitor.token === crypto && item.competitor.key === key,
    );
    return found && found !== undefined ? found.competitor.value : null;
  };

  const parseAprString = stringValue => {
    return stringValue ? Number(stringValue.replace(/[%]/g, '')) : 0;
  };

  useEffect(() => {
    setLoading(true);
    const apr_data = [];
    competitorsData.forEach((item, index) => {
      if (
        apr_data.find(mappedItem =>
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
          apr: parseAprString(
            findKeyInCompetitorItem(
              competitorsData,
              'apr',
              item.competitor.token,
            ),
          ),
        };
        apr_data.push(mapped_crypto);
      }
    });
    console.log(apr_data);
    setCryptos(apr_data);
    setActiveOption(apr_data[0]);
    setLoading(false);
  }, [competitorsData]);

  if (loading) {
    return (
      <View>
        <Loader />
      </View>
    );
  }

  if (!cryptos || cryptos?.length === 0) {
    return null;
  }

  return (
    <View>
      <CryptosSelector
        cryptos={cryptos}
        activeCrypto={activeOption}
        handleActiveCryptoChange={handleActiveOptionChange}
      />
      <View
        style={[
          styles.activeOptionContainer,
          activeOption && {
            borderColor:
              tintColors[
                findActiveOptionIndex(cryptos, activeOption) > 3
                  ? findActiveOptionIndex(cryptos, activeOption) % 3
                  : findActiveOptionIndex(cryptos, activeOption)
              ],
          },
        ]}>
        <Text
          style={[
            styles.activeOptionValue,
            activeOption && {
              color:
                tintColors[
                  findActiveOptionIndex(cryptos, activeOption) > 3
                    ? findActiveOptionIndex(cryptos, activeOption) % 3
                    : findActiveOptionIndex(cryptos, activeOption)
                ],
            },
          ]}>
          {`${activeOption ? activeOption.apr : 0.0}%`}
        </Text>
      </View>
      <View style={styles.graphsContainer}>
        <Graph
          value={activeOption ? activeOption.apr : 0}
          itemIndex={findActiveOptionIndex(cryptos, activeOption)}
          styles={styles}
          tintColors={tintColors}
        />
      </View>
    </View>
  );
};

export default Apr;
