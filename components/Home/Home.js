import React, {useContext, useState} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import TickerTape from './Tickertape/TickerTape';
import TopStories from './TopStories/topStories';
import Analysis from './Analysis/analysis';
import TopTenGainers from './TopTenGainers/TopTenGainers';
import PriceAction from './PriceAction/PriceAction';
import useHomeStyles from './HomeStyles';
import AboutModal from './Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutModal';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';

const Home = () => {
  const styles = useHomeStyles();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');
  const {isDarkMode} = useContext(AppThemeContext);

  const handleAboutPress = (description = null) => {
    if (description) {
      setAboutDescription(description);
    }
    setAboutVisible(!aboutVisible);
  };

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        {aboutVisible && (
          <AboutModal
            description={aboutDescription}
            onClose={handleAboutPress}
            visible={aboutVisible}
          />
        )}
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={styles.paddingH}>
          <TickerTape />
          <TopStories handleAboutPress={handleAboutPress} />
          <Analysis handleAboutPress={handleAboutPress} />
          <TopTenGainers handleAboutPress={handleAboutPress} />
          <PriceAction handleAboutPress={handleAboutPress} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
