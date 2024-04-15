import React, {useContext} from 'react';
import {View, Image, Text} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import useDailyActiveUsersStyles from './DailyActiveUsersStyles';
import FastImage from 'react-native-fast-image';

const UserIcon = ({tintColor, styles}) => {
  return (
    <View style={styles.userImageContainer}>
      <Image
        style={styles.userImage}
        source={require('../../../../../../../../../../assets/images/fundamentals/competitors/dailyActiveUsers/User.png')}
        tintColor={tintColor}
        resizeMode="contain"
      />
    </View>
  );
};

const CryptoSection = ({crypto, maxValue, itemIndex}) => {
  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];
  const chosenColor = tintColors[itemIndex > 3 ? itemIndex % 3 : itemIndex];
  const {theme} = useContext(AppThemeContext);
  const styles = useDailyActiveUsersStyles();

  const formatNumber = num => {
    const absNum = Math.abs(num);
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const thousand = 1000;

    const tier = (Math.log10(absNum) / 3) | 0;

    if (tier === 0) return num;

    const divisor = Math.pow(thousand, tier);
    const formattedNum = (num / divisor).toFixed(1);

    return formattedNum + abbrev[tier];
  };

  const renderIcons = (value, maxValue) => {
    const totalIcons = 6;
    const score = value === 0 ? 0 : (value * 6) / maxValue;
    const filledIcons = Math.floor(score);
    const halfIcon = score - filledIcons > 0 ? 1 : 0;

    const icons = Array.from({length: filledIcons}, (_, index) => (
      <UserIcon key={index} tintColor={chosenColor} styles={styles} />
    ));

    if (halfIcon > 0) {
      icons.push(
        <UserIcon
          key={`half_${halfIcon}`}
          tintColor={chosenColor}
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
          <FastImage
            source={{
              uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${crypto.symbol.toLowerCase()}.png`,
              priority: FastImage.priority.normal,
            }}
            style={styles.logoContainer}
            resizeMode="contain"
          />
          <Text style={styles.itemName}>{crypto.name}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.usersContainer}>
            {renderIcons(crypto.activeUsers, maxValue)}
            <Text style={[styles.labelOrange, {color: chosenColor}]}>
              {formatNumber(crypto.activeUsers)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CryptoSection;
