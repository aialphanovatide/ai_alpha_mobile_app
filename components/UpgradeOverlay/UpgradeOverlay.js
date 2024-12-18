import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import useUpgradeOverlayStyles from './UpgradeOverlayStyles';
import {useNavigation} from '@react-navigation/core';
import {AppThemeContext} from '../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

// Component to render the upgrade overlay that is shown to the user when they are not subscribed to the premium features. The overlay contains a title, description, and a button to upgrade to the premium features.

const UpgradeOverlay = ({isCharts = null, subscribed = false}) => {
  const navigation = useNavigation();
  const styles = useUpgradeOverlayStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  const onUpgradePressed = () => {
    navigation.navigate('Account', {screen: 'Subscriptions'});
  };

  if (subscribed) {
    return <></>;
  }

  return (
    <View
      style={[
        styles.overlayContainer,
        isCharts ? {justifyContent: 'flex-start'} : {},
      ]}>
      {isCharts ? (
        <View style={styles.chartsOverlay} />
      ) : (
        <BlurView
          style={styles.absolute}
          blurType={isDarkMode ? 'dark' : 'light'}
          blurAmount={1.75}
          blurRadius={1}
        />
      )}
      <ImageBackground
        fadeDuration={0.125}
        resizeMode="contain"
        source={
          isDarkMode
            ? require('../../assets/images/home/upgradeOverlay/upgrade-overlay-dark.png')
            : require('../../assets/images/home/upgradeOverlay/upgrade-overlay-light.png')
        }
        style={styles.overlayImage}>
        <Text style={styles.overlayTitle}>Start your 7-day free trial</Text>
        <Text
          style={
            styles.overlayDescription
          }>{`with unlimited content, notifications,\n and premium features.`}</Text>
        <LinearGradient
          colors={['#F9AF08', '#FC5B04', '#FC5B04']}
          style={styles.linearGradient}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <TouchableOpacity
            style={styles.purchaseButton}
            onPress={() => onUpgradePressed()}>
            <Text style={styles.purchaseButtonText}>Activate Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default UpgradeOverlay;
