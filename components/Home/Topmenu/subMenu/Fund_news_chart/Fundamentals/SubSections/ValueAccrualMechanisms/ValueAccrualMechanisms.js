import {Text, View, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Loader from '../../../../../../../Loader/Loader';
import useVAMStyles from './VAMStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const ContentItem = ({data, styles}) => {
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataTitle}>{data.title}</Text>
      <View style={styles.dataRow}>
        <View style={styles.dataImageContainer}>
          <Image
            style={styles.dataImage}
            alt={data.title}
            source={{
              uri: data?.image,
              width: data?.imageSize.width,
              height: data?.imageSize.height,
            }}
            resizeMode={'stretch'}
          />
        </View>
        <Text style={styles.dataText}>{data.text}</Text>
      </View>
    </View>
  );
};

const ValueAccrualMechanisms = ({getSectionData, coin, contentData}) => {
  const styles = useVAMStyles();
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
                  item.value_accrual_mechanisms.mechanism,
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
        console.log(
          'Error trying to get Value Accrual Mechanisms data: ',
          error,
        );
      }
    };
    fetchValueAccrualMechanisms(coin);
  }, [coin]);

  if (!dataItems || dataItems.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.content}>
          {dataItems && dataItems.length > 0 ? (
            dataItems.map((data, index) => (
              <ContentItem data={data} key={index} styles={styles} />
            ))
          ) : (
            <Loader />
          )}
        </View>
      </View>
    </View>
  );
};

export default ValueAccrualMechanisms;
