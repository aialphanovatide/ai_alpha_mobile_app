import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useChartsStyles from '../ChartsStyles';
import {AboutIcon} from '../../../../../../AboutModal/AboutIcon';
import {home_static_data} from '../../../../../../../assets/static_data/homeStaticData';
import {useDispatch} from 'react-redux';
import {handleAboutPress} from '../../../../../../../store/aboutSlice';

const AlertMenu = ({timeframeOptions, activeAlertOption, setActiveButtons}) => {
  const styles = useChartsStyles();
  const dispatch = useDispatch();
  const option_width = 100 / timeframeOptions.length - 0.33;
  const aboutIconAdditionalStyles = {
    position: 'relative',
    marginHorizontal: 14,
    paddingLeft: '72.5%',
  };

  // Function to handle the about modal visibility and content based on the section that the user clicked on

  const toggleAbout = (description = null, title = null) => {
    dispatch(handleAboutPress({description, title}));
  };

  return (
    <View style={styles.alertMenuContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.alertMenuTitle}>Alerts</Text>
        <AboutIcon
          handleAboutPress={toggleAbout}
          title={home_static_data.alerts.sectionTitle}
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
