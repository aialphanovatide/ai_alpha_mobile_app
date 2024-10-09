import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';

const BackgroundGradient = () => {
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <LinearGradient
      useAngle={true}
      angle={20}
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.05, 0.97]}
      style={styles.gradient}
    />
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BackgroundGradient;
