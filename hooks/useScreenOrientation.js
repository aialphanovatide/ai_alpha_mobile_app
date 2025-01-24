import {useEffect, useState} from 'react';
import {Dimensions, Platform} from 'react-native';
import Orientation, {
  LANDSCAPE,
  OrientationType,
} from 'react-native-orientation-locker';
import {singletonHook} from 'react-singleton-hook';

// Utility to check platform
export const isAndroid = () => Platform.OS === 'android';

// Hook to manage screen orientation
export const useScreenOrientation = singletonHook(
  {
    isLandscape: false,
    isHorizontal: false,
    screenOrientation: Orientation.getInitialOrientation(),
  },
  () => {
    const [screenOrientation, setScreenOrientation] = useState(
      Orientation.getInitialOrientation() || OrientationType.PORTRAIT,
    );
    const [isManuallyHorizontal, setIsManuallyHorizontal] = useState(false);

    const forcePortraitMode = () => {
      // Unlock orientation and force portrait for iOS
      Orientation.unlockAllOrientations();
      setTimeout(() => {
        Orientation.lockToPortrait();
        console.log('Forcefully locked to Portrait');
      }, 100);
    };

    useEffect(() => {
      const updateOrientation = () => {
        const {width, height} = Dimensions.get('window');
        const isLandscape = width > height;
        setScreenOrientation(
          isLandscape
            ? isAndroid
              ? 'LANDSCAPE-LEFT'
              : LANDSCAPE
            : OrientationType.PORTRAIT,
        );
      };

      if (isAndroid()) {
        // Android: Listen for dimension changes
        Dimensions.addEventListener('change', updateOrientation);
      } else {
        // iOS: Use orientation listeners
        Orientation.addOrientationListener(setScreenOrientation);
      }

      // Cleanup listeners
      return () => {
        if (isAndroid()) {
          Dimensions.removeEventListener('change', updateOrientation);
        } else {
          Orientation.removeOrientationListener(setScreenOrientation);
        }
      };
    }, []);

    useEffect(() => {
      console.log('isManuallyHorizontal before if:', isManuallyHorizontal);

      // Lock orientation based on isManuallyHorizontal
      if (isManuallyHorizontal === true) {
        // NOTE: true means 'landscape'
        console.log(
          'isManuallyHorizontal inside true branch of the if',
          isManuallyHorizontal,
        );
        Orientation.lockToLandscape();
        console.log('Orientation locked to Landscape');
      } else if (isManuallyHorizontal === false) {
        // NOTE: false means 'portrait'
        console.log(
          'isManuallyHorizontal inside false branch of the if',
          isManuallyHorizontal,
        );
        if (Platform.OS === 'ios') {
          forcePortraitMode(); // Handle portrait mode specifically for iOS
        } else {
          Orientation.lockToPortrait();
          console.log('Orientation locked to Portrait');
        }
      } else {
        console.error(
          'Unexpected value for isManuallyHorizontal:',
          isManuallyHorizontal,
        );
      }
    }, [isManuallyHorizontal]);

    const handleScreenOrientationChange = shouldBeHorizontal => {
      console.log(
        'handleScreenOrientationChange called with:',
        shouldBeHorizontal,
      );

      if (typeof shouldBeHorizontal !== 'boolean') {
        console.error(
          'Invalid value passed to handleScreenOrientationChange:',
          shouldBeHorizontal,
        );
        return; // Prevent further execution if the value is invalid
      }

      setIsManuallyHorizontal(shouldBeHorizontal);
    };

    return {
      isLandscape:
        screenOrientation && screenOrientation !== undefined
          ? screenOrientation.includes(isAndroid ? 'LANDSCAPE-LEFT' : LANDSCAPE)
          : false, // Tracks actual landscape/portrait state
      isHorizontal: isManuallyHorizontal, // Boolean reflecting manual toggle state
      screenOrientation,
      handleScreenOrientationChange,
    };
  },
);
