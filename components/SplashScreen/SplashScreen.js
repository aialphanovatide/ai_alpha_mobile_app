import React, { useEffect, useRef} from 'react';
import {SafeAreaView, Animated, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useSplashScreenStyles from './SplashScreenStyles';

// Custom splash screen component to show the app logo when the app starts for the first time. It uses the useSplashScreenStyles hook to get the styles for the component.

const CustomSplashScreen = () => {
  const styles = useSplashScreenStyles();

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 650,
          easing: Easing.in,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 650,
          easing: Easing.in,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 6,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={['#0F0F0F', '#171717']}
      locations={[0.22, 0.97]}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <Animated.Image
          source={require('../../assets/images/intro_logo.png')}
          resizeMode="contain"
          style={[
            styles.alphaLogo,
            {
              transform: [{scale: scaleAnim}],
              opacity: opacityAnim,
            },
          ]}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CustomSplashScreen;
