import React from 'react';
import {useContext} from 'react';
import {AppThemeContext} from '../../../context/themeContext';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

export const SearchNarrativeItem = ({
  styles,
  handleNarrativeTradingsNavigation,
  item,
  isLastItem,
}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <TouchableOpacity
      onPress={() => handleNarrativeTradingsNavigation(item)}
      style={[styles.analysisItem, isLastItem ? {borderBottomWidth: 0} : {}]}>
      <FastImage
        source={{
          uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/${
            isDarkMode ? 'Dark' : 'Light'
          }/Inactive/${
            item.category !== null ? 'ai' : item.category.toLowerCase()
          }.png`,
          priority: FastImage.priority.high,
        }}
        style={styles.imageStyle}
        resizeMode="contain"
        fallback={true}
      />
      <View style={styles.analysisRow}>
        <Text style={styles.analysisTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <Image
        source={require('../../../assets/images/arrow-right.png')}
        style={styles.rightArrowImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
