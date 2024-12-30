import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import useDailyMacroStyles from './DailyMacroStyles';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoContentDisclaimer from '../../../NoContentDisclaimer/NoContentDisclaimer';
import SkeletonLoader from '../../../Loader/SkeletonLoader';
import {
  selectDailyMacros,
  selectDailyMacrosLoading,
} from '../../../../actions/dailyDeepDivesActions';
import {useSelector} from 'react-redux';

const MacroNewsCard = ({item, handleCardPress}) => {
  const styles = useDailyMacroStyles();
  // Function to simplify the date and time of the Daily Deep card
  const simplifyDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
  };

  return (
    <TouchableOpacity style={styles.flex} onPress={() => handleCardPress(item)}>
      <View style={styles.card}>
        <FastImage
          source={{
            uri: `https://appanalysisimages.s3.us-east-2.amazonaws.com/${item.id}.jpg`,
            priority: FastImage.priority.normal,
          }}
          resizeMode="cover"
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>
          {item.title.length > 45
            ? `${item.title.slice(0, 40)}...`
            : item.title}
        </Text>
        <View style={styles.cardContent}>
          <Text style={styles.date}>{simplifyDateTime(item.created_at)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DailyMacroSection = () => {
  const styles = useDailyMacroStyles();
  const navigation = useNavigation();
  const loading = useSelector(selectDailyMacrosLoading);
  const macroData = useSelector(selectDailyMacros).slice(0, 4);

  // Function to handle the navigation to the full Analysis article when pressing it, saving the item with the current date for filtering the articles on the History section later

  const handleCardPress = async analysis => {
    navigation.navigate('DailyDeepScreen', {
      analysis_content: analysis.raw_analysis,
      analysis_id: analysis.id,
      category: analysis.category,
      date: analysis.created_at,
      isHistoryArticle: false,
    });

    const clickedAt = new Date().toISOString();

    const analysisWithDate = {
      ...analysis,
      clickedAt: clickedAt,
    };

    try {
      await AsyncStorage.setItem(
        `analysis_${analysis.id}`,
        JSON.stringify(analysisWithDate),
      );
    } catch (error) {
      console.error(
        `Failed to save the data of the Macro article ${analysis.id}`,
      );
    }
  };

  // Function to handle the history section navigation, allowing the user to navigate to the Dashboard history

  const handleHistoryNavigation = () => {
    navigation.navigate('Analysis', {
      screen: 'History',
      params: {},
    });
  };

  return (
    <View style={styles.dailyMacroSection}>
      <View
        style={[styles.row, {justifyContent: 'space-between', marginTop: 8}]}>
        <Text style={styles.topBarTitle}>DAILY MACRO</Text>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => handleHistoryNavigation()}>
          <Text style={styles.seeAllText}>See All →</Text>
        </TouchableOpacity>
      </View>
      {loading === 'idle' ? (
        <SkeletonLoader type="macro" quantity={4} />
      ) : loading === 'succeeded' && macroData.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, no results.'}
          description={`We couldn’t find any results.\nGive it another go.`}
        />
      ) : loading !== 'succeeded' && macroData.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, something went wrong.'}
          description={'Please try again in a little while.'}
          type="error"
        />
      ) : (
        <ScrollView style={styles.itemsContainer}>
          <View style={[styles.row, {justifyContent: 'flex-start'}]}>
            {macroData.slice(0, 2).map((item, index) => (
              <MacroNewsCard
                key={item.id}
                item={item}
                handleCardPress={handleCardPress}
              />
            ))}
          </View>
          <View style={styles.row}>
            <View style={styles.divisor} />
            <View style={styles.divisor} />
          </View>
          <View style={[styles.row, {justifyContent: 'flex-start'}]}>
            {macroData.slice(2, 4).map((item, index) => (
              <MacroNewsCard
                key={item.id}
                item={item}
                handleCardPress={handleCardPress}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DailyMacroSection;
