import React, {useContext, useRef, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import useTopTenGainersStyles from './TopTenGainersStyle';
import {GainerLoserCard} from './GainerLoserCard/GainerLoserCard';
import {
  updateActiveCoin,
  updateActiveSubCoin,
} from '../../../store/categoriesSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {PaginationDots} from '../../General/PaginationDots/PaginationDots';
import {selectTopTenMoversLoading} from '../../../actions/topTenMoversActions';
import {AppThemeContext} from '../../../context/themeContext';
import {selectCategories} from '../../../actions/categoriesActions';

export const TopTenContainer = ({title, itemsState}) => {
  const styles = useTopTenGainersStyles();
  const {theme} = useContext(AppThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categories = useSelector(selectCategories);
  const items = useSelector(itemsState);
  const loading = useSelector(selectTopTenMoversLoading);
  const TOTAL_PAGES = Math.ceil(
    (items.length * styles.itemContainer.width) / theme.width,
  );
  // const WIDTHS_PER_INDEX = [
  //   {min: 0, max: 2 * styles.itemContainer.width, index: 1},
  //   {
  //     min: 2 * styles.itemContainer.width,
  //     max: 4 * styles.itemContainer.width,
  //     index: 2,
  //   },
  //   {
  //     min: 4 * styles.itemContainer.width,
  //     max: 6 * styles.itemContainer.width,
  //     index: 3,
  //   },
  //   {
  //     min: 6 * styles.itemContainer.width,
  //     max: 8 * styles.itemContainer.width,
  //     index: 4,
  //   },
  //   {
  //     min: 8 * styles.itemContainer.width,
  //     max: 10 * styles.itemContainer.width,
  //     index: 5,
  //   },
  // ];

  // Function to handle the scrolling on the top ten gainers/losers section, updating the current item rendered in the container

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;

    // const newPage = WIDTHS_PER_INDEX.find(
    //   item => contentOffsetX >= item.min && contentOffsetX <= item.max,
    // ).index;

    const newPage =
      Math.round(
        (TOTAL_PAGES * contentOffsetX) /
          (items.length * styles.itemContainer.width),
      ) + 1;
    setCurrentPage(newPage);
  };

  // Function that handles the click on an item, navigating to the categories section, and setting the coin and category from the item as active

  const handleItemPress = (coin, category) => {
    console.log('Received data: ', coin, category);
    if (category === null || category === undefined) {
      return;
    } else {
      dispatch(updateActiveCoin(category));
      dispatch(updateActiveSubCoin(coin));
      navigation.navigate('TopMenuScreen', {
        screen: 'SubMenuScreen',
        params: {
          screen: 'Fundamentals',
          params: {},
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>{title}</Text>
      </View>
      {loading === 'succeeded' && items.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, no results.'}
          description={`We couldn’t find any results.\nGive it another go.`}
          additionalStyles={{
            disclaimer: {marginVertical: '5%', paddingVertical: 16},
          }}
        />
      ) : loading !== 'succeeded' && items.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, something went wrong.'}
          description={'Please try again in a little while.'}
          type="error"
          additionalStyles={{
            disclaimer: {marginVertical: '5%', paddingVertical: 16},
          }}
        />
      ) : (
        <>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={50}
            pagingEnabled
            style={styles.itemsContainer}>
            {loading === 'idle' ? (
              <SkeletonLoader quantity={items.length} type="cards" />
            ) : (
              items.map((item, index) => (
                <GainerLoserCard
                  key={index}
                  item={item}
                  handleItemPress={handleItemPress}
                  position={index + 1}
                  categories={categories}
                />
              ))
            )}
          </ScrollView>
          <PaginationDots totalPages={TOTAL_PAGES} currentPage={currentPage} />
        </>
      )}
    </View>
  );
};
