import React, {useMemo, useState} from 'react';
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
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import {useSelector} from 'react-redux';
import {
  selectFilteredNotificationsByType,
  selectNotificationsItemsLoading,
} from '../../../actions/notificationActions';

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
  const loading = useSelector(selectNotificationsItemsLoading);
  const options = ['All', 'App', 'Analysis', 'Alerts'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const styles = useHomeNotificationsStyles();
  const notificationsData = useSelector(selectFilteredNotificationsByType);
  const [filteredNotifications, setFilteredNotifications] =
    useState(notificationsData);

  if (loading === 'idle') {
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

  const changeSelectedOption = option => {
    setSelectedOption(option);
    const filteredItems = notificationsData.filter(item => {
      return option === 'All' ? true : item.type === option;
    });
    setFilteredNotifications(filteredItems);
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
          {filteredNotifications?.length > 0 ? (
            filteredNotifications.map(group => {
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
                        style={[
                          styles.divider,
                          {
                            marginBottom: 8,
                            marginTop: item.title.length > 50 ? 24 : 8,
                          },
                        ]}
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
