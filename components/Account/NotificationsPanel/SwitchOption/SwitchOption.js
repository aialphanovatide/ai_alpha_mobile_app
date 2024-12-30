import React, {useContext} from 'react';
import {AppThemeContext} from '../../../../context/themeContext';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectNotificationStatusByTopic,
  toggleSubscription,
} from '../../../../actions/notificationActions';
import {Switch, View} from 'react-native';
import {Text} from 'react-native';
import useNewNotificationsStyles from '../NewNotificationsStyles';
import {TouchableOpacity} from 'react-native';

// Component to render the switch option for the notifications settings, allowing the user to toggle the notifications for each option.

const SwitchOption = ({
  styles,
  name,
  categoryTopic,
  optionTopic,
  timeframes = [],
  activeIntervals,
  isLastOption = false,
  handleIntervalChange,
  handleActiveIntervalByAlertSwitch,
  allToggled,
}) => {
  const {theme} = useContext(AppThemeContext);
  const dispatch = useDispatch();

  // Function to handle the toggle of the notifications subscription for the specific option, adding the case of handling the alerts switch that has the time intervals
  const handleToggle = async () => {
    if (optionTopic === 'alerts') {
      if (activeIntervals.length > 0) {
        activeIntervals.forEach(timeframe => {
          dispatch(
            toggleSubscription({
              topic: `${categoryTopic}_${optionTopic}_${timeframe}`,
            }),
          );
          handleIntervalChange(timeframe, categoryTopic);
        });
      } else {
        dispatch(
          toggleSubscription({topic: `${categoryTopic}_${optionTopic}_1D`}),
        );
        handleActiveIntervalByAlertSwitch('1D');
      }
      return;
    } else {
      dispatch(toggleSubscription({topic: `${categoryTopic}_${optionTopic}`}));
    }
  };

  const subscriptionState = useSelector(state =>
    selectNotificationStatusByTopic(state, `${categoryTopic}_${optionTopic}`),
  );

  return (
    <View style={styles.switchRow}>
      <View style={styles.insideRow}>
        <Text style={styles.optionTitle}>{name}</Text>
        <View style={styles.timeFilterContainer}>
          {optionTopic === 'alerts' ? (
            <NotificationsTimeFilter
              intervals={timeframes}
              handleIntervalChange={handleIntervalChange}
              activeIntervals={activeIntervals}
              category={categoryTopic}
            />
          ) : (
            <></>
          )}
        </View>
        <View
          style={[styles.switchContainer, {position: 'absolute', right: 0}]}>
          <Switch
            style={styles.switch}
            trackColor={{true: '#52DD8D', false: '#D9D9D9'}}
            ios_backgroundColor={theme.notificationsSwitchColor}
            thumbColor={'#F6F7FB'}
            value={subscriptionState || allToggled}
            onValueChange={() => handleToggle()}
          />
        </View>
      </View>
      {isLastOption ? <></> : <View style={styles.horizontalLine} />}
    </View>
  );
};

// Component to render the time intervals for the notifications settings, allowing the user to select the time intervals for the notifications to be received.

const NotificationsTimeFilter = ({
  intervals,
  handleIntervalChange,
  activeIntervals,
  category,
}) => {
  const styles = useNewNotificationsStyles();

  return (
    <View style={styles.timeIntervalContainer}>
      {intervals.map((interval, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleIntervalChange(interval, category)}
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

export default React.memo(SwitchOption);
