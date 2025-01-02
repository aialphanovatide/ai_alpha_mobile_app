import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import useNewTopStoriesStyles from './NewTopStoriesStyles';

// Component to render the main story of the Top stories section. It receives the story item, the function to handle the story press, and the function to simplify the date as props. It renders the story image, title, and date.

const StoryHeader = ({item, handleStoryPress, simplifyDate}) => {
  const styles = useNewTopStoriesStyles();
  return (
    <>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => handleStoryPress(item, item.bot_id)}>
        <FastImage
          source={{
            uri: item.image
              ? // ? `https://appnewsposters.s3.us-east-2.amazonaws.com/${item.image}`
                item.image
              : 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
            priority: FastImage.priority.high,
          }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{item.title}</Text>
          <Text style={styles.newsDate}>{simplifyDate(item.date)}</Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.horizontalLine, {marginTop: 8, marginBottom: 16  }]} />
    </>
  );
};

export default StoryHeader;
