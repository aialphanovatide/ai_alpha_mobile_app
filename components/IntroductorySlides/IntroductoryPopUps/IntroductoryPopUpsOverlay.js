import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useIntroductorySlidesStyles from '../IntroductorySlidesStyles';
import {useNavigation} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
import {RevenueCatContext} from '../../../context/RevenueCatContext';

// Component that renders the pop-up of the introductory slides, with a title, description, and a button that allows the user to render the next pop-up or to start the 7-day free trial. It displays a set of dots that indicate the current pop-up and the total number of pop-ups, and renders a 'Skip' button that allows the user to skip the pop-ups and start using the app. The data for the pop-ups is passed as props, and the component is used in the IntroductoryPopUpsOverlay component.

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
  hasFounders,
}) => {
  const styles = useIntroductorySlidesStyles();
  return (
    <Animated.View style={[styles.popUpModal, activeStyles, {opacity}]}>
      <View
        style={[
          styles.row,
          {marginVertical: 8, justifyContent: 'space-between'},
        ]}>
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
        <Text style={styles.popUpSkip} onPress={() => handleActivePopUps()}>
          Skip
        </Text>
      </View>
      <Text style={styles.popUpTitle}>{title}</Text>
      <Text style={styles.popUpText}>{description}</Text>
      <TouchableOpacity
        style={styles.subscribePopUpsButton}
        onPress={() => {
          dotIndex === dots.length - 1
            ? handleSubscriptionButton()
            : handleNextPress(dotIndex);
        }}>
        <Text style={[styles.buttonText, styles.popUpsButtonText]}>
          {dotIndex === dots.length - 1
            ? hasFounders
              ? "Let's explore the app"
              : 'Start the 30-day free trial'
            : 'Got it'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// IntroductoryPopUpsOverlay component is used to display the pop-ups that explain the features of the app at the beginning of the user's journey, rendering only one time per user.

const IntroductoryPopUpsOverlay = ({
  handleActivePopUps,
  visible,
  isFounderUser = false,
}) => {
  const styles = useIntroductorySlidesStyles();
  const navigation = useNavigation();
  const {userInfo} = useContext(RevenueCatContext);

  // Check if the user has the RevenueCat Founders subsription, depending on it, the content of the last pop-ups changes.
  const hasFounders = userInfo.entitlements.some(id =>
    id.toLowerCase().includes('founders'),
  );

  // Static data for the pop-ups

  const POP_UPS_DATA = [
    {
      title: 'Coins and layers',
      description:
        'Explore the top bar to learn about the different categories and their assets.',
      popUpStyles: {
        overlay: {},
        modal: {},
        triangle: {
          left: '50%',
        },
        navbar: {
          left: 5,
          width: '17.5%',
        },
        askButton: null,
      },
      sectionName: 'Home',
    },
    {
      title: 'Alerts',
      description:
        'Set up custom alerts to stay notified about crucial market movements.',
      popUpStyles: {
        overlay: {
          height: Platform.OS === 'ios' ? '85%' : '90%',
          justifyContent: 'flex-end',
        },
        modal: {
          marginBottom: 20,
        },
        triangle: {
          bottom: 0,
          left: 103,
          transform: [{scaleY: -1}],
        },
        navbar: {
          left: 80,
        },
        askButton: null,
      },
      sectionName: 'Alerts',
    },
    {
      title: 'ASK AI',
      description:
        'Need quick insights? Use the Ask AI to get real-time information from our curated database.',
      popUpStyles: {
        overlay: {
          height: Platform.OS === 'ios' ? '86.5%' : '90%',
          justifyContent: 'flex-end',
          paddingBottom: '12.5%',
        },
        modal: {
          marginBottom: 20,
        },
        triangle: {
          left: '50%',
          bottom: '8%',
          transform: [{scaleY: -1}],
        },
        navbar: {
          left: '42.5%',
          height: 140,
        },
        askButton: true,
      },
      sectionName: 'AskAi',
    },
    {
      title: 'Dashboard',
      description:
        'Access curated and unbiased analyses and charts by category.',
      popUpStyles: {
        overlay: {
          height: Platform.OS === 'ios' ? '85%' : '90%',
          justifyContent: 'flex-end',
        },
        modal: {
          marginBottom: 20,
        },
        triangle: {
          bottom: 0,
          left: 270,
          transform: [{scaleY: -1}],
        },
        navbar: {
          left: 240,
        },
        askButton: null,
      },
      sectionName: 'Analysis',
    },
    {
      title: hasFounders ? 'Account' : 'Subscribe',
      description:
        'Manage your account settings, subscription options, and custom-tailored notifications here.',
      popUpStyles: {
        overlay: {
          height: Platform.OS === 'ios' ? '85%' : '90%',
          justifyContent: 'flex-end',
        },
        modal: {
          marginBottom: 20,
        },
        triangle: {
          bottom: 0,
          left: 335,
          transform: [{scaleY: -1}],
        },
        navbar: {
          left: 325,
        },
        askButton: null,
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

  // Function that handles the press of the 'Next' button, changing the current pop-up to the next one in the array of pop-ups, or to the first one if the current pop-up is the last one.

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

  // Function that handles the press of the 'Start the 7-day free trial' button, navigating the user to the 'Membership' section of the 'Account' screen.

  const handleSubscriptionButton = () => {
    handleActivePopUps();
    if (hasFounders) {
      navigation.navigate('Account');
      return;
    } else {
      navigation.navigate('Account', {screen: 'Membership'});
    }
  };

  // Function that handles the press of the navbar buttons, changing the current pop-up to the one that corresponds to the pressed button.

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
        <>
          <Animated.View style={[{opacity: opacity}]}>
            <TouchableOpacity
              style={[
                styles.invisiblePressable,
                {
                  height: Platform.OS === 'android' ? 80 : 120,
                  backgroundColor: 'rgba(10,10,10,0.6)',
                },
              ]}
              onPress={() => handleActivePopUps()}
            />
          </Animated.View>
          <Animated.View style={[{opacity: opacity}]}>
            <TouchableOpacity
              style={[
                styles.invisiblePressable,
                {height: Platform.OS === 'android' ? 100 : 120},
              ]}
              onPress={() => handleActivePopUps()}
            />
          </Animated.View>
        </>
      ) : (
        <></>
      )}
      <Animated.View
        style={[
          styles.popUpsOverlay,
          POP_UPS_DATA[activeDotIndex].popUpStyles.overlay,
          {opacity: opacity},
        ]}>
        <TouchableOpacity
          style={[styles.popUpPressableOverlay]}
          onPress={() => handleActivePopUps()}
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
          hasFounders={hasFounders}
        />
        {POP_UPS_DATA.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.title}
              style={[styles.bottomTransparentButton, item.popUpStyles.navbar]}
              delayPressIn={2000}
              onPress={() => handleNavbarPress(index, item.sectionName)}
            />
          );
        })}
        <TouchableOpacity
          style={[
            styles.bottomTransparentButton,
            POP_UPS_DATA[2].popUpStyles.navbar,
            activeDotIndex !== 2 ? {zIndex: -1} : {},
          ]}
          delayPressIn={2000}
          onPress={() => handleNavbarPress(2, POP_UPS_DATA[2].sectionName)}>
          <View style={[styles.buttonWrapper]}>
            <LinearGradient
              useAngle={false}
              colors={['#F9B208', '#FC5404']}
              style={styles.askAiButton}>
              <Image
                style={styles.buttonImage}
                source={require('../../../assets/images/askAi/askai-icon.png')}
                resizeMode="contain"
              />
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

export default IntroductoryPopUpsOverlay;
