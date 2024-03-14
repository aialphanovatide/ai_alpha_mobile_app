import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import useHomeAnalysisStyles from './analysisStyles';
import BackButton from '../../Analysis/BackButton/BackButton';
import RenderHTML from 'react-native-render-html';
import {AppThemeContext} from '../../../context/themeContext';

const AnalysisArticle = ({route}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const {analysis_content, coin_bot_id} = route?.params;
  const styles = useHomeAnalysisStyles();
  const {theme} = useContext(AppThemeContext);

  const findHtmlContent = content => {
    const replacedContent = content.replace(/\\/g, '');
    const colors_changed_content = replacedContent.replace(
      /rgb\(0, 0, 0\)/g,
      isDarkMode ? 'rgb(250, 250, 250)' : 'rgb(64, 64, 64)',
    );
    const titles_changed_content = colors_changed_content.replace(
      /rgb\(13, 13, 13\)/g,
      isDarkMode ? 'rgb(255, 255, 255)' : 'rgb(23, 23, 23)',
    );
    return titles_changed_content;
  };

  const html_source = {
    html: findHtmlContent(analysis_content),
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.backButtonWrapper}>
        <BackButton />
      </View>
      <ScrollView style={styles.container}>
        <RenderHTML source={html_source} contentWidth={theme.width - 20} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalysisArticle;
