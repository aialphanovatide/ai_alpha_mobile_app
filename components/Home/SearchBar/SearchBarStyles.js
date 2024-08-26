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
      marginVertical: 8,
      paddingHorizontal: 12,
      paddingLeft: 48,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 3,
      fontFamily: theme.font,
      fontSize: theme.responsiveFontSize * 0.925,
      color: theme.textColor,
    },
    textInputContainer: {
      flexDirection: 'row',
      position: 'relative',
      height: 60,
      zIndex: 2001,
    },
    textInputContainerIOS: {
      flexDirection: 'row',
      position: 'relative',
      marginHorizontal: 14,
      height: 60,
      zIndex: 2001,
    },
    none: {
      display: 'none',
    },
    magnifierIcon: {
      top: 20,
      left: 12,
      width: 24,
      height: 24,
      marginHorizontal: 4,
      zIndex: 1100,
      tintColor: theme.searchPlaceHolderColor,
    },
    magnifierTouchableContainer:{
      flex: 1,
    },
    magnifierTintColor: {
      tintColor: theme.textColor,
    },
    aiAlphaTextImage: {
      width: 124,
      height: 36,
      marginTop: 42,
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
      alignSelf: 'center',
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 24,
      right: 6,
      width: 17,
      height: 17,
      tintColor: theme.grayButtonColor,
    }
  });
  return styles;
};

export default useSearchBarStyles;
