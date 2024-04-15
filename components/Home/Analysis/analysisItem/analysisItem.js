import {Image} from 'react-native';
import {List} from 'react-native-paper';
import useHomeAnalysisStyles from '../analysisStyles';
import {useContext} from 'react';
import {AppThemeContext} from '../../../../context/themeContext';
import FastImage from 'react-native-fast-image';

const AnalysisItem = ({title, image, item, handleAnalysisNavigation}) => {
  const styles = useHomeAnalysisStyles();
  const {isDarkMode} = useContext(AppThemeContext);

  return (
    <List.Item
      style={styles.item}
      title={title}
      titleNumberOfLines={2}
      left={() => (
        <FastImage
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/analysis/${
              isDarkMode ? 'dark' : 'light'
            }/${
              item.category !== null &&
              item.category.toLowerCase().replace(/\s/g, '') === 'total3'
                ? 'total3'
                : item.coin_bot_name
            }.png`,
            priority: FastImage.priority.high,
          }}
          style={styles.imageStyle}
          resizeMode="contain"
          fallback={true}
        />
      )}
      titleStyle={styles.titleStyles}
      onPress={() => handleAnalysisNavigation(item)}
    />
  );
};

export default AnalysisItem;
