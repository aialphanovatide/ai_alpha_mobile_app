import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import useIntroductorySlidesStyles from './IntroductorySlidesStyles';
import {useNavigation} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

const IntroductoryCarousel = ({children, toggleActiveSlide}) => {
  const {theme} = useContext(AppThemeContext);
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const styles = useIntroductorySlidesStyles();

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(offsetX / theme.width);
    toggleActiveSlide(newPage + 1);
    setCurrentPage(newPage);
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        style={styles.carouselScrollView}>
        {children}
      </ScrollView>
      <View style={styles.pagination}>
        {React.Children.map(children, (child, index) => (
          <View
            key={index}
            style={[styles.dot, currentPage === index ? styles.activeDot : {}]}
          />
        ))}
      </View>
    </View>
  );
};

const IntroductoryItem = ({imageSource, information}) => {
  const styles = useIntroductorySlidesStyles();
  return (
    <View style={styles.informationItem}>
      <Image
        source={imageSource}
        style={styles.informationIcon}
        resizeMode="contain"
      />
      <Text style={styles.informationText}>{information}</Text>
    </View>
  );
};

const Slide = ({
  id,
  title,
  subtitle,
  images,
  content,
  hasButton,
  handleSkip,
  activeSlide,
  video,
}) => {
  const styles = useIntroductorySlidesStyles();
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (activeSlide === 3) {
      setTimeout(() => {
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 2000);
    }
  }, [activeSlide]);

  return (
    <View style={styles.slide}>
      {video ? (
        <View
          style={[
            {
              width: video.style.width,
              height: video.style.height,
              backgroundColor: 'transparent',
            },
          ]}>
          <Video
            source={{uri: video.source}}
            style={[styles.mainImage, {width: '100%', height: '100%'}]}
            muted={true}
            repeat={true}
            shutterColor="transparent"
            resizeMode="contain"
            paused={activeSlide !== id}
            onLoad={() =>
              console.log('Loaded video from slide number: ', activeSlide)
            }
            onError={e => console.error('Video error', e)}
          />
        </View>
      ) : images.length === 1 ? (
        <FastImage
          style={[styles.mainImage, images[0].style]}
          source={images[0].source}
          resizeMode={FastImage.resizeMode.contain}
          loop={true}
        />
      ) : (
        <View style={styles.imagesContainer}>
          <FastImage
            style={[styles.mainImage, images[0].style]}
            source={images[0].source}
            resizeMode={FastImage.resizeMode.contain}
            loop={true}
          />
          <FastImage
            style={[styles.secondaryImage, images[1].style]}
            source={images[1].source}
            resizeMode={FastImage.resizeMode.contain}
            loop={true}
          />
        </View>
      )}
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.title,
            id === 1 ? {marginTop: 62} : {},
            id === 3 ? {marginTop: -28} : {},
          ]}>
          {title}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.items}>
          {content.length > 0 ? (
            content.map((itemContent, index) => {
              return (
                <IntroductoryItem
                  key={index}
                  imageSource={itemContent.image}
                  information={itemContent.information}
                />
              );
            })
          ) : (
            <></>
          )}
        </View>
      </View>

      {hasButton ? (
        <Animated.View style={[styles.skipContainer, {opacity: buttonOpacity}]}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => handleSkip()}>
            <LinearGradient
              useAngle
              angle={90}
              colors={['#F9AF08', '#FC5B04']}
              locations={[0, 0.5]}
              style={styles.exploreButton}>
              <Text style={styles.buttonText}>Explore the app</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={styles.skipContainer}>
          <Text
            style={[
              styles.boldInformativeText,
              id === 1 ? {marginTop: 94} : {},
            ]}>
            Swipe to get started!
          </Text>
          <Text style={styles.skipButton} onPress={() => handleSkip()}>
            Skip
          </Text>
        </View>
      )}
    </View>
  );
};

const IntroductorySlides = ({route}) => {
  const chosenScreen = route.params.chosenScreen;
  const styles = useIntroductorySlidesStyles();
  const SLIDES_DATA = [
    {
      id: 1,
      title: 'Welcome to AI Alpha',
      subtitle: 'Welcome!',
      images: [
        {
          source: require('../../assets/images/introductorySection/slide1anim.gif'),
          style: {width: 350, height: 300},
        },
      ],
      video: {
        source: require('../../assets/images/introductorySection/Slide1b.mp4'),
        style: {width: 350, height: 300},
      },
      content: [
        {
          information:
            'We’re building AI ALPHA to inform you with unbiased, curated crypto tools that empower your critical thinking. ',
          image: require('../../assets/images/introductorySection/brainlogo.png'),
        },
        {
          information:
            'There is no third-party influence, just clarity, an AI-driven framework, and genuine people. ',
          image: require('../../assets/images/introductorySection/star.png'),
        },
      ],
      hasButton: false,
    },
    {
      id: 2,
      title: 'Categories & \nFundamental Section',
      subtitle: 'We cover all layers.',
      images: [
        {
          source: require('../../assets/images/introductorySection/top-menu-background.png'),
          style: {width: 350, height: 330},
        },
        {
          source: require('../../assets/images/introductorySection/only_topmenu.gif'),
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: 420,
            height: 330,
          },
        },
      ],
      video: null,
      // {
      //   source: require('../../assets/images/introductorySection/Slide2-v2.mp4'),
      //   style: {width: 350, height: 330},
      // },
      content: [
        {
          information:
            "Beyond the primary layers, we've grouped crypto projects into specific categories, similar to stock market sectors. ",
          image: require('../../assets/images/introductorySection/categorieslogo.png'),
        },
        {
          information:
            'Each category contains three assets, making comparing projects within each group easy. This logic helps you identify the strongest performers and make informed decisions. ',
          image: require('../../assets/images/introductorySection/layers.png'),
        },
      ],
      hasButton: false,
    },
    {
      id: 3,
      title: 'AI Alpha \nDiscord Community',
      subtitle: 'Our place.',
      images: [
        {
          source: require('../../assets/images/introductorySection/discord-server-example.png'),
          style: {width: 400, height: 360},
        },
      ],
      video: null,
      content: [],
      hasButton: true,
    },
  ];
  const {theme} = useContext(AppThemeContext);
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(1);

  const toggleActiveSlide = value => {
    setActiveSlide(value);
  };

  const handleSkip = () => {
    navigation.navigate(chosenScreen, {shouldShowPopUps: true});
  };

  return (
    <SafeAreaView
      style={{flex: 1, width: theme.width, backgroundColor: '#000000'}}>
      <View style={styles.sectionContainer}>
        <IntroductoryCarousel toggleActiveSlide={toggleActiveSlide}>
          {SLIDES_DATA.map(item => (
            <Slide
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              images={item.images}
              content={item.content}
              hasButton={item.hasButton}
              handleSkip={handleSkip}
              activeSlide={activeSlide}
              video={item.video}
            />
          ))}
        </IntroductoryCarousel>
      </View>
    </SafeAreaView>
  );
};

export default IntroductorySlides;
