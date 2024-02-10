import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import useUpgradeOverlayStyles from './UpgradeOverlayStyles';
import {useNavigation} from '@react-navigation/core';
import {RevenueCatContext} from '../../context/RevenueCatContext';
import {TopMenuContext} from '../../context/topMenuContext';
import {AppThemeContext} from '../../context/themeContext';

const UpgradeOverlay = ({isBlockingByCoin, screen}) => {
  const screens = {
    Charts: {
      image: {
        light: require('../../assets/images/home/upgradeOverlay/charts-light-blur-updated.png'),
        dark: require('../../assets/images/home/upgradeOverlay/charts-dark-blur-updated.png'),
      },
    },
    News: {
      image: {
        light: require('../../assets/images/home/upgradeOverlay/news-light-blur.png'),
        dark: require('../../assets/images/home/upgradeOverlay/news-dark-blur.png'),
      },
    },
    Alerts: {
      image: {
        light: require('../../assets/images/home/upgradeOverlay/alerts-blur-light-updated.png'),
        dark: require('../../assets/images/home/upgradeOverlay/alerts-blur-dark-updated.png'),
      },
    },
    Chatbot: {
      image: {
        light: require('../../assets/images/home/upgradeOverlay/chatbot-blur.png'),
        dark: require('../../assets/images/home/upgradeOverlay/chatbot-dark.png'),
      },
    },
  };
  const [activeBlur, setActiveBlur] = useState(screens[screen]);
  const {findCategoryInIdentifiers, userInfo} = useContext(RevenueCatContext);
  const [subscribed, setSubscribed] = useState(false);
  const navigation = useNavigation();
  const {activeCoin} = useContext(TopMenuContext);
  const styles = useUpgradeOverlayStyles();
  const {isDarkMode} = useContext(AppThemeContext);

  // This useEffect handles the content regulation
  useEffect(() => {
    if (isBlockingByCoin && activeCoin && activeCoin !== undefined) {
      const hasCoinSubscription = findCategoryInIdentifiers(
        activeCoin.category_name,
        userInfo.entitlements,
      );
      setSubscribed(hasCoinSubscription);
    } else {
      if (isBlockingByCoin === false) {
        setSubscribed(userInfo.subscribed);
      }
    }
  }, [activeCoin, userInfo]);

  const onUpgradePressed = () => {
    navigation.navigate('Account', {screen: 'Subscriptions'});
  };

  return subscribed && subscribed === true ? (
    <></>
  ) : isBlockingByCoin ? (
    <View style={styles.overlayContainer}>
      <ImageBackground
        style={styles.overlayImage}
        source={isDarkMode ? activeBlur.image.dark : activeBlur.image.light}
        resizeMode={'cover'}>
        <View style={styles.lockContainer}>
          <Image
            resizeMode="contain"
            style={styles.lockIcon}
            source={require('../../assets/images/lock.png')}
          />
        </View>
        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={onUpgradePressed}>
          <Text style={styles.buttonText}>Upgrade</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  ) : (
    <View style={styles.overlayContainer}>
      <View style={styles.analysisOverlayContent}>
        <View style={styles.lockContainer}>
          <Image
            resizeMode="contain"
            style={styles.secondLockIcon}
            source={require('../../assets/images/lock.png')}
          />
        </View>
        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={onUpgradePressed}>
          <Text style={styles.buttonText}>Upgrade</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpgradeOverlay;
