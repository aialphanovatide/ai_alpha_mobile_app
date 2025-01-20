import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useNewsStyles from './NewsStyles';
import FastImage from 'react-native-fast-image';

// Component that renders the news item. It receives the news item as a prop and displays the title and the image of the news. It also has a touchable opacity that navigates to the article of the news.

const NewsItem = ({item, onPress}) => {
  const styles = useNewsStyles();

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
          uri: item.image
            ? item.image
            : 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.image}
        resizeMode={'contain'}
        fallback={true}
      />
    </TouchableOpacity>
  );
};

export default NewsItem;
