import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../BackButton/BackButton';
import {AppThemeContext} from '../../../context/themeContext';
import useNewNotificationsStyles from './NewNotificationsStyles';
import {NOTIFICATIONS_MOCK} from '../../../assets/static_data/notificationsMock';

const INITIAL_OPTIONS = [
  {
    name: 'News',
    topic_tag: 'news',
    isActive: true,
  },
  {
    name: 'Alerts',
    topic_tag: 'alerts',
    isActive: true,
  },
  {
    name: 'S&R Lines',
    topic_tag: 'sr_lines',
    isActive: true,
  },
  {
    name: 'Fundamentals',
    topic_tag: 'fundamentals',
    isActive: true,
  },
];

const founders_static_identifiers = [
  'baseblock_4999_m1',
  'bitcoin_4999_m1',
  'boostlayer_4999_m1',
  'corechain_4999_m1',
  'cycleswap_4999_m1',
  'diversefi_4999_m1',
  'ethereum_4999_m1',
  'intellichain_4999_m1',
  'lsds_4999_m1',
  'nextrade_4999_m1',
  'rootlink_4999_m1',
  'truthnodes_4999_m1',
  'xpayments_4999_m1',
];

const SwitchOption = ({
  styles,
  name,
  handleToggle,
  isActive,
  isLastOption = false,
}) => {
  const {theme} = useContext(AppThemeContext);
  return (
    <View style={styles.switchRow}>
      <View
        style={{
          flexDirection: 'row',
          position: 'relative',
          paddingVertical: 6,
        }}>
        <Text style={styles.optionTitle}>{name}</Text>
        <View
          style={[styles.switchContainer, {position: 'absolute', right: 0}]}>
          <Switch
            style={styles.switch}
            trackColor={{true: '#52DD8D', false: '#D9D9D9'}}
            ios_backgroundColor={theme.notificationsSwitchColor}
            thumbColor={'#F6F7FB'}
            value={isActive}
            onValueChange={handleToggle}
          />
        </View>
      </View>
      {isLastOption ? <></> : <View style={styles.horizontalLine} />}
    </View>
  );
};

const NotificationsTimeFilter = ({
  intervals,
  handleIntervalChange,
  activeIntervals,
}) => {
  const styles = useNewNotificationsStyles();

  return (
    <View style={styles.timeIntervalContainer}>
      {intervals.map((interval, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleIntervalChange(interval)}
            style={[
              styles.timeIntervalItem,
              activeIntervals.some(item => item === interval) &&
                styles.activeTimeIntervalItem,
            ]}>
            <Text
              style={[
                styles.timeIntervalNumber,
                activeIntervals.some(item => item === interval) &&
                  styles.activeTimeIntervalNumber,
              ]}>
              {interval}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const NotificationItem = ({
  item,
  styles,
  isActive,
  hasImage,
  optionsPerCoin = INITIAL_OPTIONS,
}) => {
  const [expanded, setExpanded] = useState(false);
  const {isDarkMode} = useContext(AppThemeContext);
  return expanded ? (
    <View style={styles.expandedItem}>
      <View
        style={[
          styles.row,
          {
            marginVertical: 0,
            marginBottom: 0,
            alignItems: 'center',
            justifyContent: 'flex-start',
          },
        ]}>
        {hasImage && (
          <Image
            style={styles.iconImage}
            resizeMode="contain"
            source={
              isDarkMode
                ? item.iconImage.dark.active
                : item.iconImage.light.active
            }
          />
        )}
        <Text style={styles.itemName}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.arrowContainer}>
          <Image
            source={
              expanded
                ? require('../../../assets/images/arrow-up.png')
                : require('../../../assets/images/arrow-down.png')
            }
            style={styles.arrow}
            resizeMode="contain"
            fadeDuration={0}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        {optionsPerCoin.map((option, index) => {
          return (
            <SwitchOption
              styles={styles}
              key={option.name}
              name={option.name}
              handleToggle={() => console.log('Status: ', option.isActive)}
              isActive={option.isActive}
              isLastOption={index === optionsPerCoin.length - 1}
            />
          );
        })}
      </View>
    </View>
  ) : (
    <View style={styles.itemContainer}>
      {hasImage && (
        <Image
          style={styles.iconImage}
          resizeMode="contain"
          source={
            isDarkMode
              ? item.iconImage.dark.active
              : item.iconImage.light.active
            // isDarkMode
            //   ? require('assets/images/account/notificationsLogos/bitcoinDark.png')
            //   : require('assets/images/account/notificationsLogos/bitcoinLight.png')
          }
        />
      )}
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.arrowContainer}>
        <Image
          source={
            expanded
              ? require('../../../assets/images/arrow-up.png')
              : require('../../../assets/images/arrow-down.png')
          }
          style={styles.arrow}
          resizeMode="contain"
          fadeDuration={0}
        />
      </TouchableOpacity>
    </View>
  );
};

const NewNotificationsPanel = ({route}) => {
  const options = NOTIFICATIONS_MOCK;
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const styles = useNewNotificationsStyles();
  const intervals = ['1H', '4H'];
  const [allToggled, setAllToggled] = useState(false);
  const [activeIntervals, setActiveIntervals] = useState(['1H']);

  const handleIntervalChange = interval => {
    if (activeIntervals.some(item => item === interval)) {
      const prevIntervals = activeIntervals.map(item => item !== interval);
      setActiveIntervals(prevIntervals);
    } else {
      const newIntervals = [...activeIntervals, interval];
      setActiveIntervals(newIntervals);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Notifications</Text>
      <ScrollView style={styles.mainContainer}>
        <View
          style={[styles.row, {justifyContent: 'space-between', padding: 8, paddingHorizontal: 24,}]}>
          {/* All Notifications switch */}
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={styles.subtitle}>All Notifications</Text>
            <View style={styles.allNotificationsSwitchContainer}>
              <Switch
                key={'toggle_all'}
                style={styles.switch}
                trackColor={{true: '#52DD8D', false: '#D9D9D9'}}
                ios_backgroundColor={theme.notificationsSwitchColor}
                thumbColor={'#F6F7FB'}
                value={allToggled}
                onValueChange={setAllToggled}
              />
            </View>
          </View>
          {/* Time intervals */}
          <NotificationsTimeFilter
            intervals={intervals}
            handleIntervalChange={handleIntervalChange}
            activeIntervals={activeIntervals}
          />
        </View>
        <ScrollView
          style={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          {(options || route.params.options).map(item => (
            <NotificationItem
              styles={styles}
              item={item}
              key={item.identifier}
              hasImage={true}
              isActive={true}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewNotificationsPanel;
