import { Image } from 'react-native';
import { List } from 'react-native-paper';
import useHomeAnalysisStyles from '../analysisStyles';

const AnalysisItem = ({title, description, imageBase64}) => {
  const styles = useHomeAnalysisStyles();

  return (
    <List.Item
      style={styles.item}
      title={title}
      titleNumberOfLines={2}
      left={() => (
        <Image
          source={{uri: `data:image/png;base64,${imageBase64}`}}
          style={styles.imageStyle}
        />
      )}
      titleStyle={styles.titleStyles}
    />
  );
};

export default AnalysisItem;