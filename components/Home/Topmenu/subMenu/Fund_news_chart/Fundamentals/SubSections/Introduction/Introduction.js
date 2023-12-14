import {Text, View} from 'react-native';
import React from 'react';
import styles from './IntroductionStyles';
const Introduction = ({description, dataItems}) => {
  return (
    <View>
      <Text style={styles.introText}>{description}</Text>
      <View style={styles.dataContainer}>
        {dataItems.map((item, index) => (
          <Text key={index} style={styles.introText}>
            <Text>🟢</Text>
            {item.text}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Introduction;
