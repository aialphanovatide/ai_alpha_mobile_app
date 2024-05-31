import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useSearchBarStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      padding: 12,
    },
    searchBar: {
      position: 'relative',
      width: '95%',
      marginVertical: 8,
      alignContent: 'center',
      alignSelf: 'center',
      borderRadius: 3,
    },
    searchInput: {
      width: '100%',
      height: 40,
      paddingLeft: 48,
      alignSelf: 'center',
      fontFamily: theme.font,
      fontSize: 14,
      color: theme.searchPlaceHolderColor,
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    textInputContainer: {
      flexDirection: 'row',
      position: 'relative',
      height: 60,
    },
    textInputContainerIOS: {
      flexDirection: 'row',
      position: 'relative',
      marginHorizontal: 14,
      height: 60,
    },
    none: {
      display: 'none',
    },
    magnifierIcon: {
      position: 'absolute',
      top: 20,
      left: 12,
      width: 24,
      height: 24,
      marginHorizontal: 4,
      zIndex: 1100,
      tintColor: theme.searchPlaceHolderColor,
    },
    magnifierTintColor: {
      tintColor: theme.textColor,
    },
    aiAlphaTextImage: {
      width: 100,
      height: 14,
      marginTop: 24,
      alignSelf: 'center',
    },
    transparentOverlay: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      zIndex: 1001,
    },
    inactiveSearchBar: {
      flex: 1,
      justifyContent: 'center',
    },
  });
  return styles;
};

export default useSearchBarStyles;
