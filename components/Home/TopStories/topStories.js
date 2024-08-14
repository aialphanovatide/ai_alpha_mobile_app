import React, {useState, useEffect, useContext} from 'react';
import {List} from 'react-native-paper';
import StoryItem from './Storyitem/storyItem';
import useTopStoriesStyles from './topStoriesStyles';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {getService} from '../../../services/aiAlphaApi';
import {useNavigation} from '@react-navigation/core';
import {TopMenuContext} from '../../../context/topMenuContext';
import {CategoriesContext} from '../../../context/categoriesContext';
import Loader from '../../Loader/Loader';
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon';
import {home_static_data} from '../homeStaticData';
import SkeletonLoader from '../../Loader/SkeletonLoader';

const TopStories = ({handleAboutPress}) => {
  const styles = useTopStoriesStyles();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const navigation = useNavigation();
  const {categories} = useContext(CategoriesContext);
  const {updateActiveCoin, updateActiveSubCoin} = useContext(TopMenuContext);
  const aboutIconStyles = {
    top: 20,
  };
  const handlePress = () => {
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
    updateActiveCoin(category);
    updateActiveSubCoin(coinBot.bot_name);
    navigation.navigate('TopMenuScreen', {
      screen: 'SubMenuScreen',
      params: {
        screen: 'News',
        params: {
          screen: 'NewsArticle',
          params: {
            item: {
              title: story.title,
              content: story.content,
              image: story.image,
              date: story.date,
              top_story_id: story.id,
            },
            isStory: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    const fetchTopStories = async () => {
      try {
        const response = await fetch('https://newsbotv2.ngrok.io/top-stories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const topStoriesData = await response.json();
        if (!topStoriesData.success || !topStoriesData.data) {
          setStories([]);
        } else {
          setStories(topStoriesData.data);
        }
      } catch (error) {
        console.error('Error fetching top stories:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <View style={styles.StoriesItemsContainer}>
      <Text style={styles.mainTitle}>What's Happening Today?</Text>
      <AboutIcon
        handleAboutPress={handleAboutPress}
        description={home_static_data.topStories.sectionDescription}
        additionalStyles={aboutIconStyles}
      />
      {loading ? (
        <SkeletonLoader />
      ) : stories.length === 0 ? (
        <Text style={styles.emptyMessage}>
          {home_static_data.topStories.noContentMessage}
        </Text>
      ) : (
        <View style={[styles.storiesContainer]}>
          {stories?.slice(0, 10).map((story, i) => (
            <View
              key={i}
              style={[
                styles.storyWrapper,
                i > 0 && !expanded ? styles.hidden : {},
              ]}>
              <StoryItem
                item={story}
                key={i}
                title={story.title}
                description={story.content}
                image={story.image}
                handleStoryRedirect={handleStoryRedirect}
                coinBotId={story.bot_id}
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

export default TopStories;
