import React, {useState} from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native';
import useNewTopStoriesStyles from './NewTopStoriesStyles';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateActiveCoin,
  updateActiveSubCoin,
} from '../../../store/categoriesSlice';
import {useNavigation} from '@react-navigation/core';
import {selectCategories} from '../../../actions/categoriesActions';
import {
  fetchTopStories,
  selectWhatsHappeningTodayLoading,
  selectWhatsHappeningTodayStories,
} from '../../../actions/whatsHappeningTodayActions';
import TopStoryItem from './TopStoryItem/TopStoryItem';
import StoryHeader from './StoryHeader';
import StoriesFilter from './StoriesFilter';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';

const INTERVALS = ['1D', '1W', '1M'];

// Component to render the Top Stories section in the home screen. It fetches the stories from the Redux store and renders the items in the list. It also renders the filter buttons to change the time interval of the stories displayed. It uses the StoryHeader and TopStoryItem components to render the header and the story items.

const NewTopStories = () => {
  const styles = useNewTopStoriesStyles();
  const [activeFilter, setActiveFilter] = useState(INTERVALS[0]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categories = useSelector(selectCategories);
  const stories = useSelector(selectWhatsHappeningTodayStories);
  const loading = useSelector(selectWhatsHappeningTodayLoading);

  // Function to handle the press of the filter buttons, changing the active filter and displaying the news of the selected time interval

  const handleFilterPress = filter => {
    setActiveFilter(filter);
    dispatch(fetchTopStories({timeframe: filter}));
  };

  // This function finds the category and coin bot that belongs to the story, passing through the parameters the coin bot id and the coins where find it.
  const findCoinById = (coins, coinBotId) => {
    let foundCategory = coins.find(category =>
      category.coin_bots.some(coin => coin.bot_id === coinBotId),
    );

    if (foundCategory) {
      let foundCoin = foundCategory.coin_bots.find(
        coin => coin.bot_id === coinBotId,
      );
      return {category: foundCategory, coinBot: foundCoin};
    }
  };

  // This function handles the story redirect when clicking over one, first, finds the category/coin and the subCoin coin bot that belongs to it, after that, updates the active coin and subcoin with its values and after that navigates to the new section. If any param is needed, just include it in the second params object below, which are the params passed to the news screen. This handler is passed to every story item, and it is called on the onPress event.
  const handleStoryPress = (story, coinBotId) => {
    let {category, coinBot} = findCoinById(categories, coinBotId);
    dispatch(updateActiveCoin(category));
    dispatch(updateActiveSubCoin(coinBot.bot_name));
    navigation.navigate('TopStoriesArticle', {
      item: {
        title: story.title,
        content: story.content,
        image: story.image,
        date: story.date,
        top_story_id: story.id,
      },
      isStory: true,
    });
  };

  // Function to simplify the date format of the story item to a more readable format

  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>TOP STORIES - BIG 3</Text>
        <StoriesFilter
          filters={INTERVALS}
          activeFilter={activeFilter}
          handleFilterPress={handleFilterPress}
        />
      </View>
      {loading === 'idle' ? (
        <SkeletonLoader quantity={4} type="stories" />
      ) : loading === 'succeeded' && stories.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, no results.'}
          description={`We couldn’t find any results.\nGive it another go.`}
          additionalStyles={{
            disclaimer: {marginVertical: '5%', paddingVertical: 16},
          }}
        />
      ) : loading !== 'succeeded' && stories.length === 0 ? (
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
          <StoryHeader
            item={stories[0]}
            handleStoryPress={handleStoryPress}
            simplifyDate={simplifyDateTime}
          />
          {stories.slice(1, 5).map((item, index) => (
            <TopStoryItem
              key={index}
              item={item}
              isLastItem={index === stories.length - 1}
              handleStoryPress={handleStoryPress}
              simplifyDate={simplifyDateTime}
            />
          ))}
        </>
      )}
    </SafeAreaView>
  );
};

export default NewTopStories;
