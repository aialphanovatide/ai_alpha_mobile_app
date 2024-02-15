import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import useFundamentalsStyles from './FundamentalsStyles';

export const AboutIcon = ({handleAboutPress, description}) => {
  const styles = useFundamentalsStyles();
  return (
    <TouchableOpacity
      onPress={() => handleAboutPress(description)}
      style={styles.aboutIconWrapper}>
      <Image
        source={require('../../../../../../assets/images/fundamentals/about-icon.png')}
        resizeMode="contain"
        style={styles.aboutIcon}
        alt="About"
      />
    </TouchableOpacity>
  );
};
