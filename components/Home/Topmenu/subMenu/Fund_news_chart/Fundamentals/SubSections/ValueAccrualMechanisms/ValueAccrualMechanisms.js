import {Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Loader from '../../../../../../../Loader/Loader';
import useVAMStyles from './VAMStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import FastImage from 'react-native-fast-image';

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

const ValueAccrualMechanisms = ({
  getSectionData,
  coin,
  handleSectionContent,
}) => {
  const styles = useVAMStyles();
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
    return `https://${coin}aialpha.s3.us-east-2.amazonaws.com/${formatted_title}${theme_word}${longitude_shape}.jpg`;
  };

  const calculateImageSize = section => {
    return section.length >= 200
      ? section.length >= 350
        ? {
            width: 124,
            height: 272,
          }
        : {
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

    const fetchValueAccrualMechanisms = async coin => {
      try {
        const response = await getSectionData(
          `/api/get_tokenomics?coin_name=${coin}`,
        );
        if (response.status !== 200) {
          setDataItems([]);
        } else {
          const parsed_data = response.message.value_accrual_mechanisms.map(
            item => {
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
            },
          );
          setDataItems(parsed_data);
        }
      } catch (error) {
        console.error(
          'Error trying to get Value Accrual Mechanisms data: ',
          error,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchValueAccrualMechanisms(coin);
  }, [coin, isDarkMode]);

  useEffect(() => {
    if (!loading && dataItems?.length === 0) {
      handleSectionContent('valueAccrualMechanisms', true);
    }
  }, [dataItems, loading, handleSectionContent]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
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
