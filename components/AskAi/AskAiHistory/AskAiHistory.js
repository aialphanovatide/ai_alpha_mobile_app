import React, {useEffect} from 'react';
import useAskAiStyles from '../AskAiStyles';
import {Text, View} from 'react-native';
import {Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

const AskAiHistory = ({
  activeHistoryOption,
  options,
  handleHistoryOption,
  handleActiveResultData,
  savedResults,
  handleHistoryClean,
}) => {
  const styles = useAskAiStyles();
  const menuButtonWidth = 100 / options.length;

  return (
    <View style={styles.historySection}>
      <Text style={styles.cleanButton} onPress={() => handleHistoryClean()}>
        Clean History
      </Text>
      <View style={styles.historyMenuContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option.name}
            onPress={() => handleHistoryOption(option)}
            style={[
              styles.historyMenuButton,
              {width: `${menuButtonWidth}%`},
              activeHistoryOption.name === option.name
                ? styles.activeButton
                : {},
            ]}>
            <Text
              style={[
                styles.menuText,
                activeHistoryOption.name === option.name
                  ? styles.activeText
                  : {},
              ]}>
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.historyItemsContainer}>
        <View>
          {savedResults && savedResults.length > 0 ? (
            savedResults.map((coin, index) => {
              if (!coin || !coin.content) return null;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.historyItem}
                  onPress={() => handleActiveResultData(coin)}>
                  <View style={styles.historyItemImageBackground}>
                    <FastImage
                      style={styles.historyItemLogo}
                      source={{
                        uri: coin?.logo ? coin.logo : undefined,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.historyItemName}>{coin.name}</Text>
                  <Image
                    source={require('../../../assets/images/arrow-right.png')}
                    style={styles.rightArrow}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.noContentMessage}>
              Here is where you can see the list of coins previously searched
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default AskAiHistory;
