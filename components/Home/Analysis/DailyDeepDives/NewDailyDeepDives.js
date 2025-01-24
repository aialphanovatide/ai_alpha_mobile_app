import React, {useRef, useEffect, useState, useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useNewDailyDeepDivesStyles from './NewDailyDeepDivesStyles';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {
  selectDailyDeepDives,
  selectDailyDeepDivesLoading,
} from '../../../../actions/dailyDeepDivesActions';
import SkeletonLoader from '../../../Loader/SkeletonLoader';
import DeepDiveCard from './DeepDiveCard/DeepDiveCard';
import NoContentDisclaimer from '../../../NoContentDisclaimer/NoContentDisclaimer';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {AppThemeContext} from '../../../../context/themeContext';
import {usePaginationDotsStyles} from '../../../General/PaginationDots/usePaginationDotsStyles';

// Component to render the Daily Deep Dives section in the home screen. It receives the function to handle the navigation to the History section as a prop. It uses the Deep dives slice from the Redux store to fetch the articles' data and renders the items in the list.

const NewDailyDeepDives = () => {
  const styles = useNewDailyDeepDivesStyles();
  const paginationDotsStyles = usePaginationDotsStyles();
  const totalPages = 5;
  const WIDTH_PER_SHOWN_CARD = [
    {min: 0, max: 219, x: 0},
    {min: 220, max: 439, x: 240},
    {min: 440, max: 659, x: 400},
    {min: 660, max: 829, x: 660},
    {min: 830, max: 1500, x: 990},
  ];
  const [contentWidth, setContentWidth] = useState(1500);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const loading = useSelector(selectDailyDeepDivesLoading);
  const deepDives = useSelector(selectDailyDeepDives);
  const {theme} = useContext(AppThemeContext);
  const [carouselRef, setCarouselRef] = useState(0);

  // Function to handle the navigation to the full Analysis article when pressing it, saving the item with the current date for filtering the articles on the History section later

  const handleCardPress = async analysis => {
    navigation.navigate('DailyDeepScreen', {
      analysis_content: analysis.raw_analysis,
      analysis_id: analysis.id,
      category: analysis.category,
      date: analysis.created_at,
      image: analysis.image,
      title: analysis.title,
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
    // const newPageIndex = WIDTH_PER_SHOWN_CARD.findIndex(
    //   item => contentOffsetX >= item.min && contentOffsetX <= item.max,
    // );
    // const newPage = WIDTH_PER_SHOWN_CARD.find(
    //   item => contentOffsetX >= item.min && contentOffsetX <= item.max,
    // );
    // setCurrentPage(newPageIndex + 1);
    // scrollViewRef.current.scrollTo({
    //   x: newPage.x,
    //   animated: true,
    // });
    const newPage =
      Math.round((totalPages * contentOffsetX) / contentWidth) + 1;
    setCurrentPage(newPage);
    scrollViewRef.current.scrollTo({
      x:
        newPage === 1
          ? 0
          : newPage === 2
          ? 180
          : (newPage - 1) *
            (styles.deepDiveCard.width + styles.deepDiveCard.margin),
      animated: true,
    });
  };

  // Function to detect what is the total content width of the scroll view that contains the deep dives cards, updating the content width state

  const handleContentSizeChange = newContentWidth => {
    setContentWidth(newContentWidth);
  };

  return (
    <View style={styles.deepDivesSection}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Text style={styles.topBarTitle}>Deep Dives</Text>
        <TouchableOpacity onPress={() => handleHistoryNavigation()}>
          <Text style={styles.seeAllText}>See All →</Text>
        </TouchableOpacity>
      </View>
      {loading === 'succeeded' && deepDives.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, no results.'}
          description={`We couldn’t find any results.\nGive it another go.`}
          additionalStyles={{
            disclaimer: {marginVertical: '5%', paddingVertical: 16},
          }}
        />
      ) : loading !== 'succeeded' && deepDives.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, something went wrong.'}
          description={'Please try again in a little while.'}
          type="error"
          additionalStyles={{
            disclaimer: {marginVertical: '5%', paddingVertical: 16},
          }}
        />
      ) : loading === 'idle' ? (
        <SkeletonLoader quantity={totalPages} type="cards" />
      ) : (
        <>
          <Carousel
            ref={c => {
              setCarouselRef(c);
            }}
            data={deepDives.slice(0, totalPages)}
            renderItem={({item}) => (
              <DeepDiveCard item={item} handleCardPress={handleCardPress} />
            )}
            sliderWidth={340}
            itemWidth={styles.deepDiveCard.width}
            activeSlideAlignment="start"
            onSnapToItem={index => setCurrentPage(index)}
          />
          <Pagination
            dotsLength={totalPages}
            activeDotIndex={currentPage}
            containerStyle={paginationDotsStyles.dotsContainer}
            dotStyle={paginationDotsStyles.activeDot}
            dotColor={paginationDotsStyles.dot.backgroundColor}
            carouselRef={carouselRef}
          />
        </>
      )}
    </View>
  );
};

export default NewDailyDeepDives;
