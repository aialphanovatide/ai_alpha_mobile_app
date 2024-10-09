import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import NewsItem from './newsItem';
import {useNavigation} from '@react-navigation/native';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
import useNewsStyles from './NewsStyles';
import {AboutModalContext} from '../../../../../../context/AboutModalContext';
import {AboutIcon} from '../Fundamentals/AboutIcon';
import {home_static_data} from '../../../../homeStaticData';
import AboutModal from '../Fundamentals/AboutModal';
import SkeletonLoader from '../../../../../Loader/SkeletonLoader';

const NewsComponent = ({route}) => {
  const styles = useNewsStyles();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const {activeCoin, activeSubCoin} = useContext(TopMenuContext);
  const [botname, setBotname] = useState(
    route.params ? route.params.botname : activeSubCoin,
  );
  const options = ['btc', 'eth'].includes(botname)
    ? ['Today', 'This Week']
    : ['Today', 'This Month'];
  const [activeFilter, setActiveFilter] = useState(options[0]);
  const {handleAboutPress, aboutDescription, aboutVisible} =
    useContext(AboutModalContext);

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

  // Function to filter the news depending on the selected time filter

  const filterNewsByDate = (news, filter) => {
    const now = new Date();

    return news.filter(article => {
      const articleDate = new Date(article.date);

      if (filter === 'Today') {
        return (
          articleDate.getDate() === now.getDate() &&
          articleDate.getMonth() === now.getMonth() &&
          articleDate.getFullYear() === now.getFullYear()
        );
      } else if (filter === 'This Week') {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);
        return articleDate >= startOfWeek;
      } else if (filter === 'This Month') {
        return (
          articleDate.getMonth() === now.getMonth() &&
          articleDate.getFullYear() === now.getFullYear()
        );
      }

      return false;
    });
  };

  const onPress = item => {
    navigation.navigate('NewsArticle', {
      item: item,
      isStory: false,
    });
  };

  const handleFilterPress = option => {
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
    setLoading(true);
    const fetchNews = async () => {
      try {
        const newsLimit = activeFilter && activeFilter === 'Today' ? 10 : 20;
        const endpoint = `bot_name=${botname}&limit=${newsLimit}`;
        const response = await fetch(
          `https://newsbotv2.ngrok.io/get_articles?${endpoint}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (
          response.length === 0 ||
          (response.message &&
            response.message.startsWith('No articles found')) ||
          response.error
        ) {
          setNews([]);
        } else {
          const data = await response.json();
          const articles = filterNewsByDate(data.data, activeFilter);
          setNews(articles);
        }
      } catch (error) {
        console.error('Error fetching news:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [botname, activeFilter]);

  return (
    <SafeAreaView style={[styles.container, styles.backgroundColor]}>
      {aboutVisible && (
        <AboutModal
          description={aboutDescription}
          onClose={handleAboutPress}
          visible={aboutVisible}
        />
      )}
      <View style={styles.titleRow}>
        <Text style={styles.title}>News</Text>
        <AboutIcon
          handleAboutPress={handleAboutPress}
          description={home_static_data.news.sectionDescription}
        />
      </View>
      <View style={styles.filterContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => handleFilterPress(option)}
            style={[
              styles.filterButton,
              activeFilter === option ? styles.activeOption : null,
            ]}>
            <Text
              style={[
                styles.filterText,
                activeFilter === option ? styles.activeButtonText : null,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <SkeletonLoader type="news" quantity={3} />
      ) : (
        <FlatList
          data={news}
          ListEmptyComponent={
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessage}>
                There aren't news to show.
              </Text>
            </View>
          }
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <NewsItem item={item} onPress={onPress} filterText={filterText} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default NewsComponent;
