import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useChartsStyles from '../ChartsStyles';

const AlertMenu = ({activeAlertOption, setActiveButtons}) => {
  const styles = useChartsStyles();
  return (
    <View style={styles.alertMenuContainer}>
      <Text style={styles.alertMenuTitle}>Alerts</Text>
      <View style={styles.alertMenuButtonContainer}>
        {['today', 'this week', 'last week'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => setActiveButtons(option)}
            style={[
              styles.alertMenuButton,
              activeAlertOption === option ? styles.alertMenuActiveButton : null,
            ]}>
            <Text
              style={
                activeAlertOption === option
                  ? styles.alertMenuActiveText
                  : styles.alertMenuInactiveText
              }>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AlertMenu;
