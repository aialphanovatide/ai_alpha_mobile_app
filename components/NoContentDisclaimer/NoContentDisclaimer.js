import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import Disclaimer from '../../assets/images/nocontent.svg';
import DarkDisclaimer from '../../assets/images/nocontent-dark.svg';
import useNoContentDisclaimerStyles from './NoContentDisclaimerStyles';
import {AppThemeContext} from '../../context/themeContext';

const NoContentDisclaimer = ({additionalStyles = null}) => {
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
      <Text style={styles.title}>Whoops, no matches.</Text>
      <Text style={styles.description}>
        {"We couldn't find any search results.\nGive it another go."}
      </Text>
    </View>
  );
};

export default NoContentDisclaimer;
