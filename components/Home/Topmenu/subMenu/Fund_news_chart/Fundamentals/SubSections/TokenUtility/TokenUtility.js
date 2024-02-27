import React, {useContext, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import useTokenUtilityStyles from './TokenUtilityStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const TokenUtilityItem = ({styles, data}) => {
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataTitle}>{data.title}</Text>
      <View style={styles.dataRow}>
        <Image
          style={styles.dataImage}
          alt={data.title}
          source={{
            uri: data.image,
            width: data.imageSize.width,
            height: data.imageSize.height,
          }}
          resizeMode={'stretch'}
        />
        <Text style={styles.dataText}>{data.text}</Text>
      </View>
    </View>
  );
};

const TokenUtility = ({getSectionData, coin, content}) => {
  const styles = useTokenUtilityStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  const [dataItems, setDataItems] = useState([]);

  const getItemImageUri = (coin, section, isDarkMode) => {
    const formatted_title = section
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    const theme_word = isDarkMode ? 'Dark' : 'Light';
    return `https://${coin}aialpha.s3.us-east-2.amazonaws.com/${formatted_title}${theme_word}.jpg`;
  };

  const calculateImageSize = section => {
    return section.length >= 150
      ? section.length >= 300
        ? {width: 188, height: 356}
        : {width: 124, height: 208}
      : {
          width: 124,
          height: 111,
        };
  };

  useEffect(() => {
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
                item.token_utilities.token_application,
                isDarkMode,
              ),
              imageSize: calculateImageSize(
                item.token_utilities.description,
              ),
            };
          });
          setDataItems(parsed_data);
        }
      } catch (error) {
        console.log('Error trying to get Token Utilities data: ', error);
      }
    };
    fetchTokenUtilities(coin);
  }, [coin]);

  if (!dataItems || dataItems.length === 0) {
    return null;
  }

  // For mocking data, replace dataItems with content.
  return (
    <View style={styles.container}>
      {dataItems &&
        dataItems.map((item, index) => (
          <TokenUtilityItem
            key={index}
            data={item}
            styles={styles}
            isDarkMode={isDarkMode}
          />
        ))}
    </View>
  );
};

export default TokenUtility;
