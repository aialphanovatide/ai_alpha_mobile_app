import React, {useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import useAskAiStyles from './AskAiStyles';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../Loader/SkeletonLoader';
import {AboutIcon} from '../AboutModal/AboutIcon';
import AboutModal from '../AboutModal/AboutModal';
import BackgroundGradient from '../BackgroundGradient/BackgroundGradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleAboutPress,
  handleClose,
  selectAboutDescription,
  selectAboutTitle,
  selectAboutVisible,
} from '../../store/aboutSlice';
import {
  fetchAskAiData,
  loadAskAiData,
  selectAskAiLoading,
  selectCurrentResult,
  selectSavedResults,
} from '../../actions/askAiActions';
import {RESULTS_MOCK} from '../../assets/static_data/askAiMockedData';
import SearchInput from './SearchInput';
import MainResults from './MainResults';
import ValueBox from './ValueBox';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Main component for all the section's features and functionalities, including the search input, the results pop-up, the history section and the about modal. It also includes the logic to save the results data in the AsyncStorage API, to persist them between app executions.

const AskAiMain = ({route, navigation}) => {
  const currentResult = useSelector(selectCurrentResult);
  const styles = useAskAiStyles();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [resultData, setResultData] = useState(
    route.params && route.params.selectedResult !== undefined
      ? route.params.selectedResult
      : currentResult,
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const savedResults = useSelector(selectSavedResults);
  const loading = useSelector(selectAskAiLoading);
  const aboutVisible = useSelector(selectAboutVisible);
  const aboutDescription = useSelector(selectAboutDescription);
  const aboutTitle = useSelector(selectAboutTitle);

  // Dispatch loading the ASK AI data from the AsyncStorage API to get the previously saved results

  useEffect(() => {
    dispatch(loadAskAiData());
  }, [dispatch]);

  // Hook to update the current data when the selected results changes, being received by the route parameters (from the History section)

  useEffect(() => {
    if (route.params?.selectedResult) {
      setResultData(route.params.selectedResult);
    }
  }, [route.params]);

  //  Hook to reset the search value state on every rendering

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchText('');
    console.log('Selected result: ', currentResult);
    setResultData(currentResult);
  }, [currentResult]);

  // Function to update the text within the input field, resetting the focused state when the user types

  const handleTextChange = text => {
    if (isInputFocused) {
      setIsInputFocused(false);
    }
    if (resultData){
      setResultData(null);
    }
    setSearchText(text);
  };

  // Function to handle the ASK AI alpha switching between the History section and the Results section

  const handleSectionNavigation = () => {
    navigation.navigate('AskAiHistory');
  };

  // Function to close the results pop-up, resetting the results data and hiding the content.

  const handleResultsClose = () => {
    setResultData(null);
  };

  // Function to handle the about modal visibility and content based on the section that the user clicked on

  const toggleAbout = (description = null, title = null) => {
    dispatch(handleAboutPress({description, title}));
  };

  const closeAbout = () => {
    dispatch(handleClose());
  };

  // Function to handle the pressing of the text input, detecting when it is focused to render the 5 suggested coins to search

  const handleInputFocus = () => {
    setIsInputFocused(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundGradient />
      <ScrollView
        style={[
          styles.searchContainer,
          Platform.OS === 'ios' ? {paddingHorizontal: 12} : {},
        ]}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>ASK AI Alpha</Text>
          <AboutIcon
            title={'About ASK AI Alpha'}
            description={'This is the ASK AI Alpha section description.'}
            handleAboutPress={toggleAbout}
            additionalStyles={{top: '52.5%', right: '3.5%'}}
          />
        </View>
        <SearchInput
          textHandler={handleTextChange}
          textValue={searchText}
          handleSectionNavigation={handleSectionNavigation}
          handleInputFocus={handleInputFocus}
        />
        {(isInputFocused && !resultData) || (searchText) ? (
          <MainResults
            data={savedResults}
            isInputFocused={isInputFocused}
            searchText={searchText}
            setResultData={setResultData}
          />
        ) : !resultData ? (
          <></>
        ) : loading === 'idle' ? (
          <SkeletonLoader type="askAi" quantity={8} />
        ) : (
          <View
            style={[styles.resultsContainer, !resultData ? styles.hidden : {}]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleResultsClose}>
              <Image
                source={require('../../assets/images/askAi/close_button.png')}
                style={styles.closeButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.row}>
              <View style={[styles.imageBackground]}>
                <FastImage
                  source={{uri: resultData?.logo || ''}}
                  resizeMode={'contain'}
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.coinName}>{resultData?.name}</Text>
            </View>
            <View>
              {resultData?.content.map((datum, index) => {
                if (!datum.data || datum.title === 'success') return null;
                return (
                  <ValueBox
                    key={index}
                    title={datum.displayName}
                    content={JSON.stringify(datum.data)}
                    valueType={datum.valueType}
                  />
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
      <AboutModal
        visible={aboutVisible}
        description={aboutDescription}
        title={aboutTitle}
        onClose={closeAbout}
      />
    </SafeAreaView>
  );
};

export default AskAiMain;
