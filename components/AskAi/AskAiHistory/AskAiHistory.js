import React, {useEffect, useState} from 'react';
import useAskAiStyles from '../AskAiStyles';
import {SafeAreaView, Text, View} from 'react-native';
import {Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AboutIcon} from '../../AboutModal/AboutIcon';
import AboutModal from '../../AboutModal/AboutModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../BackButton/BackButton';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import { useDispatch, useSelector } from 'react-redux';
import { handleAboutPress, handleClose, selectAboutDescription, selectAboutTitle, selectAboutVisible } from '../../../store/aboutSlice';

// Component to display the History section's content on the ASK AI History section. It renders the items that are saved on the user device's cache (Async Storage) and displays them as clickable items. The user can filter the items by category and clean the history data. It receives the activeHistoryOption, historyOptions, handleHistoryOption, handleActiveResultData, savedResults, and handleHistoryClean functions as props.

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
                </TouchableOpacity>
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

// Component to display the ASK AI History section, where the user can see the previously searched coins on the main ASK AI section. The user can also filter the items by category and clean the history data. It renders the HistoryContent component to display the items and the AboutModal component to display the information about the section.

const AskAiHistory = ({route, navigation}) => {
  const styles = useAskAiStyles();
  const aboutVisible = useSelector(selectAboutVisible);
  const aboutDescription = useSelector(selectAboutDescription);
  const aboutTitle = useSelector(selectAboutTitle);
  const historyOptions = [
    {
      name: 'All',
    },
    {
      name: 'Gaming',
    },
    {
      name: 'Defi',
    },
    {
      name: 'LSDs',
    },
    {
      name: 'Standard',
    },
  ];
  const [activeHistoryOption, setActiveHistoryOption] = useState(
    historyOptions[0],
  );
  const [savedResults, setSavedResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const dispatch = useDispatch();

  //  Hook to reset the search value state on every rendering
  useEffect(() => {
    setActiveHistoryOption(historyOptions[0]);
  }, []);

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
        itemCategories?.data &&
        itemCategories?.data?.length > 0 &&
        itemCategories?.data?.toLowerCase().match(option.toLowerCase())
      ) {
        filtered_items.push(item);
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

  const handleHistoryClean = () => {
    const cleanAsyncStorageData = async () => {
      try {
        await AsyncStorage.removeItem('askAiData');
        setSavedResults([]);
        setFilteredResults([]);
      } catch (error) {}
    };
    cleanAsyncStorageData();
  };

  // Hook to load the saved data on every rendering of the section

  useEffect(() => {
    const loadAskAiData = async () => {
      try {
        const loadedData = await AsyncStorage.getItem('askAiData');
        if (loadedData) {
          const parsedData = JSON.parse(loadedData);
          setSavedResults(parsedData.reverse());
          if (filteredResults.length === 0) {
            setFilteredResults(parsedData);
          }
        }
      } catch (error) {
        console.error("There's no saved data for ASK AI Alpha section.");
      }
    };

    loadAskAiData();
  }, []);

  // Function to handle the pressing of the History section items, passing the data of the selected item to the main ASK AI section.

  const handleActiveResultData = data => {
    navigation.navigate('AskAiMain', {selectedResult: data});
  };

  // Function to handle the about modal visibility and content based on the section that the user clicked on

  const toggleAbout = (description = null, title = null) => {
    dispatch(handleAboutPress({description, title}));
  };

  const closeAbout = () => {
    dispatch(handleClose());
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundGradient />
      <View style={{marginTop: 12}}>
        <BackButton />
      </View>
      <View style={styles.titleRow}>
        <Text style={[styles.title, {marginTop: 16}]}>History</Text>
        <AboutIcon
          title={'History'}
          description={
            'In this section you can see the previously ASK AI searched coins.'
          }
          handleAboutPress={toggleAbout}
          additionalStyles={{top: '35%', right: '3%'}}
        />
      </View>
      <HistoryContent
        historyOptions={historyOptions}
        activeHistoryOption={activeHistoryOption}
        handleHistoryOption={handleHistoryOption}
        savedResults={filteredResults}
        handleHistoryClean={handleHistoryClean}
        handleActiveResultData={handleActiveResultData}
      />
      {/* <AboutModal
        visible={aboutVisible}
        description={aboutDescription}
        title={aboutTitle}
        onClose={closeAbout}
      /> */}
    </SafeAreaView>
  );
};

export default AskAiHistory;
