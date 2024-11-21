import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../BackButton/BackButton';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import useHomeNotificationsStyles from './HomeNotificationsStyles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';

// Function to handle the sorting of the notifications items by the date. It groups the items by date and returns them sorted in descending order.

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
    items: groupedByDate[date].reverse(),
  }));

  return groupedArray.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/').map(Number);
    const [dayB, monthB, yearB] = b.date.split('/').map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateB - dateA;
  });
};

// NotificationItem component to display the notification item. It receives the imageSource, item and isNew props. The imageSource is the source of the image to be displayed in the notification item. The item prop contains the information of the notification item. The isNew prop is a boolean that indicates if the notification is new. The component returns a View with the notification item content.

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

// Component to display the notifications menu. It receives the options, selectedOption and changeOption props. The options prop is an array with the options to be displayed in the menu. The selectedOption prop is the selected option. The changeOption prop is a function to change the selected option. The component returns a View with the notifications menu content.

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

// Component to display the notifications section. It receives the route and navigation props. The route prop contains the route information. The navigation prop is used to navigate between screens. The component returns a SafeAreaView with the notifications section content. It displays the notifications menu and the notifications items.

const HomeNotifications = ({route, navigation}) => {
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
      <SafeAreaView style={styles.background}>
        <BackgroundGradient />
        <ScrollView style={{flex: 1, paddingTop: 22}}>
          <BackButton />
          <Text style={styles.title}>Notifications</Text>
          <View style={styles.container}>
            <SkeletonLoader type="timeframe" quantity={4} />
            <SkeletonLoader
              style={{marginVertical: 0, paddingTop: 24, paddingVertical: 16}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
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

  // Function to handle the back button navigation when the section is acceeded through the alerts tab

  const handleBackNavigation = () => {
    navigation.navigate('Home', {screen: 'InitialHome'});
  };

  return (
    <SafeAreaView style={styles.mainSection}>
      <BackgroundGradient />
      <View
        style={[{flex: 1, paddingTop: 22}]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <BackButton navigationHandler={handleBackNavigation} />
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
          {notificationsData?.length > 0 ? (
            notificationsData.map(group => {
              return group.items.map((item, index) => {
                const isLastItem =
                  group.items.length === 1 || index === group.items.length - 1;
                const imageSource = `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${item.coin.toLowerCase()}.png`;
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
            })
          ) : (
            <NoContentDisclaimer
              title={"Looks like it's quiet here."}
              description={
                'Notifications will pop up as you interact with the app.'
              }
              type="notifications"
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeNotifications;
