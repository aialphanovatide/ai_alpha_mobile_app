import {Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../../../../../Analysis/BackButton/BackButton';
import useNewsStyles from './NewsStyles';

const NewsArticle = ({route, navigation}) => {
  const styles = useNewsStyles();
  const item = route.params.item;
  console.log(item);

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.backgroundColor}>
      <BackButton handleReturn={handleReturn} />
      <View style={styles.article}>
        <Image
          style={styles.articleImage}
          resizeMode={'contain'}
          source={
            item.images[0] || {
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
            }
          }
        />
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleDate}>{item.date}</Text>
        <Text style={styles.articleSummary}>{item.summary}</Text>
      </View>
    </ScrollView>
  );
};

export default NewsArticle;
