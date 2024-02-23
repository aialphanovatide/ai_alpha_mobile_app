import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {getService, postService} from '../../../../../../services/aiAlphaApi';
import NewsItem from './newsItem';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../../../Loader/Loader';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
import useNewsStyles from './NewsStyles';

const NewsComponent = ({route}) => {
  const styles = useNewsStyles();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const {activeCoin, activeSubCoin} = useContext(TopMenuContext);
  const [botname, setBotname] = useState(
    route.params ? route.params.botname : activeSubCoin.bot_name,
  );
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeButtons, setActiveButtons] = useState(null);

  // Function to filter the summary or texts of the article, removing the words that are put by the prompt generated, and aren't necessary in the summary or the title.
  const filterText = summary => {
    const keywords_to_remove = [
      'Headline:',
      'Summary:',
      'Step One:',
      'Step Two:',
      'Step Three:',
      'Secondary Summary:',
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

  const onPress = item => {
    navigation.navigate('NewsArticle', {
      item: item,
      isStory: false,
    });
  };

  const handleFilterPress = option => {
    setActiveButtons(option);
    setActiveFilter(option);
  };

  useEffect(() => {
    if (
      activeSubCoin &&
      activeSubCoin !== undefined &&
      activeCoin &&
      activeCoin !== undefined
    ) {
      setBotname(activeSubCoin || activeCoin.coin_bots[0].bot_name);
    }
  }, [activeCoin, activeSubCoin]);

  useEffect(() => {
    // setNews([]);
    // setLoading(false);
    setLoading(true);
    const fetchNews = async () => {
      try {
        const endpoint = activeFilter
          ? `/api/get/news?coin=${botname}&time_range=${activeFilter.toLowerCase()}`
          : `/api/get/news?coin=${botname}`;
        const response = await getService(endpoint);
        if (
          (response.message &&
            response.message.startsWith('No articles found')) ||
          response.error
        ) {
          setNews([]);
        } else {
          const articles = response.articles.slice(0, 4);
          setNews(articles);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };

    fetchNews();
  }, [botname, activeFilter]);

  return (
    <SafeAreaView style={[styles.container, styles.backgroundColor]}>
      <Text style={styles.title}>News</Text>
      <View style={styles.filterContainer}>
        {['Today', 'This Week', 'Last Month'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => handleFilterPress(option)}
            style={[
              styles.filterButton,
              activeButtons === option ? styles.activeOption : null,
            ]}>
            <Text
              style={[
                styles.filterText,
                activeButtons === option ? styles.activeButtonText : null,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={news}
          ListEmptyComponent={
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessage}>
                There are no News yet. Stay tuned!
              </Text>
            </View>
          }
          keyExtractor={item => item.article_id}
          renderItem={({item}) => (
            <NewsItem item={item} onPress={onPress} filterText={filterText} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default NewsComponent;
