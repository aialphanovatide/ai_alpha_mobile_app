import {Image, Text, View} from 'react-native';
import React from 'react';
import useIntroductionStyles from './IntroductionStyles';
const Introduction = ({description, dataItems}) => {
  const styles = useIntroductionStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.introText}>{description}</Text>
      <View style={styles.dataContainer}>
        {dataItems.map((item, index) => (
          <View key={index} style={styles.textContainer}>
            <Image
              style={styles.starSymbol}
              resizeMode="contain"
              source={require('../../../../../../../../assets/images/fundamentals/star-icon.png')}
            />
            <Text style={styles.introText}>{item.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Introduction;
