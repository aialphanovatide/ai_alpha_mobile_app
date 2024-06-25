import React, {useContext, useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
import useLoaderStyles from './LoaderStyles';

const SkeletonItem = ({style}) => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: theme.thirdBoxesBgColor,
          opacity: pulseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.5],
          }),
        },
        style,
      ]}
    />
  );
};

// SkeletonLoader: Componente principal que envuelve varios SkeletonItem
const SkeletonLoader = ({style, type = 'item', quantity = 1}) => {
  const styles = useLoaderStyles();

  const needleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(needleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(needleAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [needleAnim]);

  const needleRotation = needleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-45deg', '45deg'],
  });

  return type === 'item' ? (
    Array.from({length: quantity}).map((_, index) => (
      <View key={index} style={[styles.container, style]}>
        <SkeletonItem style={styles.avatar} />
        <View style={styles.textContainer}>
          <SkeletonItem style={styles.textLine} />
          <SkeletonItem style={[styles.textLine, {width: '60%'}]} />
        </View>
      </View>
    ))
  ) : type === 'circle' ? (
    Array.from({length: quantity}).map((_, index) => (
      <SkeletonItem key={index} style={styles.circle} />
    ))
  ) : type === 'alerts' ? (
    Array.from({length: quantity}).map((_, index) => (
      <View key={index} style={[styles.container, styles.alertsLoader]}>
        <View style={[styles.textContainer, {width: '50%'}]}>
          <SkeletonItem
            style={[styles.textLine, {width: '100%', height: 20}]}
          />
          <SkeletonItem style={[styles.textLine, {width: '80%'}]} />
          <SkeletonItem style={[styles.textLine, {width: '80%'}]} />
        </View>
        <View style={[styles.textContainer, {width: '20%', marginLeft: '25%'}]}>
          <SkeletonItem style={[styles.textLine, {width: '65%'}]} />
          <SkeletonItem style={[styles.textLine, {width: '65%'}]} />
        </View>
      </View>
    ))
  ) : type === 'chart' ? (
    <View style={[styles.chartContainer, style]}>
      <View style={styles.barsContainer}>
        <SkeletonItem style={[styles.chartBar, {height: 40}]} />
        {Array.from({length: 10}).map((_, index) => (
          <SkeletonItem
            key={index}
            style={[styles.chartBar, {height: 60 + Math.random() * 100}]}
          />
        ))}
        <SkeletonItem style={[styles.chartBar, {height: 180}]} />
      </View>
    </View>
  ) : type === 'text' ? (
    <View style={[styles.textLoaderContainer, style]}>
      <SkeletonItem style={[styles.title, {width: '80%'}]} />
      <SkeletonItem style={styles.title} />
      {Array.from({length: quantity}).map((_, index) => (
        <SkeletonItem
          key={index}
          style={[
            styles.textLine,
            {width: `${100}%`, marginTop: 8, marginHorizontal: 0},
          ]}
        />
      ))}
    </View>
  ) : type === 'bigItem' ? (
    Array.from({length: quantity}).map((_, index) => (
      <View
        key={index}
        style={[
          styles.container,
          {paddingLeft: 0, paddingVertical: 0, marginVertical: 4, height: 240},
          style,
        ]}>
        <SkeletonItem style={styles.image} />
        <View style={styles.textContainer}>
          <SkeletonItem style={styles.textLine} />
          <SkeletonItem style={[styles.textLine, {width: '80%'}]} />
          <SkeletonItem style={[styles.textLine, {width: '60%'}]} />
          <SkeletonItem style={[styles.textLine, {width: '80%'}]} />
        </View>
      </View>
    ))
  ) : type === 'circleChart' ? (
    <View
      style={[
        styles.container,
        {paddingLeft: 0, paddingVertical: 0, marginVertical: 4, height: 240},
        style,
      ]}>
      <SkeletonItem style={styles.circleChart} />
      <View style={[styles.textContainer]}>
        <SkeletonItem style={[styles.textLine, {width: '60%'}]} />
        <SkeletonItem
          style={[styles.textLine, {width: '65%', marginTop: 24}]}
        />
        <SkeletonItem
          style={[styles.textLine, {width: '60%', marginTop: 24}]}
        />
        <SkeletonItem
          style={[styles.textLine, {width: '65%', marginTop: 24}]}
        />
      </View>
    </View>
  ) : type === 'timeline' ? (
    <View
      style={[styles.container, {height: 360, position: 'relative'}, style]}>
      <View style={styles.timelineLine} />
      <View style={styles.timelineContainer}>
        {Array.from({length: quantity}).map((_, index) => (
          <SkeletonItem key={index} style={styles.timelineCircle} />
        ))}
      </View>
      <View style={styles.timelineEvent}>
        <SkeletonItem style={styles.title} />
        <SkeletonItem style={[styles.textLine, {height: 14}]} />
        <SkeletonItem style={[styles.textLine, {height: 14}]} />
        <SkeletonItem style={[styles.textLine, {height: 14}]} />
        <SkeletonItem style={[styles.title, {marginTop: 20}]} />
        <SkeletonItem style={[styles.textLine, {height: 14}]} />
        <SkeletonItem style={[styles.textLine, {height: 14}]} />
        <SkeletonItem style={[styles.textLine, {height: 14}]} />
      </View>
    </View>
  ) : type === 'dapps' ? (
    <View style={styles.dappsLoader}>
      <SkeletonItem style={styles.mainImageLoader} />
      {Array.from({length: quantity}).map((_, index) => (
        <View key={index} style={[styles.container, {height: 80}]}>
          <SkeletonItem style={styles.square} />
          <View style={styles.textContainer}>
            <SkeletonItem style={styles.textLine} />
            <SkeletonItem style={[styles.textLine, {width: '60%'}]} />
          </View>
        </View>
      ))}
    </View>
  ) : type === 'competitors' ? (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      <View style={styles.row}>
        {Array.from({length: quantity}).map((_, index) => (
          <SkeletonItem key={index} style={styles.menuItem} />
        ))}
      </View>
    </View>
  ) : type === 'selector' ? (
    <View
      style={[
        styles.container,
        {flexDirection: 'column', alignItems: 'center'},
      ]}>
      <View
        style={[
          styles.row,
          {justifyContent: 'space-between', marginBottom: 48},
        ]}>
        {Array.from({length: quantity}).map((_, index) => (
          <SkeletonItem
            key={index}
            style={[
              styles.menuItem,
              {width: 60, height: 30, marginHorizontal: 12},
            ]}
          />
        ))}
      </View>
      <SkeletonItem
        style={[
          styles.textLine,
          styles.mainImageLoader,
          {
            height: 300,
            width: 250,
            marginVertical: 16,
            marginHorizontal: 0,
            alignSelf: 'center',
          },
          style,
        ]}
      />
    </View>
  ) : type === 'menu' ? (
    <View style={[styles.row, {marginVertical: 4}]}>
      {Array.from({length: quantity}).map((_, index) => (
        <SkeletonItem key={index} style={styles.menuItem} />
      ))}
    </View>
  ) : type === 'calendar' ? (
    <View
      style={[
        styles.container,
        {
          width: '100%',
          flexDirection: 'column',
          marginTop: 4,
          paddingLeft: 0,
          paddingVertical: 0,
        },
        style,
      ]}>
      {Array.from({length: quantity}).map((_, index) => (
        <View
          key={index}
          style={[
            styles.container,
            {marginVertical: 8, paddingVertical: 16, paddingHorizontal: 4},
          ]}>
          <SkeletonItem style={styles.avatar} />
          <View style={styles.textContainer}>
            <SkeletonItem style={[styles.textLine, {width: '60%'}]} />
            <SkeletonItem style={[styles.textLine, {width: '30%'}]} />
          </View>
        </View>
      ))}
    </View>
  ) : type === 'search' ? (
    Array.from({length: quantity}).map((_, index) => (
      <View key={index} style={[styles.container, {paddingLeft: 0}]}>
        <SkeletonItem
          style={[styles.avatar, {width: 40, height: 40, borderRadius: 20}]}
        />
        <View style={styles.textContainer}>
          <SkeletonItem style={[styles.textLine, {width: '50%'}]} />
        </View>
      </View>
    ))
  ) : type === 'fundingRates' ? (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
          marginVertical: 16,
          paddingVertical: 0,
          paddingLeft: 0,
        },
      ]}>
      <View style={styles.container}>
        <SkeletonItem style={[styles.textLine, {width: '25%'}]} />
        {Array.from({length: 3}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.container,
              {
                flexDirection: 'column',
                width: '20%',
                justifyContent: 'center',
                paddingVertical: 0,
                paddingLeft: 0,
              },
            ]}>
            <SkeletonItem
              style={[styles.avatar, {width: 40, height: 40, borderRadius: 20}]}
            />
            <SkeletonItem
              style={[
                styles.textLine,
                {width: '50%', marginHorizontal: 0, marginLeft: 10},
              ]}
            />
          </View>
        ))}
      </View>
      {Array.from({length: quantity}).map((_, index) => (
        <View
          key={index}
          style={[styles.container, {paddingLeft: 0, paddingVertical: 0}]}>
          <View
            key={index}
            style={[
              styles.container,
              {flexDirection: 'column', width: '40%', justifyContent: 'center'},
            ]}>
            <SkeletonItem
              style={[
                styles.avatar,
                {width: 40, height: 40, marginLeft: 0, borderRadius: 20},
              ]}
            />
            <SkeletonItem style={[styles.textLine, {width: '50%'}]} />
          </View>
          {Array.from({length: 3}).map((_, index) => (
            <SkeletonItem
              key={index}
              style={[styles.textLine, {width: '12.5%', marginHorizontal: 10}]}
            />
          ))}
        </View>
      ))}
    </View>
  ) : type === 'timeframe' ? (
    <View style={[styles.container, {paddingVertical: 0, paddingTop: 16}]}>
      {Array.from({length: quantity}).map((_, index) => (
        <SkeletonItem
          key={index}
          style={[
            styles.square,
            {
              width: `${90 / quantity}%`,
              height: 20,
              marginLeft: 0,
              marginHorizontal: 8,
            },
          ]}
        />
      ))}
    </View>
  ) : type === 'speedometer' ? (
    <View style={[styles.speedometerContainer, {height: 225}, style]}>
      <SkeletonItem
        style={[styles.halfCircle, {width: 200, height: 200 / 2}]}
      />
      <SkeletonItem
        style={[
          styles.needle,
          {
            width: 200 / 2,
            height: 8,
            transform: [{rotate: '45deg'}],
          },
        ]}
      />
    </View>
  ) : type === 'askAi' ? (
    <View
      style={[
        styles.container,
        {flexDirection: 'column', marginVertical: 8, padding: 12},
        style,
      ]}>
      <View style={[styles.row, {paddingVertical: 0}]}>
        <SkeletonItem
          style={[
            styles.avatar,
            {width: 50, height: 50, borderRadius: 25, marginLeft: 0},
          ]}
        />
        <SkeletonItem
          style={[
            styles.textLine,
            {width: '20%', alignSelf: 'center', marginLeft: 8},
          ]}
        />
      </View>
      {Array.from({length: quantity}).map((_, index) => (
        <View
          key={index}
          style={[styles.container, {paddingLeft: 0, marginTop: 8}]}>
          <View style={styles.textContainer}>
            <SkeletonItem
              style={[
                styles.textLine,
                {width: '25%', marginHorizontal: 0, marginLeft: 4},
              ]}
            />
            <SkeletonItem
              style={[styles.textLine, {width: '100%', height: 40, marginHorizontal: 4}]}
            />
          </View>
        </View>
      ))}
    </View>
  ) : (
    <></>
  );
};

export default SkeletonLoader;
