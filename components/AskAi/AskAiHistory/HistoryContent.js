// Component to display the History section's content on the ASK AI History section. It renders the items that are saved on the user device's cache (Async Storage) and displays them as clickable items. The user can filter the items by category and clean the history data. It receives the activeHistoryOption, historyOptions, handleHistoryOption, handleActiveResultData, savedResults, and handleHistoryClean functions as props.

import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import AskAiItem from '../AskAiItem/AskAiItem';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import useAskAiStyles from '../AskAiStyles';
import {selectSavedResults} from '../../../actions/askAiActions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetSavedResults} from '../../../store/askAiSlice';

const HistoryContent = ({historyOptions, handleActiveResultData}) => {
  const dispatch = useDispatch();
  const savedResults = useSelector(selectSavedResults);

  const styles = useAskAiStyles();

  const [activeHistoryOption, setActiveHistoryOption] = useState(
    historyOptions[0],
  );
  const [filteredResults, setFilteredResults] = useState(savedResults);

  // Function to filter the items on the ASK AI History section by the selected category.

  const filterHistoryItems = (option, items) => {
    const filtered_items = [];

    if (option.toLowerCase() === 'all') {
      setFilteredResults(items);
      return;
    }

    items.forEach(item => {
      const itemCategories = item?.content?.find(
        datum => datum.title.toLowerCase() === 'categories',
      );
      if (
        itemCategories &&
        itemCategories !== undefined &&
        itemCategories?.data?.length > 0
      ) {
        itemCategories.data.forEach(category => {
          if (category.toLowerCase().includes(option.toLowerCase())) {
            filtered_items.push(item);
          }
        });
      }
    });
    setFilteredResults(filtered_items);
    return;
  };

  // Function to handle the history section's active option change, filtering the coin searchs that are saved and loaded from the AsyncStorage to display them as items.

  const handleHistoryOption = option => {
    setActiveHistoryOption(option);
    filterHistoryItems(option.name, savedResults);
  };

  // Function to clean the saved ASK AI section History data, removing all the items storaged on the user device's cache (Async Storage)

  const handleHistoryClean = async () => {
    try {
      console.log('Cleaning the ASK AI History data');
      await AsyncStorage.removeItem('askAiData');
      await AsyncStorage.removeItem('hasSeenFounderPopup'); //uncomment to display freefounders popup after logout
      setFilteredResults([]);
      dispatch(resetSavedResults());
    } catch (error) {
      console.error('Failed to clean the ASK AI History data: ', error);
    }
  };

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
      <ScrollView style={styles.historyItemsContainer}>
        {filteredResults && filteredResults.length > 0 ? (
          filteredResults.map((coin, index) => {
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
      </ScrollView>
    </View>
  );
};

export default React.memo(HistoryContent);
