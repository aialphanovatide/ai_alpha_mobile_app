import React from 'react';
import {Text, View} from 'react-native';
import useSpotlightStyles from './SpotlightStyles';
import {useSelector} from 'react-redux';
import {
  selectSpotlight,
  selectSpotlightLoading,
} from '../../../actions/dailyDeepDivesActions';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import {useNavigation} from '@react-navigation/core';
import { SpotlightCard } from './SpotlightCard/SpotlightCard';

// Component to display the spotlight section, with the top bar and the spotlight card. It uses the data and loading state from the store to display the card.

export const Spotlight = () => {
  const data = useSelector(selectSpotlight);
  const loading = useSelector(selectSpotlightLoading);
  const styles = useSpotlightStyles();
  const navigation = useNavigation();

  const handleCardPress = async item => {
    navigation.navigate('DailyDeepScreen', {
      analysis_content: item.raw_analysis,
      analysis_id: item.id,
      category: item.category,
      date: item.created_at,
      isHistoryArticle: false,
    });

    // const clickedAt = new Date().toISOString();

    // const analysisWithDate = {
    //   ...item,
    //   clickedAt: clickedAt,
    // };

    // try {
    //   await AsyncStorage.setItem(
    //     `analysis_${analysis.id}`,
    //     JSON.stringify(analysisWithDate),
    //   );
    // } catch (error) {
    //   console.error(`Failed to save the data of analysis ${analysis.id}`);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>SPOTLIGHT</Text>
      </View>
      {loading === 'idle' ? (
        <SkeletonLoader type="spotlight" />
      ) : data.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, something went wrong.'}
          description={'Please try again in a little while.'}
          type="error"
          additionalStyles={{
            disclaimer: {marginVertical: '5%', paddingVertical: 16},
          }}
        />
      ) : (
        <SpotlightCard item={data[1]} handleCardPress={handleCardPress} />
      )}
    </View>
  );
};
