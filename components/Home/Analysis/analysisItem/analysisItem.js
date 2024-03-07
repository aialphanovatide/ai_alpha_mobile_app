import {Image} from 'react-native';
import {List} from 'react-native-paper';
import useHomeAnalysisStyles from '../analysisStyles';

const AnalysisItem = ({title, image, item, handleAnalysisNavigation}) => {
  const styles = useHomeAnalysisStyles();

  return (
    <List.Item
      style={styles.item}
      title={title}
      titleNumberOfLines={2}
      left={() => (
        <Image source={{uri: image, width: 60}} style={styles.imageStyle} />
      )}
      titleStyle={styles.titleStyles}
      onPress={() => handleAnalysisNavigation(item)}
    />
  );
};

export default AnalysisItem;
