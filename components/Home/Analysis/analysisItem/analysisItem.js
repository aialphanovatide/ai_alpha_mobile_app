import {Image} from 'react-native';
import {List} from 'react-native-paper';
import useHomeAnalysisStyles from '../analysisStyles';

const AnalysisItem = ({title, description, image}) => {
  const styles = useHomeAnalysisStyles();

  return (
    <List.Item
      style={styles.item}
      title={title}
      description={description}
      descriptionStyle={styles.description}
      left={() => <Image source={{uri: image}} style={styles.imageStyle} />}
      titleStyle={styles.titleStyles}
    />
  );
};

export default AnalysisItem;
