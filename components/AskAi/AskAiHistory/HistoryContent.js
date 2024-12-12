// Component to display the History section's content on the ASK AI History section. It renders the items that are saved on the user device's cache (Async Storage) and displays them as clickable items. The user can filter the items by category and clean the history data. It receives the activeHistoryOption, historyOptions, handleHistoryOption, handleActiveResultData, savedResults, and handleHistoryClean functions as props.

import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import AskAiItem from '../AskAiItem/AskAiItem';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import useAskAiStyles from '../AskAiStyles';

const HistoryContent = ({
  activeHistoryOption,
  historyOptions,
  handleHistoryOption,
  handleActiveResultData,
  savedResults,
  handleHistoryClean,
}) => {
  const styles = useAskAiStyles();
  const menuButtonWidth = 100 / historyOptions.length;

  return (
    <View style={styles.historySection}>
      <TouchableOpacity
        style={styles.cleanButton}
        onPress={() => handleHistoryClean()}>
        <Image
          style={styles.trashIcon}
          source={require('../../../assets/images/askAi/clean_history.png')}
          resizeMode="contain"
        />
        <Text style={styles.cleanText}>Clean History</Text>
      </TouchableOpacity>
      <View style={styles.historyMenuContainer}>
        {historyOptions.map(option => (
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
              if (!coin || !coin.content) {
                return null;
              }
              return (
                <AskAiItem
                  key={index}
                  coin={coin}
                  index={index}
                  handleActiveResultData={handleActiveResultData}
                />
              );
            })
          ) : (
            <NoContentDisclaimer
              title={'Whoops, no matches.'}
              description={
                "We couldn't find any search results.\nGive it another go."
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(HistoryContent);
