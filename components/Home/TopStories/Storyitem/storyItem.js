import useTopStoriesStyles from '../topStoriesStyles';
import FastImage from 'react-native-fast-image';
import {Text, TouchableOpacity} from 'react-native';

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
        index === 0 && !expanded ? {borderBottomWidth: 0} : {},
        index > 0 && !expanded ? styles.hidden : {},
      ]}>
      <FastImage
        source={{
          uri: image
            ? `https://appnewsposters.s3.us-east-2.amazonaws.com/${image}`
            : 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
          priority: FastImage.priority.high,
        }}
        style={[styles.imageStyle, index > 0 && !expanded ? styles.hidden : {}]}
        resizeMode="contain"
        fallback={true}
      />
      <Text style={styles.titleStyles} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default StoryItem;
