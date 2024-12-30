import {Text, TouchableOpacity} from 'react-native';
import useAskAiStyles from '../AskAiStyles';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native';

const AskAiItem = ({
  coin,
  index,
  handleActiveResultData,
  isHistoryItem = true,
}) => {
  const styles = useAskAiStyles();
  return (
    <TouchableOpacity
      key={index}
      style={styles.historyItem}
      onPress={() => handleActiveResultData(coin, isHistoryItem)}>
      {isHistoryItem && (
        <View style={styles.historyItemImageBackground}>
          <FastImage
            style={styles.historyItemLogo}
            source={{
              uri: coin?.logo ? coin.logo : undefined,
            }}
            resizeMode="contain"
          />
        </View>
      )}
      <Text style={styles.historyItemName}>{coin.symbol}</Text>
    </TouchableOpacity>
  );
};

export default AskAiItem;
