import React, {useState, useEffect} from 'react';
import StoryItem from './Storyitem/storyItem';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {AboutIcon} from '../../AboutModal/AboutIcon';
import {home_static_data} from '../../../assets/static_data/homeStaticData';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import useWhatsHappeningTodayStyles from './whatsHappeningTodayStyles';
import {useDispatch, useSelector} from 'react-redux';
import {selectCategories} from '../../../actions/categoriesActions';
import {
  selectWhatsHappeningTodayLoading,
  selectWhatsHappeningTodayStories,
} from '../../../actions/whatsHappeningTodayActions';
import { updateActiveCoin, updateActiveSubCoin } from '../../../store/categoriesSlice';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Component that renders the top stories section, with the top stories list and the about icon. It receives the handleAboutPress function as a prop, which is the function that handles the about icon press, showing the modal with the information about the section. This component fetches the top stories from the API and renders them in the StoryItem component, which is a card with the story information. The component also has a button that expands or hides the top stories list, depending on the case.

const WhatsHappeningToday = ({handleAboutPress}) => {
  const dispatch = useDispatch();
  const styles = useWhatsHappeningTodayStyles();
  const [expanded, setExpanded] = useState(false);
  const whatsHappeningTodayStories = useSelector(
    selectWhatsHappeningTodayStories,
  );
  const loading = useSelector(selectWhatsHappeningTodayLoading);
  const [stories, setStories] = useState([]);
  const navigation = useNavigation();
  const categories = useSelector(selectCategories);
  // const {updateActiveCoin, updateActiveSubCoin} = useContext(TopMenuContext);
  const aboutIconStyles = {
    top: 24,
  };

  useEffect(() => {
    setStories(whatsHappeningTodayStories);
  }, [whatsHappeningTodayStories]);

  // Function to handle the pressing of the arrow, expanding or hiding the top stories list, depending on the case

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
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
  const handleStoryRedirect = (story, coinBotId) => {
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

  // This useEffect fetches the top stories from the API, setting the stories state with the data received. If there is an error, it sets the stories state to an empty array. It also sets the loading state to false when the fetch is done.

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchTopStories = async () => {
  //     try {
  //       const topStoriesData = await newsbotGetService(
  //         '/top-stories?per_page=10',
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       );
  //       if (!topStoriesData.success || !topStoriesData.data) {
  //         setStories([]);
  //       } else {
  //         setStories(topStoriesData.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching top stories:', error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTopStories();
  // }, []);

  return (
    <View style={styles.StoriesItemsContainer}>
      <Text style={styles.mainTitle}>What's Happening Today?</Text>
      <AboutIcon
        handleAboutPress={handleAboutPress}
        title={home_static_data.topStories.sectionTitle}
        description={home_static_data.topStories.sectionDescription}
        additionalStyles={aboutIconStyles}
      />
      {loading === 'idle' ? (
        <SkeletonLoader />
      ) : loading !== 'idle' && stories.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, something went wrong.'}
          description={'Please try again in a little while.'}
          type="error"
          additionalStyles={{disclaimer: {marginVertical: '5%'}}}
        />
      ) : (
        <View style={[styles.storiesContainer]}>
          {stories?.slice(0, 10).map((story, i) => (
            <View
              key={i}
              style={[
                styles.storyWrapper,
                i > 0 && !expanded ? styles.hidden : {opacity: 1},
              ]}>
              <StoryItem
                item={story}
                key={i}
                title={story.title}
                description={story.content}
                image={story.image}
                handleStoryRedirect={handleStoryRedirect}
                coinBotId={story.bot_id}
                index={i}
                expanded={expanded}
              />
              <TouchableOpacity
                style={[styles.arrowContainer, i > 0 ? styles.hidden : {}]}
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
        </View>
      )}
    </View>
  );
};

export default WhatsHappeningToday;
