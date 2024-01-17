import React, {useState, useEffect, useContext} from 'react';
import {Text, FlatList, SafeAreaView} from 'react-native';
import {postService} from '../../../../../../services/aiAlphaApi';
import NewsItem from './newsItem';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../../../Loader/Loader';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
import useNewsStyles from './NewsStyles';

const NewsComponent = ({route}) => {
  const styles = useNewsStyles();
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const {activeCoin, activeSubCoin} = useContext(TopMenuContext);
  const [botname, setBotname] = useState(
    route.params ? route.params.botname : activeSubCoin.bot_name,
  );
  const requestBody = {
    botName: botname,
  };

  const onPress = item => {
    navigation.navigate('NewsArticle', {
      item: item,
    });
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
    const fetchNews = async () => {
      try {
        const response = await postService('/api/get/news', requestBody);
        // console.log('response: ', response);
        if (
          response.message &&
          response.message.startsWith('No articles found')
        ) {
          setNews([]);
        } else {
          const articles = response.articles.slice(0, 4);
          setNews(articles);
        }
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };

    fetchNews();
  }, [botname]);

  return (
    <SafeAreaView style={[styles.container, styles.backgroundColor]}>
      <Text style={styles.title}>News</Text>

      <FlatList
        data={news}
        ListEmptyComponent={<Loader />}
        keyExtractor={item => item.article_id}
        renderItem={({item}) => <NewsItem item={item} onPress={onPress} />}
      />
    </SafeAreaView>
  );
};

export default NewsComponent;
