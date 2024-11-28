import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  View,
  Modal,
  ScrollView,
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import TickerTape from './Tickertape/TickerTape';
import WhatsHappeningToday from './TopStories/WhatsHappeningToday.js';
import TopTenGainers from './TopTenGainers/TopTenGainers';
import useHomeStyles from './HomeStyles';
import AboutModal from '../AboutModal/AboutModal';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import {useFocusEffect, useScrollToTop} from '@react-navigation/native';
import NarrativeTradings from './HomeNarrativeTradings/MarketNarratives';
import TopTenLosers from './TopTenLosers/TopTenLosers';
import {RevenueCatContext} from '../../context/RevenueCatContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundGradient from '../BackgroundGradient/BackgroundGradient';
import useSubscriptionPopUpStyles from '../SubscriptionPopUps/SubscriptionPopUpStyles';
import {HeaderVisibilityContext} from '../../context/HeadersVisibilityContext';
import {throttle} from 'lodash';
import DailyDeepDives from './Analysis/DailyDeepDives.js';
import {useScreenOrientation} from '../../hooks/useScreenOrientation';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTopStories} from '../../actions/whatsHappeningTodayActions';
import {fetchTop10Movers} from '../../actions/topTenMoversActions';
import {fetchDailyDeepDivesData} from '../../actions/dailyDeepDivesActions';
import {fetchMarketNarratives} from '../../actions/marketNarrativesActions';
import {selectRawUserId} from '../../actions/userActions';

// FreePopup component to render the subscription pop-up that is shown to the user after 3 days of using the app. The user can close the pop-up by clicking on the "Awesome, thanks!" button. The pop-up will not be shown again to the user after they have closed it.

const FreePopup = ({visible, onClose, setVisible}) => {
  const styles = useSubscriptionPopUpStyles();
  const {isDarkMode} = useContext(AppThemeContext);

  // Function to update the signupDateValidator in AsyncStorage to ensure that the user does not see the pop-up again after they have closed it.

  const updateValidator = async () => {
    try {
      await AsyncStorage.setItem('signupDateValidator', 'true');
    } catch (error) {
      console.error('Error updating validator');
    }
  };

  const handleClose = async () => {
    setVisible(false);
    await updateValidator(); // Ensure that updateValidator is called asynchronously
  };

  return (
    <Modal
      style={styles.modal}
      animationType={'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}>
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

// Home component to render the main screen of the app, which includes the ticker tape, top stories, top gainers and top losers sections. It also includes the about modal that can be triggered by the user by clicking on the about button in the top right corner of some of the sections.

const Home = ({route}) => {
  const styles = useHomeStyles();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');
  const [aboutTitle, setAboutTitle] = useState('About');
  const rawUserId = useSelector(selectRawUserId);
  const {packages, purchasePackage, userInfo} = useContext(RevenueCatContext);
  const [subscriptionPopUpsVisible, setSubscriptionPopUpsVisible] =
    useState(false);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    showHeader('TopMenu');
    showHeader('SubMenu');
    showHeader('FundNewsChartsMenu');
  }, []);

  useEffect(() => {
    dispatch(fetchTop10Movers());
    dispatch(fetchTopStories());
    dispatch(fetchDailyDeepDivesData());
    dispatch(fetchMarketNarratives());
  }, [dispatch]);

  useFocusEffect(() => {
    if (isLandscape && isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
    }
  });

  // This useEffect fetches the user's data from the backend using the rawUserId. This is used to check if the user has already seen the subscription pop-up.

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
        console.log("- Successfully retrieved the user's data: ", userData);
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

  // Function to handle the about modal visibility and content based on the section that the user clicked on

  const handleAboutPress = (description = null, title = null) => {
    if (description) {
      setAboutDescription(description);
    }

    if (title) {
      setAboutTitle(title);
    }

    setAboutVisible(!aboutVisible);
  };

  // Function to check if the user has been using the app for more than 3 days and has not seen the subscription pop-up yet. If the user has not seen the pop-up, it will return true, otherwise it will return false.

  const checkForModalDisplay = async () => {
    const signupDateStr = await AsyncStorage.getItem('signupDate');
    const signupDateValidator = await AsyncStorage.getItem(
      'signupDateValidator',
    );
    if (!signupDateStr) return false; // If signup date is not found, this does nothing

    const signupDate = new Date(signupDateStr);
    const currentDate = new Date();

    const diffTime = Math.abs(currentDate - signupDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // This converts milliseconds to days

    if (diffDays < 3) {
      return false;
    } else if (diffDays >= 3 && signupDateValidator == 'false') {
      return true;
    } else {
      return false;
    }
  };

  // Variables and functions to handle the header visibility based on the user's scroll position. The header will be hidden when the user scrolls down and shown when the user scrolls up.

  const {showHeader, hideHeader} = useContext(HeaderVisibilityContext);
  const scrollOffset = useRef(0);
  const scrollViewRef = useRef(null);

  // Function to throttle the scroll event to improve performance and reduce the number of times the function is called.
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

  // Function to handle the scroll event and call the handleScroll function
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
          <WhatsHappeningToday handleAboutPress={handleAboutPress} />
          <DailyDeepDives handleAboutPress={handleAboutPress} />
          <NarrativeTradings handleAboutPress={handleAboutPress} />
          <TopTenGainers handleAboutPress={handleAboutPress} />
          <TopTenLosers handleAboutPress={handleAboutPress} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
