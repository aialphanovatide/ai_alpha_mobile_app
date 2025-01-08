import React, {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const useFreeFoundersEndStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: theme.baseBackgroundColor, // or transparent if you prefer
    },
    imageBackground: {
      width: '100%',
      // You could set a minHeight if you want the rocket to fill the top
      minHeight: windowHeight,
      marginTop: -130,
      // Because it's the background, you can adjust how the rocket appears:
      alignItems: 'center',
      // optionally padding or margin if needed
    },

    // The “card” that sits on top of the background
    contentContainer: {
      marginTop: 450, // adjust top spacing so text is below rocket
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 34,
      color: theme.mainTextColor,
      fontWeight: '600',
      marginBottom: 8,
      textAlign: 'center',
      fontFamily: theme.fontMedium,
    },
    priceWrapper: {
      alignItems: 'center',
      marginBottom: 24,
    },
    strikethroughPrice: {
      fontSize: 18,
      color: '#71717A',
      textDecorationLine: 'line-through',
      marginBottom: 0,
      fontFamily: theme.fontMedium,
    },
    freeText: {
      fontSize: 25,
      color: theme.mainTextColor,
      fontWeight: '600',
      marginBottom: 4,
      fontFamily: theme.fontMedium,
    },
    untilText: {
      fontSize: 17,
      color: '#71717A',
      fontFamily: theme.font,
    },

    // Carousel
    carouselContainer: {
      width: windowWidth,
      marginTop: 0,
      marginBottom: 200,
    },
    slideContent: {
      flexDirection: 'row',
      width: windowWidth * 0.9,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: theme.freeFoundersPopupSlideBg,
      paddingHorizontal: 15,
      height: 160,
    },
    phoneImage: {
      width: windowWidth * 0.25,
      height: windowWidth * 0.5,
      resizeMode: 'contain',
      marginRight: 12,
    },
    featureTextContainer: {
      flex: 1,
    },
    featureTitle: {
      fontSize: 23,
      color: theme.mainTextColor,
      fontWeight: '500',
      marginBottom: 4,
      fontFamily: theme.fontMedium,
    },
    featureSubtitle: {
      fontSize: 19,
      color: theme.mainTextColor,
      flexWrap: 'wrap',
      fontFamily: theme.font,
      fontWeight: '400',
    },
    paginationDots: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: theme.freeFoundersPopupSlideDotColor,
      marginHorizontal: 3,
    },
    dotActive: {
      width: 10,
      height: 10,
      marginTop: -2,
    },

    // CTA
    ctaContainer: {
      position: 'absolute', // so it stays near bottom or pinned if you like
      bottom: -50, // adjust as desired
      left: 0,
      right: 0,
      paddingHorizontal: 24,
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    ctaButton: {
      width: '100%',
      borderRadius: 5,
      overflow: 'hidden',
      marginTop: 10,
    },
    ctaGradient: {
      paddingVertical: 14,
      alignItems: 'center',
      borderRadius: 5,
    },
    ctaButtonText: {
      color: '#FFFFFF',
      fontFamily: theme.fontMedium,
      fontSize: 16,
      fontWeight: '600',
    },
    ctaButtonTwo: {
      width: '100%',
      borderRadius: 5,
      overflow: 'hidden',
      marginTop: 10,
    },
    ctaGradientTwo: {
      paddingVertical: 14,
      alignItems: 'center',
      borderRadius: 5,
      borderColor: '#FF6C0D',
      borderWidth: 2,
    },
    ctaButtonTextTwo: {
      color: '#FF6C0D',
      fontFamily: theme.fontMedium,
      fontSize: 16,
      fontWeight: '400',
    },
    footerText: {
      fontSize: 12,
      color: '#aaa',
      textAlign: 'center',
      marginTop: 12,
      lineHeight: 18,
      fontFamily: theme.font,
    },
  });
  return styles;
};
export default useFreeFoundersEndStyles;
