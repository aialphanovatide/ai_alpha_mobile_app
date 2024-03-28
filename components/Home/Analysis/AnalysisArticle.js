import React, {useContext} from 'react';
import {Platform, SafeAreaView, ScrollView, Text, View} from 'react-native';
import useHomeAnalysisStyles from './analysisStyles';
import BackButton from '../../Analysis/BackButton/BackButton';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import {AppThemeContext} from '../../../context/themeContext';

const AnalysisArticle = ({route}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const {analysis_content, coin_bot_id, date} = route?.params;
  const styles = useHomeAnalysisStyles();
  const {theme} = useContext(AppThemeContext);
  const isAndroid = Platform.OS === 'android' ? true : false;
  const systemFonts = [
    ...defaultSystemFonts,
    isAndroid ? 'prompt_regular' : 'Prompt-Regular',
    isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
  ];

  const html_styles = {
    strong: {
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
      fontSize: theme.responsiveFontSize * 1.125,
    },
    p: {
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
      fontSize: theme.responsiveFontSize * 1.125,
      lineHeight: 22,
      marginVertical: 4,
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

  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const findHtmlContent = content => {
    const replacedContent = content.replace(/\\/g, '');
    const paragraphs_changed = replacedContent.replace(
      /<p style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
      `<p style="color: ${
        isDarkMode ? 'rgb(250, 250, 250) ' : 'rgb(64, 64, 64)'
      };">`,
    );

    const span_changed = paragraphs_changed.replace(
      /<span style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
      `<span style="color: ${
        isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
      };">`,
    );

    // const titles_changed_content = span_changed.replace(
    //   /><strong style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
    //   ` style="color: ${
    //     isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(23, 23, 23)'
    //   };">`,
    // );
    const titles_changed_content = span_changed.replace(/strong/g, 'p');
    const bullet_lists_updated_content = titles_changed_content.replace(
      /<ul>/g,
      `<ul style="color: ${
        isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(23, 23, 23)'
      };">`,
    );
    return bullet_lists_updated_content;
  };

  // console.log(findHtmlContent(analysis_content));

  const html_source = {
    html: findHtmlContent(analysis_content),
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.backButtonWrapper}>
        <BackButton />
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.articleDate}>{simplifyDateTime(date)}</Text>
        <RenderHTML
          source={html_source}
          contentWidth={theme.width - 20}
          systemFonts={systemFonts}
          tagsStyles={html_styles}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalysisArticle;
