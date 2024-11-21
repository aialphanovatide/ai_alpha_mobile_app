import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import useTokenUtilityStyles from './TokenUtilityStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';

// TokenUtilityItem component that renders the TokenUtility item, which displays the token utilites content for a coin. The content itself is displayed as an item with title, image and a description.

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

// Component that renders the TokenUtility item, which displays the token utilites content for a coin. It shows a loader when requesting the data and a message in case there is no content to display. The content itself is displayed as a list of items, each containing an image and a description.

const TokenUtility = ({
  coin,
  handleSectionContent,
  loading,
  globalData,
}) => {
  const styles = useTokenUtilityStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  const [dataItems, setDataItems] = useState([]);

  const getItemImageUri = (coin, section, description, isDarkMode) => {
    const formatted_title = section
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    const longitude_shape = description.length >= 200 ? 'R' : 'S';
    const theme_word = isDarkMode ? 'Dark' : 'Light';

    return `https://${coin}aialpha.s3.us-east-2.amazonaws.com/${formatted_title}${theme_word}${longitude_shape}.jpg`;
  };

  const calculateImageSize = section => {
    return section.length >= 160
      ? section.length >= 300
        ? {width: 148, height: 348}
        : {
            width: 148,
            height: 236,
          }
      : {
          width: 148,
          height: 148,
        };
  };

  useEffect(() => {
    const fetchTokenUtilities = coin => {
      if (!globalData || globalData.tokenomics.status !== 200) {
        setDataItems([]);
      } else {
        const parsed_data = globalData.tokenomics.message.token_utility.map(
          item => {
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
          },
        );
        setDataItems(parsed_data);
      }
    };
    fetchTokenUtilities(coin);
  }, [globalData, coin, isDarkMode]);

  useEffect(() => {
    if (!loading && dataItems?.length === 0) {
      handleSectionContent('tokenUtility', true);
    }
  }, [dataItems, loading, handleSectionContent]);

  return (
    <View style={styles.container}>
      {loading ? (
        <SkeletonLoader type="bigItem" quantity={4} />
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
