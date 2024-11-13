import React from 'react';
import {useContext} from 'react';
import {AppThemeContext} from '../../../../context/themeContext';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import useDailyDeepsStyles from '../dailyDeepsStyles';

const DailyDeepItem = ({
  title,
  item,
  handleAnalysisNavigation,
  index,
  expanded,
}) => {
  const styles = useDailyDeepsStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <TouchableOpacity
      onPress={() => handleAnalysisNavigation(item)}
      style={[
        styles.item,
        // index === 0 && !expanded ? {borderBottomWidth: 0} : {},
        index === 0 && !expanded && {marginBottom: 0},
        index !== 0 && expanded && {paddingVertical: 0, paddingBottom: 14},
      ]}>
      <View style={[styles.row, index === 0 && !expanded && {marginBottom: 0}]}>
        <FastImage
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${
              item.category !== null &&
              item.category.toLowerCase().replace(/\s/g, '') === 'total3'
                ? 'total3'
                : item.coin_bot_name.toLowerCase()
            }.png`,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={[
            styles.imageStyle,
            index > 0 && !expanded ? styles.hidden : {opacity: 1},
          ]}
          resizeMode="contain"
          fallback={true}
        />
        <Text style={styles.titleStyles} numberOfLines={2}>
          {title}
        </Text>
      </View>
      {index !== 0 && <View style={[styles.horizontalLine]} />}
      {index === 0 && expanded && <View style={[styles.horizontalLine]} />}
    </TouchableOpacity>
  );
};

export default DailyDeepItem;
