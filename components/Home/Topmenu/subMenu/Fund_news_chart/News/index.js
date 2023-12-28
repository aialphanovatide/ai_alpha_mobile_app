import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {postService} from '../../../../../../services/aiAlphaApi';
import NewsItem from './newsItem';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../../../Loader/Loader';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
const {width, height} = Dimensions.get('window');

const responsiveFontSize = width * 0.04;

const NewsComponent = ({route}) => {
  const {botname} = route.params;
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const {activeCoin, activeSubCoin} = useContext(TopMenuContext);

  useEffect(() => {}, [activeCoin, activeSubCoin]);

  const requestBody = {
    botName: botname,
  };

  const onPress = item => {
    navigation.navigate('NewsArticle', {
      item: item,
    });
  };

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>News</Text>
      {news ? (
        <FlatList
          data={news}
          keyExtractor={item => item.article_id}
          renderItem={({item}) => <NewsItem item={item} onPress={onPress} />}
        />
      ) : (
        <Loader />
      )}
      {/* {news ? (
        news.map(item => (
          <NewsItem
            key={item.article_id}
            item={item}
            onPress={() => onPress(item)}
          />
        ))
      ) : (
        <Loader />
      )} */}
    </SafeAreaView>
  );
};

export default NewsComponent;

const styles = StyleSheet.create({
  container: {
    width,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#282828',
    fontSize: responsiveFontSize * 1.2,
  },
});
