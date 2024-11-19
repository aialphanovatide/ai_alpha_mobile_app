import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import useHomeNotificationsStyles from './HomeNotificationsStyles';

// Component that renders the notifications button in the home screen. It receives the function to handle the button press and the state of the search bar as props.

const NotificationsButton = ({handleButtonPress, activeSearchBar}) => {
  const styles = useHomeNotificationsStyles();
  return (
    <TouchableOpacity
      onPress={() => handleButtonPress()}
      style={[
        styles.notificationsButton,
        activeSearchBar ? {display: 'none'} : {zIndex: 2004},
      ]}>
      <Image
        source={require('../../../assets/images/home/notifications_light.png')}
        style={styles.bellImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default NotificationsButton;
