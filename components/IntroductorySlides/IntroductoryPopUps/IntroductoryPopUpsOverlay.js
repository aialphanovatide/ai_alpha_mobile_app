import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useIntroductorySlidesStyles from '../IntroductorySlidesStyles';
import {useNavigation} from '@react-navigation/core';

const IntroductoryPopUp = ({
  title,
  description,
  dotIndex,
  dots,
  handleNextPress,
  handleActivePopUps,
  activeStyles,
  handleSubscriptionButton,
  opacity,
}) => {
  const styles = useIntroductorySlidesStyles();
  return (
    <Animated.View style={[styles.popUpModal, activeStyles, {opacity}]}>
      <Text style={styles.popUpTitle}>{title}</Text>
      <Text style={styles.popUpText}>{description}</Text>
      {dotIndex === dots.length - 1 ? (
        <TouchableOpacity
          style={styles.subscribePopUpsButton}
          onPress={() => handleSubscriptionButton()}>
          <Text style={[styles.buttonText, styles.popUpsButtonText]}>
            Start the 7-day free trial
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <View style={styles.row}>
        <Text style={styles.popUpSkip} onPress={() => handleActivePopUps()}>
          Skip
        </Text>
        {dotIndex === dots.length - 1 ? (
          <></>
        ) : (
          <>
            <Text
              style={styles.popUpNext}
              onPress={() => handleNextPress(dotIndex)}>
              Next
            </Text>
            <Image
              source={require('../../../assets/images/arrow-right.png')}
              resizeMode="contain"
              style={styles.nextRightArrow}
            />
          </>
        )}
      </View>
      <View style={styles.dotsContainer}>
        {dots.map((dot, index) => (
          <View
            key={index}
            style={[
              styles.popUpDot,
              index === dotIndex ? styles.popUpActiveDot : {},
            ]}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const IntroductoryPopUpsOverlay = ({handleActivePopUps, visible}) => {
  const styles = useIntroductorySlidesStyles();
  const navigation = useNavigation();
  const POP_UPS_DATA = [
    {
      title: 'Coins and layers',
      description:
        'Explore the top bar to learn about the different categories and their assets.',
      popUpStyles: {
        overlay: {},
        modal: {},
        triangle: {},
        navbar: {
          left: 5,
          width: '17.5%',
        },
      },
      sectionName: 'Home',
    },
    {
      title: 'Alerts',
      description:
        'Set up custom alerts to stay notified about crucial market movements.',
      popUpStyles: {
        overlay: {
          marginBottom: 50,
          justifyContent: 'flex-end',
        },
        modal: {
          marginBottom: 120,
        },
        triangle: {
          bottom: 100,
          left: 105,
          transform: [{scaleY: -1}],
        },
        navbar: {
          left: 80,
        },
      },
      sectionName: 'Alerts',
    },
    {
      title: 'ASK AI',
      description:
        'Need quick insights? Use the Ask AI to get real-time information from our curated database.',
      popUpStyles: {
        overlay: {
          marginBottom: 50,
          justifyContent: 'flex-end',
        },
        modal: {
          marginBottom: 150,
        },
        triangle: {
          bottom: 130,
          left: 185,
          transform: [{scaleY: -1}],
        },
        navbar: {
          left: 160,
          height: 140,
        },
      },
      sectionName: 'AskAi',
    },
    {
      title: 'Dashboard',
      description:
        'Access curated and unbiased analyses and charts by category.',
      popUpStyles: {
        overlay: {
          marginBottom: 50,
          justifyContent: 'flex-end',
        },
        modal: {
          marginBottom: 120,
        },
        triangle: {
          bottom: 100,
          left: 270,
          transform: [{scaleY: -1}],
        },
        navbar: {
          left: 240,
        },
      },
      sectionName: 'Analysis',
    },
    {
      title: 'Account',
      description:
        'Manage your account settings, subscription options, and custom-tailored notifications here.',
      popUpStyles: {
        overlay: {
          marginBottom: 50,
          justifyContent: 'flex-end',
        },
        modal: {
          marginBottom: 120,
        },
        triangle: {
          bottom: 100,
          left: 335,
          transform: [{scaleY: -1}],
        },
        navbar: {
          left: 325,
        },
      },
      sectionName: 'Account',
    },
  ];

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {});
  }, []);

  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const opacity = useRef(new Animated.Value(0)).current;

  const handleNextPress = current => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        if (current + 1 < POP_UPS_DATA.length) {
          setActiveDotIndex(current + 1);
        } else {
          setActiveDotIndex(0);
        }
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }, 1500);
    });
  };

  const handleSubscriptionButton = () => {
    navigation.navigate('Account', {screen: 'Subscriptions'});
  };

  const handleNavbarPress = (current, sectionName) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setActiveDotIndex(current);
        navigation.navigate(sectionName);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }, 1500);
    });
  };

  return (
    <Modal
      animationType={'fade'}
      transparent
      visible={visible}
      presentationStyle="overFullScreen">
      {activeDotIndex === 0 ? (
        <TouchableOpacity
          style={styles.invisiblePressable}
          onPress={() => handleNextPress(activeDotIndex)}
        />
      ) : (
        <></>
      )}
      <View
        style={[
          styles.popUpsOverlay,
          POP_UPS_DATA[activeDotIndex].popUpStyles.overlay,
        ]}>
        <TouchableOpacity
          style={[styles.popUpPressableOverlay]}
          onPress={() => handleNextPress(activeDotIndex)}
        />
        <Animated.Image
          style={[
            styles.triangle,
            POP_UPS_DATA[activeDotIndex].popUpStyles.triangle,
            {opacity},
          ]}
          source={require('../../../assets/images/introductorySection/pop-up-triangle.png')}
          resizeMode="contain"
        />
        <IntroductoryPopUp
          title={POP_UPS_DATA[activeDotIndex].title}
          description={POP_UPS_DATA[activeDotIndex].description}
          handleNextPress={handleNextPress}
          dotIndex={activeDotIndex}
          dots={POP_UPS_DATA}
          handleActivePopUps={handleActivePopUps}
          activeStyles={POP_UPS_DATA[activeDotIndex].popUpStyles.modal}
          handleSubscriptionButton={handleSubscriptionButton}
          opacity={opacity}
        />
        {POP_UPS_DATA.map((item, index) => (
          <TouchableOpacity
            key={item.title}
            style={[styles.bottomTransparentButton, item.popUpStyles.navbar]}
            delayPressIn={2000}
            onPress={() => handleNavbarPress(index, item.sectionName)}
          />
        ))}
      </View>
    </Modal>
  );
};

export default IntroductoryPopUpsOverlay;
