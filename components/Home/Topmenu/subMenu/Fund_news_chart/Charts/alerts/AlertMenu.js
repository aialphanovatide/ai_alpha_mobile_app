import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useChartsStyles from '../ChartsStyles';
import {AboutIcon} from '../../Fundamentals/AboutIcon';
import {AboutModalContext} from '../../../../../../../context/AboutModalContext';
import {home_static_data} from '../../../../../../../assets/static_data/homeStaticData';

const AlertMenu = ({timeframeOptions, activeAlertOption, setActiveButtons}) => {
  const {handleAboutPress} = useContext(AboutModalContext);
  const styles = useChartsStyles();
  const option_width = 100 / timeframeOptions.length - 0.33;
  const aboutIconAdditionalStyles = {
    position: 'relative',
    marginHorizontal: 14,
    paddingLeft: '72.5%'
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
      </View>
      <View style={styles.alertMenuButtonContainer}>
        {timeframeOptions.map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => setActiveButtons(option)}
            style={[
              styles.alertMenuButton,
              {width: `${option_width}%`},
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
  );
};

export default AlertMenu;
