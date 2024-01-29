import React, {useState, useEffect, useContext} from 'react';
import {List} from 'react-native-paper';
import StoryItem from './Storyitem/storyItem';
import useTopStoriesStyles from './topStoriesStyles';
import {Image, Text, View} from 'react-native';
import {getService} from '../../../services/aiAlphaApi';
import {useNavigation} from '@react-navigation/core';
import {TopMenuContext} from '../../../context/topMenuContext';
import {CategoriesContext} from '../../../context/categoriesContext';

const TopStories = () => {
  const styles = useTopStoriesStyles();
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const [stories, setStories] = useState([]);
  const navigation = useNavigation();
  const {categories} = useContext(CategoriesContext);
  const {updateActiveCoin, updateActiveSubCoin} = useContext(TopMenuContext);

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

  // Function to extract the title from the summaries, that detects the first sentences within "", using regular expressions, and returns it. It only returns the first because it can happen that is inside the summary text another sentences within "".

  const filterArticleTitle = summary => {
    const match = summary.match(/"([^"]+)"/);

    if (match && match[1]) {
      const title = match[1];
      const content = summary.replace(`"${title}"`, '').trim();

      return {
        title,
        content,
      };
    } else {
      return {
        title: null,
        content: null,
      };
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
              title: story.summary,
              summary: story.summary,
              images: story.images,
              date: story.story_date,
            },
            isStory: true,
          },
        },
      },
    });
  };

  // Function to filter the summary or texts of the article, removing the words that are put by the prompt generated, and aren't necessary in the summary or the title.
  const filterText = summary => {
    const keywords_to_remove = [
      'Headline:',
      'Summary:',
      'Step One:',
      'Step Two:',
      'Step Three:',
      'Secondary Summary:',
      'Secondary ',
      'Secondary Points:',
    ];

    const filteredText = summary
      .split('\n')
      .map(line => {
        for (const keyword of keywords_to_remove) {
          if (line.includes(keyword)) {
            line = line.replace(keyword, '');
          }
        }
        return line.trim();
      })
      .join('\n');

    return filteredText;
  };

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const data = await getService(`/api/get/allTopStories`);
        setStories(data['top stories']);
      } catch (error) {
        console.error('Error fetching top stories:', error.message);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <List.Section title="Top Stories" titleStyle={styles.mainTitle}>
      {stories.length === 0 ? (
        <Text style={styles.emptyMessage}>There are no Stories to show...</Text>
      ) : (
        <View style={styles.background}>
          <List.Accordion
            style={styles.storyItem}
            titleStyle={styles.titleStyles}
            title={stories ? filterText(stories[0].summary) : 'Loading'}
            titleNumberOfLines={2}
            // description={
            //   stories
            //     ? filterArticleTitle(filterText(stories[0].summary)).content
            //     : 'Loading'
            // }
            // descriptionStyle={styles.description}
            right={() => (
              <Image
                source={
                  expanded
                    ? require('../../../assets/images/arrow-up.png')
                    : require('../../../assets/images/arrow-down.png')
                }
                style={styles.arrowDown}
                resizeMode="contain"
              />
            )}
            left={() => (
              <Image
                source={{
                  uri:
                    stories[0].images[0].image ||
                    'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
                  width: 60,
                }}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            )}
            expanded={expanded}
            onPress={handlePress}>
            {stories?.map((story, i) => (
              <StoryItem
                item={story}
                key={i}
                title={filterArticleTitle(story.summary).title}
                description={
                  filterArticleTitle(filterText(story.summary)).content
                }
                image={
                  story.images[0].image ||
                  'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
                }
                handleStoryRedirect={handleStoryRedirect}
                coinBotId={story.coin_bot_id}
              />
            ))}
          </List.Accordion>
        </View>
      )}
    </List.Section>
  );
};

export default TopStories;
