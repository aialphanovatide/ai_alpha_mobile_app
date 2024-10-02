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
      width: '98%',
      marginVertical: 8,
      marginLeft: -12,
      alignContent: 'center',
      borderRadius: 3,
    },
    searchInput: {
      width: '97%',
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
      alignSelf: 'flex-start',
      flexDirection: 'row',
      position: 'relative',
      height: 60,
      zIndex: 2001,
    },
    textInputContainerAfter: {
      width: '100%',
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
      zIndex: 2001,

    },
    textInputContainerIOSAfter: {
      width: Platform.OS === 'ios' ? '100%' : '97%',
      flexDirection: 'row',
      position: 'relative',
      marginRight: Platform.OS === 'ios' ? 0 : 22,
      marginLeft: Platform.OS === 'ios' ? 20 : -38,
      height: 60,
      zIndex: 2001,
    },
    none: {
      display: 'none',
    },
    magnifierButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 80,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
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
    magnifierTouchableContainer: {
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
      marginLeft: Platform.OS === 'ios' ? 40 : 0,
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
      top: '20%',
      right: '-7.5%',
      width: 40,
      height: 40,
      backgroundColor: 'transparent',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    closeImage: {
      width: 25,
      height: 25,
      tintColor: theme.grayButtonColor,
    },
  });
  return styles;
};

export default useSearchBarStyles;
