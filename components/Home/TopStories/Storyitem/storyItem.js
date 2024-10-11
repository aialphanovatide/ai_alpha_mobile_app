import useTopStoriesStyles from '../topStoriesStyles';
import FastImage from 'react-native-fast-image';
import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const StoryItem = ({
  item,
  title,
  image,
  handleStoryRedirect,
  coinBotId,
  index,
  expanded,
}) => {
  const styles = useTopStoriesStyles();
  return (
    <TouchableOpacity
      onPress={() => handleStoryRedirect(item, coinBotId)}
      style={[
        styles.storyItem,
        // index === 0 && !expanded ? {borderBottomWidth: 0} : {},
        // index > 0 && !expanded ? styles.hidden : {opacity: 1},
      ]}>
      <View style={[styles.row, index === 0 && !expanded && {marginBottom: 0}]}>
        <FastImage
          source={{
            uri: image
              ? `https://appnewsposters.s3.us-east-2.amazonaws.com/${image}`
              : 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
            priority: FastImage.priority.high,
          }}
          style={[
            styles.imageStyle,
            index > 0 && !expanded ? styles.hidden : {opacity: 1},
          ]}
          resizeMode="contain"
          fallback={true}
        />
        <Text style={styles.titleStyles} numberOfLines={2}>
          {title}
        </Text>
      </View>
      {index !== 9 && index !== 0 && <View style={[styles.horizontalLine]} />}
      {index === 0 && expanded && (
        <View style={[styles.horizontalLine]} />
      )}
    </TouchableOpacity>
  );
};

export default StoryItem;
