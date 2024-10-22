import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  View,
  Modal,
  ScrollView,
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  Button,
} from 'react-native';
import TickerTape from './Tickertape/TickerTape';
import TopStories from './TopStories/topStories';
import Analysis from './Analysis/analysis';
import TopTenGainers from './TopTenGainers/TopTenGainers';
import useHomeStyles from './HomeStyles';
import AboutModal from './Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutModal';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import {useScrollToTop} from '@react-navigation/native';
import NarrativeTradings from './HomeNarrativeTradings/NarrativeTradings';
import TopTenLosers from './Top10Losers/TopTenLosers';
import {useRawUserId} from '../../context/RawUserIdContext';
import {RevenueCatContext} from '../../context/RevenueCatContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundGradient from '../BackgroundGradient/BackgroundGradient';
import SubscriptionPopUp from '../SubscriptionPopUps/SubscriptionPopUp';
import useSubscriptionPopUpStyles from '../SubscriptionPopUps/SubscriptionPopUpStyles';
import {HeaderVisibilityContext} from '../../context/HeadersVisibilityContext';
import {throttle} from 'lodash';

const FreePopup = ({visible, onClose, setVisible}) => {
  const styles = useSubscriptionPopUpStyles();
  const {isDarkMode} = useContext(AppThemeContext);

  const updateValidator = async () => {
    console.log('Updating validator...');
    try {
      console.log('Validator updated to TRUE');
      await AsyncStorage.setItem('signupDateValidator', 'true');
    } catch (error) {
      console.error('Error updating validator');
    }
  };

  const handleClose = async () => {
    setVisible(false);
    console.log('Closing modal');
    await updateValidator(); // Ensure that updateValidator is called asynchronously
  };

  return (
    <Modal
      style={styles.modal}
      animationType={'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}>
      {/* <BlurView
        style={styles.absolute}
        blurType={isDarkMode ? 'dark' : 'light'}
        blurAmount={1.75}
        blurRadius={1}
      /> */}
      <LinearGradient
        style={styles.absolute}
        colors={
          isDarkMode ? ['#0B0B0B38', '#0B0B0B'] : ['#FFFFFF38', '#FFFFFF']
        }
        locations={[0.38, 0.97]}
      />
      <ImageBackground
        source={
          isDarkMode
            ? require('../../assets/images/popUps/discount-rocket-dark.png')
            : require('../../assets/images/popUps/discount-rocket.png')
        }
        style={[styles.imageContainer]}
        resizeMode="contain">
        <Text style={styles.subtitle}>
          {`Are you enjoying the app? As a thank you,`}
        </Text>
        <Text style={styles.mainTitle}>Enjoy 50% OFF</Text>
        <Text style={[styles.mainTitle, styles.secondaryTitle]}>
          on your first three months!
        </Text>
        <Text style={styles.graySecondaryText}>
          No need to do anything-it's already set up for you!
        </Text>
        <TouchableOpacity style={{width: '100%'}} onPress={handleClose}>
          <LinearGradient
            useAngle
            angle={90}
            colors={['#F9AF08', '#FC5B04']}
            locations={[0, 0.5]}
            style={styles.button}>
            <Text style={styles.buttonText}>Awesome, thanks!</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </Modal>
  );
};

const Home = ({route}) => {
  const styles = useHomeStyles();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');
  const [aboutTitle, setAboutTitle] = useState('About');
  const {isDarkMode} = useContext(AppThemeContext);
  const {rawUserId} = useRawUserId();
  const {packages, purchasePackage, userInfo} = useContext(RevenueCatContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [subscriptionPopUpsVisible, setSubscriptionPopUpsVisible] =
    useState(false);

  const ref = useRef(null);

  useEffect(() => {
    showHeader('TopMenu');
    showHeader('SubMenu');
    showHeader('FundNewsChartsMenu');
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const url = `https://aialpha.ngrok.io/user?auth0id=${rawUserId}`;
      try {
        const userFetch = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const userData = await userFetch.json();
        console.log('USER DATA IN HOME', userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // This triggers a function to show a modal-popup
  useEffect(() => {
    const showReminderModal = async () => {
      const shouldShowModal = await checkForModalDisplay();
      if (shouldShowModal) {
        setSubscriptionPopUpsVisible(true);
      }
    };

    showReminderModal();
  }, []);

  useScrollToTop(ref);

  const handleAboutPress = (description = null, title = null) => {
    if (description) {
      setAboutDescription(description);
    }

    if (title) {
      setAboutTitle(title);
    }

    setAboutVisible(!aboutVisible);
  };

  const checkForModalDisplay = async () => {
    const signupDateStr = await AsyncStorage.getItem('signupDate');
    //console.log('SIGNUP DATE FROM ASYNC STORAGE', signupDateStr);
    const signupDateValidator = await AsyncStorage.getItem(
      'signupDateValidator',
    );
    console.log('SIGNUP DATE VALIDATOR', signupDateValidator);

    if (!signupDateStr) return false; // If signup date is not found, this does nothing

    const signupDate = new Date(signupDateStr);
    const currentDate = new Date();

    const diffTime = Math.abs(currentDate - signupDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // This converts milliseconds to days

    console.log('Diff days: ', diffDays);
    console.log('Validator: ', signupDateValidator);

    if (diffDays < 3) {
      console.log('Less than 3 days');
      return false;
    } else if (diffDays >= 3 && signupDateValidator == 'false') {
      console.log('Equal or greater than 3 days');
      return true;
    } else {
      console.log('None of the above');
      return false;
    }
  };

  // Functions to handle the scrolling interaction that hides the menu

  const {showHeader, hideHeader} = useContext(HeaderVisibilityContext);
  const scrollOffset = useRef(0);
  const scrollViewRef = useRef(null);

  const handleScroll = throttle(event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;

    if (diff > 5 && currentOffset > 100) {
      hideHeader('TopMenu');
    } else if (diff < -5) {
      showHeader('TopMenu');
    }

    scrollOffset.current = currentOffset;
  }, 350);

  const onScroll = event => {
    event.persist();
    handleScroll(event);
  };

  return (
    <View style={styles.flex}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        {aboutVisible && (
          <AboutModal
            description={aboutDescription}
            onClose={handleAboutPress}
            visible={aboutVisible}
            title={aboutTitle}
          />
        )}
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={[styles.paddingH, styles.paddingB]}
          ref={scrollViewRef}
          onScroll={onScroll}
          scrollEventThrottle={16}>
          <FreePopup
            visible={subscriptionPopUpsVisible}
            setVisible={setSubscriptionPopUpsVisible}
          />
          <TickerTape />
          <TopStories handleAboutPress={handleAboutPress} />
          <Analysis handleAboutPress={handleAboutPress} />
          <NarrativeTradings handleAboutPress={handleAboutPress} />
          <TopTenGainers handleAboutPress={handleAboutPress} />
          <TopTenLosers handleAboutPress={handleAboutPress} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
