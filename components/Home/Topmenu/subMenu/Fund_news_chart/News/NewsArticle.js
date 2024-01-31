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
      <View style={styles.marginVertical}>
        <BackButton handleReturn={handleReturn} />
      </View>
      <View style={styles.article}>
        <Image
          style={styles.articleImage}
          resizeMode={'contain'}
          source={{
            uri:
              item.images[0].image ||
              'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
            width: 300,
          }}
        />
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleDate}>{item.date}</Text>
        <Text style={styles.articleSummary}>{item.summary}</Text>
      </View>
    </ScrollView>
  );
};

export default NewsArticle;
