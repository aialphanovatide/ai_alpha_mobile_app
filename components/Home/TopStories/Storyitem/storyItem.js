import {Image} from 'react-native';
import {List} from 'react-native-paper';
import useTopStoriesStyles from '../topStoriesStyles';

const StoryItem = ({
  item,
  title,
  description,
  image,
  handleStoryRedirect,
  coinBotId,
}) => {
  const styles = useTopStoriesStyles();
  return (
    <List.Item
      title={title}
      description={description}
      descriptionStyle= {styles.description}
      left={() => <Image source={{uri: image}} style={styles.imageStyle} />}
      titleStyle={styles.titleStyles}
      onPress={() => handleStoryRedirect(item, coinBotId)}
      background={styles.storyItem}
    />
  );
};

export default StoryItem;
