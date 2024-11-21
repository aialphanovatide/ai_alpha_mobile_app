import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import Orientation, {
  LANDSCAPE,
  OrientationType,
} from 'react-native-orientation-locker';
import {singletonHook} from 'react-singleton-hook';
import {Platform} from 'react-native';

// Hook to get the screen orientation and lock it to portrait or landscape mode. It uses the react-native-orientation-locker library to get the screen orientation and lock it to the desired mode.

export const isAndroid = () => Platform.OS === 'android';
export const useScreenOrientation = singletonHook(
  {
    isLandscape: false,
    screenOrientation: Orientation.getInitialOrientation(),
  },
  () => {
    const [screenOrientation, setScreenOrientation] = useState(
      Orientation.getInitialOrientation(),
    );
    const [isManuallyHorizontal, setIsManuallyHorizontal] = useState(false);

    useEffect(() => {
      const onChange = result => {
        setScreenOrientation(result);
      };

      const onChangeAndroid = result => {
        return onChange(
          result.screen.height > result.screen.width
            ? OrientationType.PORTRAIT
            : OrientationType['LANDSCAPE-LEFT'],
        );
      };

      if (isAndroid()) {
        Dimensions.addEventListener('change', onChangeAndroid);
      } else {
        Orientation.addOrientationListener(onChange);
      }

      return () => {
        if (isAndroid()) {
          Dimensions.removeEventListener('change', onChangeAndroid);
        } else {
          Orientation.removeOrientationListener(onChange);
        }
      };
    }, []);

    const handleScreenOrientationChange = orientation => {
      if (orientation === 'PORTRAIT' || isManuallyHorizontal) {
        Orientation.lockToPortrait();
        setIsManuallyHorizontal(false);
      } else {
        Orientation.lockToLandscape();
        setIsManuallyHorizontal(true);
      }
    };

    return {
      isLandscape: screenOrientation.includes(LANDSCAPE),
      isHorizontal: isManuallyHorizontal,
      screenOrientation,
      handleScreenOrientationChange: handleScreenOrientationChange,
    };
  },
);
