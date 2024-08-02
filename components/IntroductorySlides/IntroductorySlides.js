import React, {useContext, useState, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import useIntroductorySlidesStyles from './IntroductorySlidesStyles';
import {useNavigation} from '@react-navigation/core';

const IntroductoryCarousel = ({children}) => {
  const {theme} = useContext(AppThemeContext);
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const styles = useIntroductorySlidesStyles();

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(offsetX / theme.width);
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
  mainImageSource,
  content,
  hasButton,
  handleSkip,
}) => {
  const styles = useIntroductorySlidesStyles();
  return (
    <View style={styles.slide}>
      <Image
        source={mainImageSource.source}
        style={[
          styles.mainImage,
          {width: mainImageSource.width, height: mainImageSource.height},
        ]}
        resizeMode="contain"
      />
      <View style={styles.contentContainer}>
        <Text style={[styles.title, id === 1 ? {marginTop: 62} : {}]}>
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
        {hasButton ? (
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
        ) : (
          <>
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
          </>
        )}
      </View>
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
      mainImageSource: {
        source: require('../../assets/images/introductorySection/aialpha-introductory.png'),
        width: 350,
        height: 300,
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
      title: 'Categories & Fundamental Section',
      subtitle: 'We cover all layers.',
      mainImageSource: {
        source: require('../../assets/images/introductorySection/introductory-topmenu.png'),
        width: 350,
        height: 330,
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
      hasButton: false,
    },
    {
      id: 3,
      title: 'AI Alpha \nDiscord Community',
      subtitle: 'Our place.',
      mainImageSource: {
        source: require('../../assets/images/introductorySection/discord-server-example.png'),
        width: 350,
        height: 320,
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
      hasButton: true,
    },
  ];
  const {theme} = useContext(AppThemeContext);
  const navigation = useNavigation();

  const handleSkip = () => {
    navigation.navigate(chosenScreen, {shouldShowPopUps: true});
  };

  return (
    <SafeAreaView
      style={{flex: 1, width: theme.width, backgroundColor: '#171717'}}>
      <View style={styles.sectionContainer}>
        <IntroductoryCarousel>
          {SLIDES_DATA.map(item => (
            <Slide
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              mainImageSource={item.mainImageSource}
              content={item.content}
              hasButton={item.hasButton}
              handleSkip={handleSkip}
            />
          ))}
        </IntroductoryCarousel>
      </View>
    </SafeAreaView>
  );
};

export default IntroductorySlides;
