import * as React from 'react';
import AnalysisItem from './analysisItem/analysisItem';
import useHomeAnalysisStyles from './analysisStyles';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon';
import {home_static_data} from '../homeStaticData';
import {AnalysisContext} from '../../../context/AnalysisContext';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Analysis = ({handleAboutPress}) => {
  const styles = useHomeAnalysisStyles();
  const {analysisItems, loading} = React.useContext(AnalysisContext);
  const [analysisData, setAnalysisData] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const navigation = useNavigation();
  const aboutIconStyles = {
    top: 24,
  };

  React.useEffect(() => {
    setAnalysisData(analysisItems);
  }, [analysisItems]);

  //  Function to expand and close the Home Analysis component

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  // Function to handle the navigation to the full Analysis article when pressing it, saving the item with the current date for filtering the articles on the History section later

  const handleAnalysisNavigation = async analysis => {
    navigation.navigate('AnalysisArticleScreen', {
      analysis_content: analysis.raw_analysis,
      analysis_id: analysis.id,
      category: analysis.category,
      date: analysis.created_at,
      isHistoryArticle: false,
    });

    const clickedAt = new Date().toISOString();

    const analysisWithDate = {
      ...analysis,
      clickedAt: clickedAt,
    };

    try {
      await AsyncStorage.setItem(
        `analysis_${analysis.id}`,
        JSON.stringify(analysisWithDate),
      );
    } catch (error) {
      console.error(`Failed to save the data of analysis ${analysis.id}`);
    }
  };

  const handleSeeAllNavigation = () => {
    navigation.navigate('Analysis', {
      screen: 'History',
      params: {},
    });
  };

  if (!loading && analysisData?.length === 0) {
    <View style={styles.analysisItemsContainer}>
      <Text style={styles.mainTitle}>Daily Deep Dives</Text>
      <AboutIcon
        handleAboutPress={handleAboutPress}
        title={home_static_data.analysis.sectionTitle}
        description={home_static_data.analysis.sectionDescription}
        additionalStyles={aboutIconStyles}
      />
      <NoContentDisclaimer
        title={'Oops, something went wrong.'}
        description={''}
        // additionalStyles={{disclaimer: {marginVertical: '5%'}}}
      />
    </View>;
  }
  return (
    <View style={styles.analysisItemsContainer}>
      <Text style={styles.mainTitle}>Daily Deep Dives</Text>
      <AboutIcon
        handleAboutPress={handleAboutPress}
        title={home_static_data.analysis.sectionTitle}
        description={home_static_data.analysis.sectionDescription}
        additionalStyles={aboutIconStyles}
      />
      {loading ? (
        <SkeletonLoader />
      ) : (
        <View style={styles.itemsContainer}>
          {analysisData?.slice(0, 5).map((story, index) => (
            <View
              style={[
                styles.itemWrapper,
                index > 0 && !expanded ? styles.hidden : {},
              ]}
              key={index}>
              <AnalysisItem
                key={story.id}
                title={story.title}
                image={story.image}
                item={story}
                handleAnalysisNavigation={handleAnalysisNavigation}
                index={index}
                expanded={expanded}
              />
              <TouchableOpacity
                style={[styles.arrowContainer, index > 0 ? styles.hidden : {}]}
                onPress={() => handlePress()}>
                <Image
                  source={
                    expanded
                      ? require('../../../assets/images/arrow-up.png')
                      : require('../../../assets/images/arrow-down.png')
                  }
                  style={styles.arrowDown}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ))}
          {expanded ? (
            <View style={styles.seeAllButton}>
              <Text
                style={styles.seeAllText}
                onPress={() => handleSeeAllNavigation()}>
                See all articles
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      )}
    </View>
  );
};

export default Analysis;
