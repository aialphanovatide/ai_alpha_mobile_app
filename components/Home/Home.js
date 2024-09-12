import React, {useContext, useState, useRef, useEffect} from 'react';
import {View, Modal, ScrollView, SafeAreaView, Text, Button} from 'react-native';
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


const FreePopup = ({ visible, onClose }) => {
  const handleClose = async () => {
    await AsyncStorage.setItem('signupDateValidator', 'true');
    const signupDateValidatorv2 = await AsyncStorage.getItem('signupDateValidator');
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>Three days have already passed since you signed up into the app!</Text>
          <Button title="Close" onPress={handleClose} />
        </View>
      </View>
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


  const ref = useRef(null);

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
  /*
  useEffect(() => {
    const showReminderModal = async () => {
      const shouldShowModal = await checkForModalDisplay();
      if (shouldShowModal) {
        setModalVisible(true);
      }
    };

    showReminderModal();
  }, []);
  */
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
    const signupDateValidator = await AsyncStorage.getItem('signupDateValidator');

    console.log('SIGNUP DATE FROM ASYNC STORAGE', signupDateStr);
    if (!signupDateStr) return false; // If signup date is not found, this does nothing
  
    const signupDate = new Date(signupDateStr);
    const currentDate = new Date();
    
    const diffTime = Math.abs(currentDate - signupDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // This converts milliseconds to days

    console.log("Validator: ", signupDateValidator);

    if (diffDays < 3) {
      return false;
    } else if(diffDays >= 3 && signupDateValidator !== 'true') {
      return true;
    }
  };
  

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.22, 0.97]}
      style={styles.flex}>
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
          ref={ref}>
          <FreePopup visible={modalVisible} onClose={() => setModalVisible(false)} />
          <TickerTape />
          <TopStories handleAboutPress={handleAboutPress} />
          <Analysis handleAboutPress={handleAboutPress} />
          <NarrativeTradings handleAboutPress={handleAboutPress} />
          <TopTenGainers handleAboutPress={handleAboutPress} />
          <TopTenLosers handleAboutPress={handleAboutPress} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
