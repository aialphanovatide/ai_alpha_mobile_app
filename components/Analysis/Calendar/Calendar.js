import {React, useContext, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import CryptoCalendar from './CryptoCalendar/CryptoCalendar.js';
import BackButton from '../BackButton/BackButton.js';
import SubMenu from './SubMenu/SubMenu.js';
import useCalendarStyles from './CalendarStyles.js';
import {AppThemeContext} from '../../../context/themeContext.js';
import MacroEconomicCalendar from './MacroEconomicsCalendar/MacroEconomicCalendar.js';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay.js';
import {RevenueCatContext} from '../../../context/RevenueCatContext.js';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient.js';

const Intervals = {
  today: {
    textName: 'Today',
    days: 1,
  },
  thisWeek: {
    textName: 'This week',
    days: 7,
  },
};

const Calendar = ({handleReturn}) => {
  // Selected interval: today = 1 (1 day), this week = 7 (7 days).
  const [cryptoSelectedInterval, setCryptoSelectedInterval] = useState(
    Intervals.today,
  );
  const [economicSelectedInterval, setEconomicSelectedInterval] = useState(
    Intervals.today,
  );
  const styles = useCalendarStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  const handleCryptoPress = interval => {
    setCryptoSelectedInterval(interval);
  };

  const handleEconomicEventPress = interval => {
    setEconomicSelectedInterval(interval);
  };
  const {subscribed} = useContext(RevenueCatContext);

  return (
    <SafeAreaView style={styles.flex}>
      <BackgroundGradient />
      <ScrollView
        style={styles.container}
        nestedScrollEnabled={true}
        bounces={false}
        alwaysBounceVertical={false}>
        <BackButton handleReturn={handleReturn} />
        <Text style={styles.title}>Calendar</Text>
        <Text style={styles.sectionDescription}>
          Presents key cryptocurrency events, such as token launches, protocol
          updates and regulatory decisions, serving as an aid to anticipate
          market movements and adjust trading strategies.
        </Text>
        <Text style={styles.subTitle}>Crypto</Text>
        <View style={styles.calendarContent}>
          <SubMenu
            Intervals={Intervals}
            handlePress={handleCryptoPress}
            selectedInterval={cryptoSelectedInterval}
          />
          <CryptoCalendar selectedInterval={cryptoSelectedInterval.days} />
        </View>
        <Text style={styles.subTitle}>Macroeconomics</Text>
        <View style={[styles.calendarContent, styles.marginBottom]}>
          <SubMenu
            Intervals={Intervals}
            handlePress={handleEconomicEventPress}
            selectedInterval={economicSelectedInterval}
          />
          <MacroEconomicCalendar selectedInterval={economicSelectedInterval} />
        </View>
      </ScrollView>
      {subscribed ? <></> : <UpgradeOverlay />}
    </SafeAreaView>
  );
};

export default Calendar;
