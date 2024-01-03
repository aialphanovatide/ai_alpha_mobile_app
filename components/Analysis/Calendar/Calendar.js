import {React, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import CryptoCalendar from './CryptoCalendar/CryptoCalendar.js';
import TVEconomicCalendar from './MacroEconomicsCalendar/TVEconomicCalendar.js';
import BackButton from '../BackButton/BackButton.js';
import SubMenu from './SubMenu/SubMenu.js';
import useCalendarStyles from './CalendarStyles.js';

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

  const handleCryptoPress = interval => {
    setCryptoSelectedInterval(interval);
  };

  return (
    <View style={styles.container}>
      <BackButton handleReturn={handleReturn} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Calendar</Text>
      </View>
      <View style={styles.calendarContent}>
        <Text style={styles.subTitle}>Crypto</Text>
        <SubMenu
          Intervals={Intervals}
          handlePress={handleCryptoPress}
          selectedInterval={cryptoSelectedInterval}
        />
        <CryptoCalendar selectedInterval={cryptoSelectedInterval.days} />
      </View>
      <View style={styles.calendarContent}>
        <Text style={styles.subTitle}>Macroeconomics</Text>
        {/* <ScrollView nestedScrollEnabled={true}> */}
        <TVEconomicCalendar
          selectedInterval={economicSelectedInterval}
          width={400}
          height={400}
        />
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

export default Calendar;
