import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import useFundamentalsStyles from '../Home/Topmenu/subMenu/Fund_news_chart/Fundamentals/FundamentalsStyles';

// Component that displays the About Icon. It receives the following props: handleAboutPress, title, description, additionalStyles.

export const AboutIcon = ({
  handleAboutPress,
  title,
  description,
  additionalStyles = {},
}) => {
  const styles = useFundamentalsStyles();
  return (
    <TouchableOpacity
      onPress={() => handleAboutPress(description, title)}
      style={[
        styles.aboutIconWrapper,
        additionalStyles ? additionalStyles : {},
      ]}>
      <Image
        source={require('../../assets/images/fundamentals/about-icon.png')}
        resizeMode="contain"
        style={styles.aboutIcon}
        alt="About"
      />
    </TouchableOpacity>
  );
};
