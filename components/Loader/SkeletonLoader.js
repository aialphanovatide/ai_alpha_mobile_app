import React, {useContext, useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
import useLoaderStyles from './LoaderStyles';

// Component that renders a skeleton item for the skeleton loader. It uses an Animated.View to create a pulse effect, and it receives a style prop to customize the skeleton item.

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

// Component to render a Skeleton container, which allows to contain another SkeletonItem components on it and also be animated

const SkeletonContainer = ({style, children}) => {
  const {theme} = useContext(AppThemeContext);
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
      ]}>
      {children}
    </Animated.View>
  );
};

// Component that renders a skeleton loader. It receives a style prop to customize the loader, a type prop to define the type of skeleton loader to render, and a quantity prop to define the number of skeleton items to render. The component uses the SkeletonItem component to render the skeleton items, and there are different types of skeleton loaders available: item, news, circle, alerts, chart, text, bigItem, circleChart, timeline, dapps, competitors, selector, menu, calendar, search, fundingRates, timeframe, speedometer, and askAi, depending on the section where the skeleton loader is used.

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
  ) : type === 'news' ? (
    Array.from({length: quantity}).map((_, index) => (
      <View
        key={index}
        style={[
          styles.container,
          style,
          {width: 360, justifyContent: 'center', marginVertical: 8},
        ]}>
        <View style={styles.textContainer}>
          <SkeletonItem style={[styles.textLine, {width: '75%'}]} />
          <SkeletonItem style={[styles.textLine, {width: '75%'}]} />
        </View>
        <SkeletonItem
          style={[
            styles.square,
            {
              width: 60,
              height: 60,
              borderRadius: 3,
              paddingLeft: 0,
              marginRight: 24,
            },
          ]}
        />
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
        <SkeletonItem
          style={[
            {
              width: '25%',
              marginVertical: 4,
              marginHorizontal: 14,
              backgroundColor: 'transparent',
            },
          ]}
        />
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
              style={[
                styles.textLine,
                {width: '100%', height: 40, marginHorizontal: 4},
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  ) : type === 'cards' ? (
    Array.from({length: quantity}).map((_, index) => (
      <SkeletonContainer key={index} style={[styles.deepDiveCard, style]}>
        <SkeletonItem style={styles.cardImage} />
        <View style={styles.cardContent}>
          <SkeletonItem style={styles.cardTitle} />
          <SkeletonItem style={styles.date} />
        </View>
      </SkeletonContainer>
    ))
  ) : type === 'stories' ? (
    <View style={[style, {padding: 10}]}>
      <SkeletonContainer style={styles.headerContainer}>
        <SkeletonItem style={styles.headerImage} />
        <View style={styles.headerContent}>
          <SkeletonItem style={styles.headerTitle} />
          <SkeletonItem style={styles.newsDate} />
        </View>
      </SkeletonContainer>
      {Array.from({length: quantity}).map((_, index) => (
        <View key={index}>
          <SkeletonContainer style={[styles.newsItem]}>
            <SkeletonItem style={styles.thumbnail} />
            <View style={styles.newsContent}>
              <SkeletonItem style={styles.newsTitle} />
              <SkeletonItem style={styles.newsDate} />
            </View>
          </SkeletonContainer>
        </View>
      ))}
    </View>
  ) : type === 'macro' ? (
    <View>
      <View style={styles.row}>
        {Array.from({length: quantity / 2}).map((_, index) => (
          <SkeletonContainer key={index} style={[styles.macroCard, style]}>
            <SkeletonItem style={styles.macroCardImage} />
            <View style={styles.cardContent}>
              <SkeletonItem style={[styles.cardTitle, {height: 14}]} />
              <SkeletonItem style={[styles.date, {height: 10}]} />
            </View>
          </SkeletonContainer>
        ))}
      </View>
      <View style={styles.row}>
        {Array.from({length: quantity / 2}).map((_, index) => (
          <SkeletonContainer key={index} style={[styles.macroCard, style]}>
            <SkeletonItem style={styles.macroCardImage} />
            <View style={styles.cardContent}>
              <SkeletonItem style={[styles.cardTitle, {height: 14}]} />
              <SkeletonItem style={[styles.date, {height: 10}]} />
            </View>
          </SkeletonContainer>
        ))}
      </View>
    </View>
  ) : type === 'spotlight' ? (
    <View style={[style, {padding: 10}]}>
      <SkeletonContainer style={styles.headerContainer}>
        <SkeletonItem style={styles.headerImage} />
        <View style={styles.headerContent}>
          <SkeletonItem style={styles.headerTitle} />
          <SkeletonItem style={styles.newsDate} />
        </View>
      </SkeletonContainer>
    </View>
  ) : (
    <></>
  );
};

export default SkeletonLoader;
