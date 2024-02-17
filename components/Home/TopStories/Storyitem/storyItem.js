import {Image} from 'react-native';
import {List} from 'react-native-paper';
import useTopStoriesStyles from '../topStoriesStyles';

const StoryItem = ({item, title, image, handleStoryRedirect, coinBotId}) => {
  const styles = useTopStoriesStyles();
  return (
    <List.Item
      title={title}
      titleNumberOfLines={2}
      left={() => (
        <Image
          source={{uri: image, width: 60}}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      )}
      titleStyle={styles.titleStyles}
      onPress={() => handleStoryRedirect(item, coinBotId)}
      style={styles.storyItem}
    />
  );
};

export default StoryItem;
