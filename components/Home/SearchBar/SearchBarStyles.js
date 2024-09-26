import React, {useContext} from 'react';
import {Platform, StyleSheet} from 'react-native';
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
      width: '97%',
      flexDirection: 'row',
      position: 'relative',
      marginRight: 22,
      height: 60,
      zIndex: 1999,
    },
    textInputContainerIOSAfter: {
      width: '97%',
      flexDirection: 'row',
      position: 'relative',
      marginRight: 22,
      marginLeft: -38,
      height: 60,
      zIndex: 2001,
    },
    none: {
      display: 'none',
    },
    magnifierIcon: {
      top: 20,
      left: Platform.OS === 'ios' ? 13 : 12,
      width: 44,
      height: 24,
      marginHorizontal: 4,
      zIndex: 1100,
      tintColor: theme.searchPlaceHolderColor,
    },
    magnifierIconAfter: {
      top: 20,
      left: 49,
      width: 44,
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
      marginLeft: Platform.OS === 'ios' ? -25 : 0,
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