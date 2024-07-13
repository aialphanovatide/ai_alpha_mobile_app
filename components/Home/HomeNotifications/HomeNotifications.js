import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../Analysis/BackButton/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import useHomeNotificationsStyles from './HomeNotificationsStyles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to handle the sorting of the notifications items by the date

const groupAndSortByDate = items => {
  const groupedByDate = {};

  items.forEach(item => {
    if (!groupedByDate[item.date]) {
      groupedByDate[item.date] = [];
    }
    groupedByDate[item.date].push(item);
  });
  const groupedArray = Object.keys(groupedByDate).map(date => ({
    date,
    items: groupedByDate[date],
  }));

  return groupedArray.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/').map(Number);
    const [dayB, monthB, yearB] = b.date.split('/').map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateB - dateA;
  });
};

const homeNotificationsMock = [
  {
    title: 'Bitcoin alert',
    type: 'alerts',
    description: 'Alerts brief description',
    date: '9/07/2024',
    coin: 'btc',
    category: 'bitcoin',
  },
  {
    title: 'Subscribe now and access a 7 days free trial',
    type: 'app',
    description: "Don't miss the chance to try all the app's features.",
    date: '9/07/2024',
    coin: null,
    category: null,
  },
  {
    title: 'Enjoy a 50% discount for the first 3 months!',
    type: 'app',
    description:
      'Subscribe now to the Founders package and automatically enjoy three months at 50% off.',
    date: '10/07/2024',
    coin: null,
    category: null,
  },
  {
    title: 'Dot alert',
    type: 'alerts',
    description: 'Alerts brief description',
    date: '7/07/2024',
    coin: 'dot',
    category: 'rootlink',
  },
  {
    title: 'Analysis title',
    type: 'analysis',
    description: 'Analysis brief description',
    date: '7/07/2024',
    coin: 'ada',
    category: 'baseblock',
  },
];

const NotificationItem = ({imageSource, item, isNew}) => {
  const styles = useHomeNotificationsStyles();
  return (
    <View
      style={[
        styles.notificationItem,
        item.description.length > 80 && {height: 80},
      ]}>
      <View style={styles.imageContainer}>
        {item.type === 'app' ? (
          <Image
            source={require('../../../assets/images/home/alpha_notification_logo.png')}
            style={styles.itemImage}
            resizeMode="contain"
          />
        ) : (
          <FastImage
            source={{
              uri: imageSource,
              cache: FastImage.cacheControl.immutable,
              width: 35,
              height: 35,
            }}
            style={styles.itemImage}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.itemContent}>
        <View style={styles.textRow}>
          <View style={styles.row}>
            <Text style={styles.secondaryText}>{item.type}</Text>
            {isNew && <View style={styles.redDot} />}
          </View>
          <Text style={[styles.secondaryText, {right: 0}]}>{item.date}</Text>
        </View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description.length > 90
            ? `${item.description.slice(0, 75)}...`
            : item.description}
        </Text>
      </View>
    </View>
  );
};

const NotificationsMenu = ({options, selectedOption, changeOption}) => {
  const styles = useHomeNotificationsStyles();
  return (
    <View style={styles.timeFrameContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            selectedOption === option
              ? styles.timeFrameActiveButton
              : styles.timeFrameButton,
            {width: `${100 / options.length}%`},
          ]}
          onPress={() => changeOption(option)}>
          <Text
            style={
              selectedOption === option
                ? styles.timeFrameActiveButtonText
                : styles.timeFrameButtonText
            }>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const HomeNotifications = ({route, navigation}) => {
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [loading, setLoading] = useState(false);
  const options = ['All', 'App', 'Analysis', 'Alerts'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [notificationsData, setNotificationsData] = useState([]);
  const styles = useHomeNotificationsStyles();

  const saveNotifications = async newNotifications => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      const currentNotifications = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];

      const combinedNotifications = [
        ...currentNotifications,
        ...newNotifications,
      ].filter(
        (item, index, self) =>
          index ===
          self.findIndex(t => t.title === item.title && t.date === item.date),
      );

      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(combinedNotifications),
      );
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      const currentNotifications = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];

      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

      const filteredNotifications = currentNotifications.filter(
        notification => {
          const [day, month, year] = notification.date.split('/').map(Number);
          const notificationDate = new Date(year, month - 1, day);
          return notificationDate >= fifteenDaysAgo;
        },
      );
      return filteredNotifications;
    } catch (error) {
      console.error(
        "Error loading notifications from the user's device: ",
        error,
      );
      return [];
    }
  };

  const findAppNotification = (title, type, notifications) => {
    return (
      notifications.find(
        notif => notif.title === title && notif.type === type,
      ) !== undefined
    );
  };

  useEffect(() => {
    const initializeNotifications = async () => {
      setLoading(true);

      const loadedNotifications = await loadNotifications();
      let combinedNotifications = [...loadedNotifications];

      await saveNotifications(combinedNotifications);

      setNotificationsData(groupAndSortByDate(combinedNotifications));
      setLoading(false);
    };

    initializeNotifications();
  }, []);

  if (loading) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
        style={{flex: 1}}>
        <SafeAreaView style={styles.background}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.backButtonWrapper}>
              <BackButton />
            </View>
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.container}>
              <SkeletonLoader type="timeframe" quantity={4} />
              <SkeletonLoader
                style={{marginVertical: 0, paddingTop: 24, paddingVertical: 16}}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const changeSelectedOption = async option => {
    const loadedNotifications = await loadNotifications();
    setSelectedOption(option);
    if (option.toLowerCase() === 'all') {
      setNotificationsData(groupAndSortByDate(loadedNotifications));
      return;
    }
    const filteredItems = loadedNotifications.filter(
      item => item.type.toLowerCase() === option.toLowerCase(),
    );
    setNotificationsData(groupAndSortByDate(filteredItems));
  };

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <SafeAreaView style={styles.mainSection}>
        <View
          style={[{flex: 1, paddingTop: 36}]}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.backButtonWrapper}>
            <BackButton />
          </View>
          <Text style={styles.title}>Notifications</Text>
          <NotificationsMenu
            options={options}
            selectedOption={selectedOption}
            changeOption={changeSelectedOption}
          />
          <ScrollView
            style={styles.container}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            {notificationsData.map(group => {
              return group.items.map((item, index) => {
                const isLastItem =
                  group.items.length === 1 || index === group.items.length - 1;
                const imageSource =
                  item.type === 'alerts'
                    ? `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${item.coin.toLowerCase()}.png`
                    : `https://aialphaicons.s3.us-east-2.amazonaws.com/analysis/${
                        isDarkMode ? 'dark' : 'light'
                      }/${
                        item.category !== null &&
                        item.category.toLowerCase().replace(/\s/g, '') ===
                          'total3'
                          ? 'total3'
                          : item.coin
                      }.png`;
                return (
                  <React.Fragment
                    key={`${item.title}_${item.category}_${index}`}>
                    <NotificationItem
                      imageSource={imageSource}
                      item={item}
                      isNew={true}
                    />
                    {isLastItem && (
                      <View
                        key={`divider_${item.title}_${item.category}_${index}`}
                        style={styles.divider}
                      />
                    )}
                  </React.Fragment>
                );
              });
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeNotifications;
