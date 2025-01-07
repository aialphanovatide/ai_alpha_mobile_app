import React, {useContext} from 'react';
import {AppThemeContext} from '../../../context/themeContext';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

// Component to render the Articles (Daily Deeps, Spotlight, Macro, etc.) item in the Search section. It displays the image and title of the article. It receives the article data, the function to handle the press on the item, the styles, and a flag to check if it is the last item as props.

export const SearchArticleItem = ({
  analysis,
  handleAnalysisNavigation,
  styles,
  isLastItem,
}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <TouchableOpacity
      onPress={() => handleAnalysisNavigation(analysis)}
      style={[styles.analysisItem, isLastItem ? {borderBottomWidth: 0} : {}]}>
      <FastImage
        source={{
          uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/analysis/${
            isDarkMode ? 'dark' : 'light'
          }/${
            analysis.category !== null &&
            analysis.category.toLowerCase().replace(/\s/g, '') === 'total3'
              ? 'total3'
              : analysis.coin_bot_name
          }.png`,
          priority: FastImage.priority.high,
        }}
        style={styles.imageStyle}
        resizeMode="contain"
        fallback={true}
      />
      <View style={styles.analysisRow}>
        <Text style={styles.analysisTitle} numberOfLines={1}>
          {analysis.title}
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
