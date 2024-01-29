import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import useNewsStyles from './NewsStyles';

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
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
      </View>
      <Image
        source={{
          uri:
            item.images[0].image ||
            'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
        }}
        style={styles.image}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
};

export default NewsItem;
