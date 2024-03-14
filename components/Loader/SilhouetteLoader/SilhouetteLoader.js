import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import useLoaderStyles from '../LoaderStyles';

const SilhouetteLoader = ({isLoading}) => {
  const shimmerOpacity = useRef(new Animated.Value(0)).current;
  const styles = useLoaderStyles();

  const startShimmerAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    if (isLoading) {
      startShimmerAnimation();
    }
  }, [isLoading]);

  return (
    <View style={styles.silhouetteLoaderContainer}>
      {isLoading && (
        <Animated.View
          style={[
            styles.shimmer,
            {
              opacity: shimmerOpacity,
            },
          ]}
        />
      )}
    </View>
  );
};

export default SilhouetteLoader;
