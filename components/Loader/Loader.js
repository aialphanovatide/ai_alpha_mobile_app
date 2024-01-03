import React, {useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import useLoaderStyles from './LoaderStyles';
import {AppThemeContext} from '../../context/themeContext';

const Loader = () => {
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useLoaderStyles();
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator
        size="large"
        color={isDarkMode ? '#C4CADA' : '#FC5404'}
      />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export default Loader;
