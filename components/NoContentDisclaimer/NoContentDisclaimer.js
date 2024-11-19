import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import Disclaimer from '../../assets/images/noContentDisclaimer/nocontent.svg';
import DarkDisclaimer from '../../assets/images/noContentDisclaimer/nocontent-dark.svg';
import NotificationsDisclaimer from '../../assets/images/noContentDisclaimer/nocontent-notifications.svg';
import DarkNotificationsDisclaimer from '../../assets/images/noContentDisclaimer/nocontent-notifications-dark.svg';
import ErrorDisclaimer from '../../assets/images/noContentDisclaimer/nocontent-error.svg';
import DarkErrorDisclaimer from '../../assets/images/noContentDisclaimer/nocontent-error-dark.svg';
import useNoContentDisclaimerStyles from './NoContentDisclaimerStyles';
import {AppThemeContext} from '../../context/themeContext';

// Component to render a disclaimer when there is no content to show. It receives a title and a description to show to the user, and an additionalStyles prop to add custom styles to the disclaimer container. It has three types of disclaimer: search, notifications and error. The default type is search.

const NoContentDisclaimer = ({
  title,
  description,
  additionalStyles = null,
  type = 'search',
}) => {
  const styles = useNoContentDisclaimerStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <View
      style={[
        styles.disclaimerContainer,
        additionalStyles?.disclaimer ? additionalStyles.disclaimer : {},
      ]}>
      {type === 'notifications' ? (
        isDarkMode ? (
          <View style={styles.marginContainer}>
            <DarkNotificationsDisclaimer width={90} height={60} />
          </View>
        ) : (
          <View style={styles.marginContainer}>
            <NotificationsDisclaimer width={90} height={60} />
          </View>
        )
      ) : type === 'error' ? (
        isDarkMode ? (
          <View style={styles.marginContainer}>
            <DarkErrorDisclaimer width={90} height={60} />
          </View>
        ) : (
          <View style={styles.marginContainer}>
            <ErrorDisclaimer width={90} height={60} />
          </View>
        )
      ) : isDarkMode ? (
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
