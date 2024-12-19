import React, {useRef, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import useNewDailyDeepDivesStyles from './NewDailyDeepDivesStyles';
import {PaginationDots} from '../../../General/PaginationDots/PaginationDots';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {
  selectDailyDeepDives,
  selectDailyDeepDivesLoading,
} from '../../../../actions/dailyDeepDivesActions';
import SkeletonLoader from '../../../Loader/SkeletonLoader';
import DeepDiveCard from './DeepDiveCard';
import NoContentDisclaimer from '../../../NoContentDisclaimer/NoContentDisclaimer';

// Component to render the Daily Deep Dives section in the home screen. It receives the function to handle the navigation to the History section as a prop. It uses the Deep dives slice from the Redux store to fetch the articles' data and renders the items in the list.

const NewDailyDeepDives = () => {
  const styles = useNewDailyDeepDivesStyles();
  const totalPages = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const loading = useSelector(selectDailyDeepDivesLoading);
  const deepDives = useSelector(selectDailyDeepDives);

  // Function to handle the navigation to the full Analysis article when pressing it, saving the item with the current date for filtering the articles on the History section later

  const handleCardPress = async analysis => {
    navigation.navigate('DailyDeepScreen', {
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

  // Function to handle the history section navigation, allowing the user to navigate to the Dashboard history

  const handleHistoryNavigation = () => {
    navigation.navigate('Analysis', {
      screen: 'History',
      params: {},
    });
  };

  // Function to handle the scrolling on the deep dives section, updating the current page

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(contentOffsetX / styles.deepDiveCard.width) + 1;
    setCurrentPage(newPage);
    scrollViewRef.current.scrollTo({
      x: (newPage - 1) * styles.deepDiveCard.width,
      animated: true,
    });
  };

  return (
    <View style={styles.deepDivesSection}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Text style={styles.topBarTitle}>Deep Dives</Text>
        <TouchableOpacity onPress={() => handleHistoryNavigation()}>
          <Text style={styles.seeAllText}>See All →</Text>
        </TouchableOpacity>
      </View>
      {loading !== 'idle' && deepDives.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, something went wrong.'}
          description={'Please try again in a little while.'}
          type="error"
        />
      ) : (
        <>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            onScrollEndDrag={handleScroll}
            scrollEventThrottle={50}
            pagingEnabled
            style={styles.deepDivesContainer}>
            {loading === 'idle' ? (
              <SkeletonLoader quantity={totalPages} type="cards" />
            ) : (
              deepDives
                ?.slice(0, totalPages)
                .map((item, index) => (
                  <DeepDiveCard
                    key={item.id}
                    item={item}
                    handleCardPress={handleCardPress}
                    itemNumber={index}
                    itemsAmount={totalPages}
                  />
                ))
            )}
          </ScrollView>
          <PaginationDots totalPages={totalPages} currentPage={currentPage} />
        </>
      )}
    </View>
  );
};

export default NewDailyDeepDives;
