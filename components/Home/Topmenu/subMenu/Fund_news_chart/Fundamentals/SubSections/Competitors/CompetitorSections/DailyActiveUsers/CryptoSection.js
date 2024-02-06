import React, {useContext} from 'react';
import {View, Image, Text} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import useDailyActiveUsersStyles from './DailyActiveUsersStyles';

const UserIcon = ({tintColor, styles}) => {
  return (
    <View style={styles.userImageContainer}>
      <Image
        style={styles.userImage}
        source={require('../../../../../../../../../../assets/images/fundamentals/competitors/dailyActiveUsers/User.png')}
        tintColor={tintColor}
        resizeMode='contain'
      />
    </View>
  );
};

const CryptoSection = ({name, logo, score, value}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useDailyActiveUsersStyles();
  const renderIcons = score => {
    const totalIcons = 6;
    const filledIcons = Math.floor(score);
    const halfIcon = score - filledIcons > 0 ? 1 : 0;

    const icons = Array.from({length: filledIcons}, (_, index) => (
      <UserIcon key={index} tintColor={'#F98404'} styles={styles} />
    ));

    if (halfIcon > 0) {
      icons.push(
        <UserIcon
          key={`half_${halfIcon}`}
          tintColor={'#F98404'}
          styles={styles}
        />,
      );
    }

    const emptyIcons = Array.from(
      {length: totalIcons - filledIcons - halfIcon},
      (_, index) => (
        <UserIcon
          key={`empty_${index}`}
          tintColor={theme.thirdBoxesBgColor}
          styles={styles}
        />
      ),
    );

    return [...icons, ...emptyIcons];
  };

  return (
    <View style={styles.dailyActiveUsersItem}>
      <View>
        <View style={[styles.row, styles.noVerticalMargin]}>
          <Image source={logo} style={styles.logoContainer} />
          <Text style={styles.label}>{name}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.usersContainer}>
            {renderIcons(score)}
            <Text style={styles.labelOrange}>{value}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CryptoSection;
