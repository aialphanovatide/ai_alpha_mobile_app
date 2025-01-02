import {Text, TouchableOpacity, View} from 'react-native';
import useMarketNarrativeStyles from '../MarketNarrativesStyles';
import FastImage from 'react-native-fast-image';

// Component that renders the items in the market narratives section. It receives the item data and the position of the item in the list as props. It also receives the function to handle the click on an item, and renders the item's title and image.
export const MarketNarrativeItem = ({
  title,
  image,
  item,
  handleNavigation,
  index,
  expanded,
  isLastItem,
}) => {
  const styles = useMarketNarrativeStyles();
  return (
    <TouchableOpacity
      onPress={() => handleNavigation(item)}
      style={styles.item}>
      <View style={styles.row}>
        <FastImage
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${
              item.category !== null &&
              item.category.toLowerCase().replace(/\s/g, '') === 'total3'
                ? 'total3'
                : item.coin_bot_name.toLowerCase()
            }.png`,
            priority: FastImage.priority.high,
          }}
          style={styles.imageStyle}
          resizeMode="contain"
          fallback={true}
        />
        <Text style={styles.titleStyles} numberOfLines={2}>
          {title}
        </Text>
      </View>
      {!isLastItem && <View style={styles.horizontalLine} />}
    </TouchableOpacity>
  );
};
