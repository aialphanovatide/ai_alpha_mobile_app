import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import useLoaderStyles from './LoaderStyles';
import {AppThemeContext} from '../../context/themeContext';

const Loader = ({isLoading = true}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useLoaderStyles();
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator
        size="large"
        color={theme.loaderColor}
      />

    </View>
  );
};

export default Loader;
