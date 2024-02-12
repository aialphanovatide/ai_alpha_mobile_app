import React, {useContext} from 'react';
import {Image, SafeAreaView, Switch, Text, View} from 'react-native';
import useNotificationsStyles from './NotificationsStyles';
import BackButton from '../../Analysis/BackButton/BackButton';
import {AppThemeContext} from '../../../context/themeContext';

const NotificationItem = ({
  item,
  styles,
  isActive,
  theme,
  isDarkMode,
  hasImage,
}) => {
  return (
    <View style={styles.itemContainer}>
      {hasImage ? (
          <Image
            style={styles.iconImage}
            resizeMode="contain"
            source={
              isDarkMode
                ? isActive
                  ? item.iconImage.dark.active
                  : item.iconImage.dark.inactive
                : isActive
                ? item.iconImage.light.active
                : item.iconImage.light.inactive
            }
          />
      ) : (
        <></>
      )}

      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.rightContent}>
        <View style={styles.switchContainer}>
          <Switch
            style={styles.switch}
            trackColor={{true: '#00E561', false: '#D9D9D9'}}
            ios_backgroundColor={theme.notificationsSwitchColor}
            thumbColor={'#F6F7FB'}
          />
        </View>
        <View style={styles.switchContainer}>
          <Switch
            style={styles.switch}
            trackColor={{true: '#00E561', false: '#D9D9D9'}}
            ios_backgroundColor={theme.notificationsSwitchColor}
            thumbColor={'#F6F7FB'}
          />
        </View>
      </View>
    </View>
  );
};

const NotificationsPanel = ({route, options = null}) => {
  if (!options) {
    options = route.params.options;
  }
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const styles = useNotificationsStyles();
  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.row}>
        <Text style={styles.subtitle}>News</Text>
        <Text style={styles.subtitle}>Alerts</Text>
      </View>
      <View style={styles.allNotificationsItem}>
        <NotificationItem
          isDarkMode={isDarkMode}
          key={'all_notifications'}
          item={{name: 'All notifications'}}
          styles={styles}
          theme={theme}
          hasImage={false}
        />
      </View>
      <View style={styles.itemsContainer}>
        {options.map((item, index) => (
          <React.Fragment key={item.name}>
            <NotificationItem
              key={item.name}
              item={item}
              styles={styles}
              isActive={false}
              theme={theme}
              isDarkMode={isDarkMode}
              hasImage={true}
            />
            <View key={`line_${item.name}`} style={styles.horizontalLine} />
          </React.Fragment>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default NotificationsPanel;
