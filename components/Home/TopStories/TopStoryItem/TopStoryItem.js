import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useNewTopStoriesStyles from '../NewTopStoriesStyles';
import FastImage from 'react-native-fast-image';

// Component to render each story item in the Top stories section. It receives the story item, the function to handle the story press, the flag to check if it is the last item, and the function to simplify the date as props. It renders the story image, title, and date.

const TopStoryItem = ({item, isLastItem, handleStoryPress, simplifyDate}) => {
  const styles = useNewTopStoriesStyles();
  return (
    <>
      <TouchableOpacity
        style={styles.newsItem}
        onPress={() => handleStoryPress(item, item.bot_id)}>
        <FastImage
          source={{
            uri: item.image
              ? // ? `https://appnewsposters.s3.us-east-2.amazonaws.com/${item.image}`
                item.image
              : 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
            priority: FastImage.priority.high,
          }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
        <View style={styles.newsContent}>
          <Text style={styles.newsTitle}>
            {item.title.length > 60
              ? `${item.title.slice(0, 55)}...`
              : item.title}
          </Text>
          <Text style={styles.newsDate}>{simplifyDate(item.date)}</Text>
        </View>
      </TouchableOpacity>
      {!isLastItem && <View style={styles.horizontalLine} />}
    </>
  );
};
export default TopStoryItem;
