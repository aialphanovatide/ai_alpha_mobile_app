import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Linking,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import useIntroductorySlidesStyles from './IntroductorySlidesStyles';
import {useNavigation} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

// IntroductoryCarousel component that renders the carousel that contains the introductory slides. The component receives the children components that represent the slides, and it also receives a function to handle the change of the active slide when the user scrolls through the slides.

const IntroductoryCarousel = ({children, toggleActiveSlide}) => {
  const {theme} = useContext(AppThemeContext);
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const styles = useIntroductorySlidesStyles();

  // Function to handle the scroll event when the user scrolls through the slides. It calculates the current page based on the scroll offset and the width of the screen, and it calls the function to change the active slide.

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

// Component that renders the information of each introductory slide. The component receives the image and the information to be displayed in each slide as props.

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

// Slide component that renders the content of each introductory slide. The component receives the information to be displayed in each slide as props, and it also receives a function to handle the navigation to the next screen when the user decides to skip the slides.

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
  hasRedirect,
}) => {
  const styles = useIntroductorySlidesStyles();
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // Detect the device's screen size to adjust the images and videos accordingly.

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // This useEffect is used to animate the button that redirects to the app on the last slide.

  useEffect(() => {
    if (activeSlide === 2) {
      setTimeout(() => {
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 1250);
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
              maxHeight:
                screenHeight > 800 && id === 1
                  ? screenHeight * 0.45
                  : screenHeight * 0.375,
              maxWidth: screenWidth * 0.9,
              backgroundColor: 'transparent',
            },
          ]}>
          <Video
            source={{uri: video.source}}
            style={[
              styles.mainImage,
              {width: '100%', height: '100%', marginHorizontal: 0},
            ]}
            muted={true}
            repeat={true}
            shutterColor="transparent"
            resizeMode="contain"
            paused={activeSlide !== id}
            onError={e => console.error('Video error', e)}
          />
        </View>
      ) : images.length === 1 ? (
        hasRedirect ? (
          <FastImage
            style={[styles.mainImage, images[0].style]}
            source={images[0].source}
            resizeMode={FastImage.resizeMode.contain}
            loop={true}
          />
        ) : (
          <FastImage
            style={[styles.mainImage, images[0].style]}
            source={images[0].source}
            resizeMode={FastImage.resizeMode.contain}
            loop={true}
          />
        )
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
      <View style={[styles.contentContainer]}>
        <Text
          style={[
            styles.title,
            id === 1 ? {marginTop: 26} : {},
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

// Component that renders the introductory slides and handles the navigation to the chosen screen after the slides are finished, or the user decides to skip them. The slides are defined by an array of objects that contain the information to be displayed in each slide.

const IntroductorySlides = ({route}) => {
  const chosenScreen = route?.params?.chosenScreen || 'SignIn';
  const styles = useIntroductorySlidesStyles();

  // Slides static data
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
        source: require('../../assets/images/introductorySection/Slide1HighBR.mp4'),
        style: {width: 380, height: 330},
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
      hasRedirect: false,
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
            width: 350,
            height: 330,
          },
        },
      ],
      video: {
        source: require('../../assets/images/introductorySection/Slide2HighBR.mp4'),
        style: {width: 350, height: 330},
      },
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
      hasButton: true, // Display the "Explore the App" button here
      hasRedirect: false,
    },
  ];

  const {theme} = useContext(AppThemeContext);
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(1);

  // Function to handle the change of the active slide when the user scrolls through the slides.
  const toggleActiveSlide = value => {
    setActiveSlide(value);
  };

  // Function to handle the navigation to the chosen screen after the slides are finished, or the user decides to skip them.
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
              hasRedirect={item.hasRedirect}
            />
          ))}
        </IntroductoryCarousel>
      </View>
    </SafeAreaView>
  );
};

export default IntroductorySlides;
