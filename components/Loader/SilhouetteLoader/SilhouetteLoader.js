/*
import React, {useContext} from 'react';
import {View} from 'react-native';
import useLoaderStyles from '../LoaderStyles';
import {Skeleton} from 'moti/skeleton';
import {AppThemeContext} from '../../../context/themeContext';

const SilhouetteLoader = ({isLoading, isRoundLoader}) => {
  const styles = useLoaderStyles();
  const {theme, isDarkMode} = useContext(AppThemeContext);
  return (
    <View style={styles.silhouetteLoaderContainer}>
      {isLoading && (
        <Skeleton
          show={isLoading}
          height={200}
          width={200}
          transition={{type: 'timing', duration: 100}}
          colorMode={isDarkMode ? 'dark' : 'light'}
          backgroundColor={theme.boxesBackgroundColor}
          radius={isRoundLoader ? 50 : 4}
        />
      )}
    </View>
  );
};

const IconLoader = ({isLoading, width}) => {
  const styles = useLoaderStyles();
  const {theme, isDarkMode} = useContext(AppThemeContext);
  return (
    <Skeleton
      width={width}
      height={width}
      show={isLoading}
      radius={width / 2}
      transition={{type: 'timing', duration: 100}}
      colorMode={isDarkMode ? 'dark' : 'light'}
      backgroundColor={theme.boxesBackgroundColor}
    />
  );
};

export default SilhouetteLoader;
*/