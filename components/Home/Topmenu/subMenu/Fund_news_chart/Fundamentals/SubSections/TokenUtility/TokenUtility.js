import React, {useContext, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import useTokenUtilityStyles from './TokenUtilityStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import Loader from '../../../../../../../Loader/Loader';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import FastImage from 'react-native-fast-image';

const TokenUtilityItem = ({styles, data}) => {
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataTitle}>{data.title}</Text>
      <View style={styles.dataRow}>
        <FastImage
          style={[
            styles.dataImage,
            {width: data.imageSize.width, height: data.imageSize.height},
          ]}
          alt={data.title}
          source={{
            uri: data.image,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.web,
          }}
          resizeMode={'cover'}
          fallback={true}
        />
        <Text style={styles.dataText}>{data.text}</Text>
      </View>
    </View>
  );
};

const TokenUtility = ({getSectionData, coin, handleSectionContent}) => {
  const styles = useTokenUtilityStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  const [dataItems, setDataItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getItemImageUri = (coin, section, description, isDarkMode) => {
    const formatted_title = section
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    const longitude_shape = description.length >= 200 ? 'R' : 'S';
    const theme_word = isDarkMode ? 'Dark' : 'Light';
    console.log(
      `https://${coin}aialpha.s3.us-east-2.amazonaws.com/${formatted_title}${theme_word}${longitude_shape}.jpg`,
    );
    return `https://${coin}aialpha.s3.us-east-2.amazonaws.com/${formatted_title}${theme_word}${longitude_shape}.jpg`;
  };

  const calculateImageSize = section => {
    return section.length >= 200
      ? {
          width: 124,
          height: 208,
        }
      : {
          width: 124,
          height: 111,
        };
  };

  useEffect(() => {
    setLoading(true);
    setDataItems([]);

    const fetchTokenUtilities = async coin => {
      try {
        const response = await getSectionData(
          `/api/get_tokenomics?coin_name=${coin}`,
        );
        if (response.status !== 200) {
          setDataItems([]);
        } else {
          const parsed_data = response.message.token_utility.map(item => {
            return {
              id: item.token_utilities.id,
              title: item.token_utilities.token_application,
              text: item.token_utilities.description,
              image: getItemImageUri(
                coin,
                item.token_utilities.token_application.replace(/'/g, ''),
                item.token_utilities.description,
                isDarkMode,
              ),
              imageSize: calculateImageSize(item.token_utilities.description),
            };
          });
          setDataItems(parsed_data);
        }
      } catch (error) {
        console.log('Error trying to get Token Utilities data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTokenUtilities(coin);
  }, [coin, isDarkMode]);

  useEffect(() => {
    if (!loading && dataItems?.length === 0) {
      handleSectionContent('tokenUtility', true);
    }
  }, [dataItems, loading, handleSectionContent]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : dataItems?.length === 0 ? (
        <NoContentMessage />
      ) : (
        dataItems.map((item, index) => (
          <TokenUtilityItem
            key={index}
            data={item}
            styles={styles}
            isDarkMode={isDarkMode}
          />
        ))
      )}
    </View>
  );
};

export default TokenUtility;
