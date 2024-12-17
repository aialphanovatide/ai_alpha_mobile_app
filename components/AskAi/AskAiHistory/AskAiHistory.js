import React, {useEffect, useState} from 'react';
import useAskAiStyles from '../AskAiStyles';
import {SafeAreaView, Text, View} from 'react-native';
import {AboutIcon} from '../../AboutModal/AboutIcon';
import AboutModal from '../../AboutModal/AboutModal';
import BackButton from '../../BackButton/BackButton';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleAboutPress,
  handleClose,
  selectAboutDescription,
  selectAboutTitle,
  selectAboutVisible,
} from '../../../store/aboutSlice';
import HistoryContent from './HistoryContent';
import {loadAskAiData} from '../../../actions/askAiActions';

const HISTORY_OPTIONS = [
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

// Component to display the ASK AI History section, where the user can see the previously searched coins on the main ASK AI section. The user can also filter the items by category and clean the history data. It renders the HistoryContent component to display the items and the AboutModal component to display the information about the section.

const AskAiHistory = ({route, navigation}) => {
  const styles = useAskAiStyles();
  const dispatch = useDispatch();

  // Hook to load the saved data on every rendering of the section

  useEffect(() => {
    dispatch(loadAskAiData());
  }, [dispatch]);

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
        historyOptions={HISTORY_OPTIONS}
        handleActiveResultData={handleActiveResultData}
      />
      <AboutModal
        visible={useSelector(selectAboutVisible)}
        description={useSelector(selectAboutDescription)}
        title={useSelector(selectAboutTitle)}
        onClose={closeAbout}
      />
    </SafeAreaView>
  );
};

export default AskAiHistory;
