import {List} from 'react-native-paper';
import useTopStoriesStyles from '../topStoriesStyles';
import FastImage from 'react-native-fast-image';

const StoryItem = ({item, title, image, handleStoryRedirect, coinBotId}) => {
  const styles = useTopStoriesStyles();
  return (
    <List.Item
      title={title}
      titleNumberOfLines={2}
      left={() => (
        <FastImage
          source={{
            uri: `data:image/png;base64,${image}`,
            priority: FastImage.priority.high,
          }}
          style={styles.imageStyle}
          resizeMode="contain"
          fallback={true}
        />
      )}
      titleStyle={styles.titleStyles}
      onPress={() => handleStoryRedirect(item, coinBotId)}
      style={styles.storyItem}
    />
  );
};

export default StoryItem;
