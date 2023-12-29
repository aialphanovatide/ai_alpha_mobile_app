import {Image} from 'react-native';
import {List} from 'react-native-paper';
import styles from '../topStoriesStyles';

const StoryItem = ({
  item,
  title,
  description,
  image,
  handleStoryRedirect,
  coinBotId,
}) => {
  return (
    <List.Item
      title={title}
      description={description}
      left={() => <Image source={{uri: image}} style={styles.imageStyle} />}
      titleStyle={styles.titleStyles}
      onPress={() =>
        handleStoryRedirect(item, coinBotId)
      }
    />
  );
};

export default StoryItem;
