import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import Disclaimer from '../../assets/images/nocontent.svg';
import DarkDisclaimer from '../../assets/images/nocontent-dark.svg';
import useNoContentDisclaimerStyles from './NoContentDisclaimerStyles';
import {AppThemeContext} from '../../context/themeContext';

const NoContentDisclaimer = ({title, description, additionalStyles = null}) => {
  const styles = useNoContentDisclaimerStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <View
      style={[
        styles.disclaimerContainer,
        additionalStyles?.disclaimer ? additionalStyles.disclaimer : {},
      ]}>
      {isDarkMode ? (
        <View style={styles.marginContainer}>
          <DarkDisclaimer width={90} height={60} />
        </View>
      ) : (
        <View style={styles.marginContainer}>
          <Disclaimer width={90} height={60} />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default NoContentDisclaimer;
