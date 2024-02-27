import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import useHomeAnalysisStyles from './analysisStyles';
import BackButton from '../../Analysis/BackButton/BackButton';
import RenderHTML from 'react-native-render-html';
import {AppThemeContext} from '../../../context/themeContext';

const AnalysisArticle = ({route}) => {
  console.log(route);
  const {analysis_content, coin_bot_id} = route?.params;
  const styles = useHomeAnalysisStyles();
  const {theme} = useContext(AppThemeContext);

  const findHtmlContent = content => {
    const replacedContent = content.replace(/\\/g, '');
    return replacedContent;
  };

  const html_source = {
    html: findHtmlContent(analysis_content),
  };
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.container}>
        <View style={styles.backButtonWrapper}>
          <BackButton />
        </View>
        <RenderHTML source={html_source} contentWidth={theme.width - 20}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalysisArticle;
