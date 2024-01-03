// CryptoSection.js
import React, {useContext} from 'react';
import {View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useCirculatingSupplyStyles from '../CirculatingSupply/CirculatingSupplyStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const UserIcon = ({tintColor, styles}) => {
  return (
    <View style={styles.userImageContainer}>
      <Image
        style={styles.userImage}
        source={require('../../../../../../../../../../assets/images/fundamentals/competitors/dailyActiveUsers/User.png')}
        tintColor={tintColor}
      />
    </View>
  );
};

const CryptoSection = ({name, logo, score, value}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useCirculatingSupplyStyles();
  const renderIcons = score => {
    const totalIcons = 6;
    const filledIcons = Math.floor(score);
    const halfIcon = score - filledIcons > 0 ? 1 : 0;

    const icons = Array.from({length: filledIcons}, (_, index) => (
      // <Icon key={index} name="user" size={20} color="orange" />
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
    <View style={[styles.row, styles.section]}>
      <View>
        <View style={styles.row}>
          <Image source={logo} style={styles.logoContainer} />
          <Text style={[styles.labelLeft, styles.text]}>{name}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.usersContainer}>{renderIcons(score)}</View>
        </View>
      </View>
      <Text style={[styles.labelRight, styles.orange]}>{value}</Text>
    </View>
  );
};

export default CryptoSection;
