import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import useNewsStyles from './NewsStyles';
import FastImage from 'react-native-fast-image';

const NewsItem = ({item, onPress, filterText}) => {
  const styles = useNewsStyles();

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

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(item)}>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
      <FastImage
        source={{
          uri: item.id
            ? `https://appnewsposters.s3.us-east-2.amazonaws.com/${item.image}`
            : 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.cacheOnly,
        }}
        style={styles.image}
        resizeMode={'contain'}
        fallback={true}
      />
    </TouchableOpacity>
  );
};

export default NewsItem;
