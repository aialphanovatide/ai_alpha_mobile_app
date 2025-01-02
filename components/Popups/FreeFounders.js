import React, {useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import useFreeFoundersStyles from './FreeFoundersStyles';

// Carousel slides data
const slidesData = [
  {
    darkImage: require('../../assets/images/popUps/carousel1.png'),
    lightImage: require('../../assets/images/popUps/carousel1Light.png'),
    title: 'All the info, anytime',
    description:
      'Explore articles, charts, analysis, and curated news. All updated in real-time.',
  },
  {
    darkImage: require('../../assets/images/popUps/carousel2.png'),
    lightImage: require('../../assets/images/popUps/carousel2Light.png'),
    title: 'Track your favorites',
    description:
      'Customize watchlists and get instant updates on the coins you care about most.',
  },
  {
    darkImage: require('../../assets/images/popUps/carousel3.png'),
    lightImage: require('../../assets/images/popUps/carousel3Light.png'),
    title: 'Stay in the know',
    description:
      'Receive curated articles and real-time alerts for market moves and important news.',
  },
  {
    darkImage: require('../../assets/images/popUps/carousel4.png'),
    lightImage: require('../../assets/images/popUps/carousel4Light.png'),
    title: 'Uncover key insights',
    description:
      'Access in-depth analysis and expert breakdowns that help you understand trends and make better decisions.',
  },
  {
    darkImage: require('../../assets/images/popUps/carousel5.png'),
    lightImage: require('../../assets/images/popUps/carousel5Light.png'),
    title: 'AI Tools Coming Soon',
    description:
      'New AI tools are coming to boost your analysis and decisions.',
  },
];

const windowWidth = Dimensions.get('window').width;

const FreeFounders = ({onDismiss}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useFreeFoundersStyles();

  // Track current slide in the ScrollView
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = event => {
    const offsetX = event.nativeEvent?.contentOffset?.x || 0;
    const index = Math.round(offsetX / windowWidth);
    setCurrentSlideIndex(index);
  };

  return (
    <View style={styles.modalContainer}>
      {/* Rocket image as background */}
      <ImageBackground
        source={
          isDarkMode
            ? require('../../assets/images/popUps/discount-rocket-dark-v2.png')
            : require('../../assets/images/popUps/discount-rocket.png')
        }
        style={styles.imageBackground}
        resizeMode="contain">
        {/* Main “card” content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Become a Founder</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.strikethroughPrice}>$149 / year</Text>
            <Text style={styles.freeText}>Completely Free!</Text>
            <Text style={styles.untilText}>Until 1 January 2026</Text>
          </View>

          {/* Carousel section */}
          <View style={styles.carouselContainer}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}>
              {slidesData.map((slide, index) => {
                // For zero-based indexing: 2nd slide = index 1, 4th slide = index 3
                const isRightSideImage = index === 1 || index === 3;

                return (
                  <View
                    key={`slide-${index}`}
                    style={{width: windowWidth, alignItems: 'center'}}>
                    <View
                      style={[
                        styles.slideContent,
                        isRightSideImage && {flexDirection: 'row-reverse'},
                      ]}>
                      <Image
                        source={isDarkMode ? slide.darkImage : slide.lightImage}
                        style={styles.phoneImage}
                      />
                      <View style={styles.featureTextContainer}>
                        <Text style={styles.featureTitle}>{slide.title}</Text>
                        <Text style={styles.featureSubtitle}>
                          {slide.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            {/* Pagination Dots */}
            <View style={styles.paginationDots}>
              {slidesData.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === currentSlideIndex && styles.dotActive,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.8}
            onPress={onDismiss}>
            <LinearGradient
              colors={['#F9AF08', '#FC5404', '#FC5404']}
              style={styles.ctaGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.ctaButtonText}>Start Now for Free</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            We’ll remind you before your trial ends.{'\n'}Cancel anytime.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default FreeFounders;
