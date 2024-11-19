import {Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useVAMStyles from './VAMStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';

// ContentItem component that renders the ValueAccrualMechanisms item, which displays the value accrual mechanisms content for a coin. The content itself is displayed as an item with title, image and a description.

const ContentItem = ({data, styles}) => {
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataTitle}>{data.title}</Text>
      <View style={styles.dataRow}>
        <View style={styles.dataImageContainer}>
          <FastImage
            style={[
              styles.dataImage,
              {
                width: data?.imageSize.width,
                height: data?.imageSize.height,
              },
            ]}
            alt={data.title}
            source={{
              uri: data?.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={'cover'}
            fallback={true}
          />
        </View>
        <Text style={styles.dataText}>{data.text}</Text>
      </View>
    </View>
  );
};

// Component that renders the ValueAccrualMechanisms section, which displays the value accrual mechanisms content for a coin. It shows a loader when requesting the data and a message in case there is no content to display. The content itself is displayed as a list of items, each containing an image and a description, similar to the TokenUtilities section.

const ValueAccrualMechanisms = ({
  coin,
  handleSectionContent,
  loading,
  globalData,
}) => {
  const styles = useVAMStyles();
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
    const fetchValueAccrualMechanisms = coin => {
      if (!globalData || globalData.tokenomics.status !== 200) {
        setDataItems([]);
      } else {
        const parsed_data =
          globalData.tokenomics.message.value_accrual_mechanisms.map(item => {
            return {
              id: item.value_accrual_mechanisms.id,
              title: item.value_accrual_mechanisms.mechanism,
              text: item.value_accrual_mechanisms.description,
              image: getItemImageUri(
                coin,
                item.value_accrual_mechanisms.mechanism.replace(/'/g, ''),
                item.value_accrual_mechanisms.description,
                isDarkMode,
              ),
              imageSize: calculateImageSize(
                item.value_accrual_mechanisms.description,
              ),
            };
          });
        setDataItems(parsed_data);
      }
    };
    fetchValueAccrualMechanisms(coin);
  }, [globalData, coin, isDarkMode]);

  useEffect(() => {
    if (!loading && dataItems?.length === 0) {
      handleSectionContent('valueAccrualMechanisms', true);
    }
  }, [dataItems, loading, handleSectionContent]);

  return (
    <View style={styles.container}>
      {loading ? (
        <SkeletonLoader type="bigItem" quantity={4} />
      ) : dataItems?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <View>
          <View style={styles.content}>
            {dataItems.map((data, index) => (
              <ContentItem data={data} key={index} styles={styles} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ValueAccrualMechanisms;
