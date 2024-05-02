import React, {useContext} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import useHomeAnalysisStyles from './analysisStyles';
import BackButton from '../../Analysis/BackButton/BackButton';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import {AppThemeContext} from '../../../context/themeContext';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';

const AnalysisArticle = ({route}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const {analysis_content, analysis_id, date, isHistoryArticle} = route?.params;
  const styles = useHomeAnalysisStyles();
  const {theme} = useContext(AppThemeContext);
  const isAndroid = Platform.OS === 'android' ? true : false;
  const systemFonts = [
    ...defaultSystemFonts,
    isAndroid ? 'prompt_regular' : 'Prompt-Regular',
    isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
  ];
  const navigation = useNavigation();

  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const findHtmlContent = content => {
    const replacedContent = content.replace(/\\/g, '');
    const strong_changed_content = replacedContent
      .replace(
        /<strong style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
        `<span style="color: ${
          isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
        };" class="bold";>`,
      )
      .replace(/<\/strong>/g, '</span>')
      .replace(/strong/g, 'p');
    const paragraphs_changed = strong_changed_content.replace(
      /p style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);"/g,
      `p style="color: ${
        isDarkMode ? 'rgb(250, 250, 250) ' : 'rgb(64, 64, 64)'
      };"`,
    );

    const span_changed = paragraphs_changed.replace(
      /<span style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
      `<span style="color: ${
        isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
      };">`,
    ).replace(/style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);"/g, '');

    const bullet_lists_updated_content = span_changed.replace(
      /<ul>/g,
      `<ul style="color: ${
        isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(23, 23, 23)'
      };">`,
    );
    return bullet_lists_updated_content;
  };

  const handleBackNavigation = () => {
    navigation.goBack();
    navigation.navigate('Analysis', {
      screen: 'History',
      params: {},
    });
  };

  const html_styles = {
    p: {
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    ul: {
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
      fontSize: theme.responsiveFontSize * 0.85,
    },
    span: {
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
      fontSize: theme.responsiveFontSize * 0.85,
    },
  };

  const classes_styles = {
    'ql-size-huge': {
      fontSize: theme.responsiveFontSize * 1.5,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    'ql-size-large': {
      fontSize: theme.responsiveFontSize * 1.25,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    'ql-size-small': {
      fontSize: theme.responsiveFontSize * 0.65,
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
    },
    bold: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
  };

  const html_source = {
    html: findHtmlContent(analysis_content),
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton
          navigationHandler={isHistoryArticle ? handleBackNavigation : null}
        />
      </View>
      <View style={styles.article}>
        <FastImage
          style={styles.articleImage}
          resizeMode={'contain'}
          source={{
            uri: `https://appanalysisimages.s3.us-east-2.amazonaws.com/${analysis_id}.jpg`,
            priority: FastImage.priority.normal,
          }}
          fallback={true}
        />
        <Text style={styles.articleDate}>{simplifyDateTime(date)}</Text>
        <RenderHTML
          source={html_source}
          contentWidth={theme.width - 50}
          systemFonts={systemFonts}
          tagsStyles={html_styles}
          classesStyles={classes_styles}
        />
      </View>
    </ScrollView>
  );
};

export default AnalysisArticle;
