import {List} from 'react-native-paper';
import useTopStoriesStyles from '../topStoriesStyles';
import FastImage from 'react-native-fast-image';

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
    <List.Item
      title={title}
      titleNumberOfLines={2}
      left={() => (
        <FastImage
          source={{
            uri: image
              ? `https://appnewsposters.s3.us-east-2.amazonaws.com/${image}`
              : 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
            priority: FastImage.priority.high,
          }}
          style={[
            styles.imageStyle,
            index > 0 && !expanded ? styles.hidden : {},
          ]}
          resizeMode="contain"
          fallback={true}
        />
      )}
      titleStyle={styles.titleStyles}
      onPress={() => handleStoryRedirect(item, coinBotId)}
      style={[
        styles.storyItem,
        index === 0 && !expanded ? {borderBottomWidth: 0} : {},
        index > 0 && !expanded ? styles.hidden : {},
      ]}
    />
  );
};

export default StoryItem;
