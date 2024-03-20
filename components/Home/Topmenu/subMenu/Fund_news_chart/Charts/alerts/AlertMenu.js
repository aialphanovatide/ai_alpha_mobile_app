import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useChartsStyles from '../ChartsStyles';
import {AboutIcon} from '../../Fundamentals/AboutIcon';
import {AboutModalContext} from '../../../../../../../context/AboutModalContext';
import {home_static_data} from '../../../../../homeStaticData';

const AlertMenu = ({activeAlertOption, setActiveButtons}) => {

  const {handleAboutPress} = useContext(AboutModalContext);
  const styles = useChartsStyles();
  const aboutIconAdditionalStyles = {
    position: 'relative',
    marginHorizontal: 14,
    paddingLeft: 32,
  };
  
  return (
    <View style={styles.alertMenuContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.alertMenuTitle}>Alerts</Text>
        <AboutIcon
          handleAboutPress={handleAboutPress}
          description={home_static_data.alerts.sectionDescription}
          additionalStyles={aboutIconAdditionalStyles}
        />
        <View style={styles.alertMenuButtonContainer}>
          {['today', 'this week', 'last week'].map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => setActiveButtons(option)}
              style={[
                styles.alertMenuButton,
                activeAlertOption === option
                  ? styles.alertMenuActiveButton
                  : null,
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
    </View>
  );
};

export default AlertMenu;
