import React, {useContext} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import useHomeAnalysisStyles from './analysisStyles';
import BackButton from '../../Analysis/BackButton/BackButton';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import {AppThemeContext} from '../../../context/themeContext';

const AnalysisArticle = ({route}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const {analysis_content, analysis_id, date} = route?.params;
  const styles = useHomeAnalysisStyles();
  const {theme} = useContext(AppThemeContext);
  const isAndroid = Platform.OS === 'android' ? true : false;
  const systemFonts = [
    ...defaultSystemFonts,
    isAndroid ? 'prompt_regular' : 'Prompt-Regular',
    isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
  ];

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
    );

    // const titles_changed_content = span_changed.replace(
    //   /><strong style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
    //   ` style="color: ${
    //     isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(23, 23, 23)'
    //   };">`,
    // );
    const bullet_lists_updated_content = span_changed.replace(
      /<ul>/g,
      `<ul style="color: ${
        isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(23, 23, 23)'
      };">`,
    );
    return bullet_lists_updated_content;
  };

  // console.log(findHtmlContent(analysis_content));

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
        <BackButton />
      </View>
      <View style={styles.article}>
        <Image
          style={styles.articleImage}
          resizeMode={'contain'}
          source={{
            uri: analysis_id
              ? `https://appanalysisimages.s3.us-east-2.amazonaws.com/${analysis_id}.jpg`
              : 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
            width: 300,
          }}
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
