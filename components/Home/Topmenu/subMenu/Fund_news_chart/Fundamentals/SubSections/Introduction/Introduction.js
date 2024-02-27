import {Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useIntroductionStyles from './IntroductionStyles';
import Loader from '../../../../../../../Loader/Loader';

import {fundamentalsMock} from '../../fundamentalsMock';
const Introduction = ({getSectionData, coin}) => {
  const styles = useIntroductionStyles();
  const [content, setContent] = useState(null);

  const parseContent = text => {
    const [description, ...dataItems] = text.trim().split('\n');

    const cleanedDataItems = dataItems.map(item =>
      item.trim().replace(/^-/, ''),
    );

    return {
      description: description.trim(),
      dataItems:
        cleanedDataItems.length > 0
          ? cleanedDataItems.filter(item => item !== '')
          : ['', '', '', ''],
    };
  };

  useEffect(() => {
    const fetchIntroductionContent = async () => {
      try {
        const response = await getSectionData(
          `/api/get_introduction?coin_name=${coin}`,
        );

        if (response.status !== 200) {
          setContent([]);
        } else {
          const parsedContent = parseContent(response.message.content);
          setContent(parsedContent);
        }
      } catch (error) {
        console.log('Error trying to get introduction data: ', error);
      }
    };
    fetchIntroductionContent();
  }, [coin]);

  if (!content || content === undefined) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>{content.description}</Text>
      <View style={styles.dataContainer}>
        {content.dataItems?.map((item, index) => {
          if (item !== '') {
            return (
              <View key={index} style={styles.textContainer}>
                <Image
                  style={styles.starSymbol}
                  resizeMode="contain"
                  source={require('../../../../../../../../assets/images/fundamentals/star-icon.png')}
                />
                <Text style={styles.introText}>{item}</Text>
              </View>
            );
          } else {
            return;
          }
        })}
      </View>
    </View>
  );
};

export default Introduction;
