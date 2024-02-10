import {Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useIntroductionStyles from './IntroductionStyles';
import Loader from '../../../../../../../Loader/Loader';
const Introduction = ({getIntroductionData, coin}) => {
  const styles = useIntroductionStyles();
  const [content, setContent] = useState(null);

  const parseContent = text => {
    const [description, ...dataItems] = text.trim().split('\n');

    const cleanedDataItems = dataItems.map(item =>
      item.trim().replace(/^-/, ''),
    );

    return {
      description: description.trim(),
      dataItems: cleanedDataItems.filter(item => item !== ''),
    };
  };

  useEffect(() => {
    const getContent = async () => {
      const data = await getIntroductionData(coin);
      console.log('Introductions response from server: ', data);
      if (data && data !== undefined) {
        const parsedContent = parseContent(data.message.content);
        console.log('Parsed content: ', parsedContent);
        setContent(parsedContent);
      } else {
        setContent('');
      }
    };
    getContent();
  }, [coin]);

  return (
    <View style={styles.container}>
      {content ? (
        <>
          <Text style={styles.introText}>{content.description}</Text>
          <View style={styles.dataContainer}>
            {content.dataItems.map((item, index) => (
              <View key={index} style={styles.textContainer}>
                <Image
                  style={styles.starSymbol}
                  resizeMode="contain"
                  source={require('../../../../../../../../assets/images/fundamentals/star-icon.png')}
                />
                <Text style={styles.introText}>{item}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default Introduction;
