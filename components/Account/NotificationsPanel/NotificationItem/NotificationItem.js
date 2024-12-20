import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';
import SwitchOption from '../SwitchOption/SwitchOption.js';
import {INITIAL_NOTIFICATION_OPTIONS} from '../NewNotificationsPanel';

// Configure the animations for the layout
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Notification item component, it is used to display the notification settings for each coin. It can be expanded to show the options, that can be toggled on/off, and are related to alerts, news, etc.

const NotificationItem = ({
  item,
  styles,
  hasImage,
  timeframes,
  handleToggleByIntervalsChange,
  notificationsSubscriptions,
  allToggled,
}) => {
  const [expanded, setExpanded] = useState(false);
  const {isDarkMode} = useContext(AppThemeContext);
  const [activeIntervals, setActiveIntervals] = useState(['1D']);

  // Function to handle the expansion of the item when clicking on it to show the options, it triggers the LayoutAnimation to animate the expansion

  const handleItemExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  // Function to load the state of the active intervals when loading the notifications subscriptions state from the Redux store

  const loadActiveIntervals = () => {
    const activeIntervals = [];
    for (const key of Object.entries(notificationsSubscriptions)) {
      if (key[0].includes(item.identifier) && key[0].includes('alerts')) {
        const topicParts = key[0].split('_');
        const loadedState = {
          topic: topicParts[0],
          interval: topicParts[4],
          isActive: key[1],
        };
        activeIntervals.push(loadedState);
      }
    }
    const activeIntervalsFiltered = activeIntervals
      .map(interval => {
        if (interval.isActive === true) {
          return interval.interval;
        } else {
          return null;
        }
      })
      .filter(interval => interval !== null);
    setActiveIntervals(activeIntervalsFiltered);
  };

  // Load the active intervals when the component is mounted
  useEffect(() => {
    loadActiveIntervals();
    if (allToggled) {
      setActiveIntervals(['1D', '1W']);
    }
  }, [allToggled]);

  // Function to handle the change of the time intervals by clicking the interval buttons

  const handleIntervalChange = (interval, category) => {
    if (activeIntervals.includes(interval)) {
      const previousIntervals = Array.from(activeIntervals);
      const index = previousIntervals.indexOf(interval);
      previousIntervals.splice(index, 1);
      setActiveIntervals(previousIntervals);
    } else {
      const newIntervals = Array.from(activeIntervals);
      newIntervals.push(interval);
      setActiveIntervals(newIntervals);
    }
    handleToggleByIntervalsChange(interval, category);
  };

  // Function to handle the change of the time intervals when the alerts switch is toggled without any active interval

  const handleActiveIntervalByAlertSwitch = interval => {
    const newIntervals = [];
    newIntervals.push(interval);
    setActiveIntervals(newIntervals);
  };

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
          onPress={() => handleItemExpansion()}
          style={styles.arrowContainer}>
          <Image
            source={
              expanded
                ? require('../../../../assets/images/arrow-up.png')
                : require('../../../../assets/images/arrow-down.png')
            }
            style={styles.arrow}
            resizeMode="contain"
            fadeDuration={0}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        {INITIAL_NOTIFICATION_OPTIONS.map((option, index) => {
          return (
            <SwitchOption
              styles={styles}
              key={option.name}
              name={option.name}
              optionTopic={option.topic_tag}
              categoryTopic={item.identifier}
              isActive={option.isActive}
              isLastOption={index === INITIAL_NOTIFICATION_OPTIONS.length - 1}
              timeframes={timeframes}
              activeIntervals={activeIntervals}
              handleIntervalChange={handleIntervalChange}
              handleActiveIntervalByAlertSwitch={
                handleActiveIntervalByAlertSwitch
              }
              allToggled={allToggled}
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
          }
        />
      )}
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => handleItemExpansion()}
        style={styles.arrowContainer}>
        <Image
          source={
            expanded
              ? require('../../../../assets/images/arrow-up.png')
              : require('../../../../assets/images/arrow-down.png')
          }
          style={styles.arrow}
          resizeMode="contain"
          fadeDuration={0}
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(NotificationItem);
