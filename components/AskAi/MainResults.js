import React, {useMemo} from 'react';
import useAskAiStyles from './AskAiStyles';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import AskAiItem from './AskAiItem/AskAiItem';
import NoContentDisclaimer from '../NoContentDisclaimer/NoContentDisclaimer';
import {fetchAskAiData, selectAvailableCoins} from '../../actions/askAiActions';

// Constant for the suggested coins

const SUGGESTED_COINS = [
  'bitcoin',
  'ethereum',
  'cardano',
  'solana',
  'litecoin',
];

const MainResults = ({data, isInputFocused, searchText, setResultData}) => {
  const availableCoins = useSelector(selectAvailableCoins);
  const styles = useAskAiStyles();
  const navigation = useNavigation();
  const PAGE_SIZE = 5;
  const filteredData = useMemo(() => {
    const filteredCoins = searchText
      ? availableCoins.filter(
          coin =>
            coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchText.toLowerCase()),
        )
      : availableCoins.slice(0, PAGE_SIZE);
    // search the suggested coins that matches the current texts and include it in the first results, for displaying them before the rest of the results
    const suggestedCoins = SUGGESTED_COINS.map(coinName =>
      availableCoins.find(
        coin =>
          coin.name.toLowerCase() === coinName && coinName.includes(searchText),
      ),
    ).filter(coin => coin);
    return [...suggestedCoins, ...filteredCoins].slice(0, PAGE_SIZE);
  }, [availableCoins, searchText]);

  const dispatch = useDispatch();

  // Select the data to be suggested in the results container

  const suggestedData = useMemo(() => {
    return (
      availableCoins?.filter(result =>
        SUGGESTED_COINS.includes(result.name.toLowerCase()),
      ) || []
    );
  }, [availableCoins]);

  // Function to handle the pressing of the History section items, passing the data of the selected item to the main ASK AI section.

  const handleActiveResultData = (clickedResult, isHistoryItem = true) => {
    if (isHistoryItem) {
      navigation.navigate('AskAiMain', {selectedResult: clickedResult});
    } else {
      dispatch(fetchAskAiData(clickedResult));
    }
  };

  // Filter the data depending on the current searchText value

  const filterData = (data, searchText) => {
    if (!searchText) {
      return data;
    }
    return data.filter(coin => {
      return (
        coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  return (
    <View style={styles.mainResultsContainer}>
      {isInputFocused && (
        <View
          style={[
            styles.row,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={styles.resultsTitle}>Suggested</Text>
          <View style={styles.titleLine} />
        </View>
      )}
      {searchText !== ''
        ? filteredData.map((coin, index) => {
            return (
              <AskAiItem
                key={index}
                coin={coin}
                index={index}
                handleActiveResultData={handleActiveResultData}
                isHistoryItem={false}
              />
            );
          })
        : suggestedData.map((coin, index) => {
            return (
              <AskAiItem
                key={index}
                coin={coin}
                index={index}
                handleActiveResultData={handleActiveResultData}
                isHistoryItem={false}
              />
            );
          })}
      {filteredData.length === 0 && searchText !== '' && (
        <NoContentDisclaimer
          title={'Whoops, no matches.'}
          description={`We couldn’t find any search results.\nGive it another go.`}
        />
      )}
    </View>
  );
};

export default React.memo(MainResults);
