import {Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';
import useDailyDeepsStyles from '../Analysis/DailyDeepDives/dailyDeepsStyles';

const UnsubscribedMessage = ({isSubscribed, handleSubscriptionNavigation}) => {
  const styles = useDailyDeepsStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  if (isSubscribed) return null;

  return (
    <View style={styles.overlayContainer}>
      <LinearGradient
        colors={
          isDarkMode
            ? [
                'rgba(10, 10, 10, 0.1)',
                'rgba(10, 10, 10, 0.63)',
                'rgba(10, 10, 10, 80)',
              ]
            : [
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.63)',
                'rgba(255, 255, 255, 80)',
              ]
        }
        locations={[0.16, 0.32, 1]}
        style={styles.overlayGradient}
      />
      <View style={styles.textContainer}>
        <Text style={styles.mainOverlayTitle}>Start your 7-day free trial</Text>
        <Text style={styles.overlayText}>to unlock all features.</Text>
        <TouchableOpacity
          style={styles.unsubscribedButton}
          onPress={() => handleSubscriptionNavigation()}>
          <Text style={styles.buttonText}>Activate Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UnsubscribedMessage;
