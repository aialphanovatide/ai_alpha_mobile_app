import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import useNewsStyles from './NewsStyles';

const NewsItem = ({item, onPress}) => {
  const styles = useNewsStyles();
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(item)}>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
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
