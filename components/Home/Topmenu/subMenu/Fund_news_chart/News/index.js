import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { postService } from '../../../../../../services/aiAlphaApi';
import NewsItem from './newsItem';
const {width, height} = Dimensions.get('window');

const responsiveFontSize = width * 0.04;

const NewsComponent = ({botname}) => {

  const [news, setNews] = useState([]);

  const requestBody = {
    botName: botname,
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await postService('/api/get/news', requestBody);
        console.log('response: ', response)
        if (response.message && response.message.startsWith("No articles found")) {
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
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.article_id}
        renderItem={({ item }) => <NewsItem item={item} />}
      />
    </View>
  );
};

export default NewsComponent;


const styles = StyleSheet.create({
    container: {
        width,
        paddingHorizontal: 10,
        marginBottom: 600,
    },
    title: {
        marginVertical: 20,
        fontWeight: 'bold',
        color: '#282828',
        fontSize: responsiveFontSize * 1.2,
      },
  });
