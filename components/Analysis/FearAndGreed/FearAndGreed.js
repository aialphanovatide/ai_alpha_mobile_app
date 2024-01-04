import {React, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import BackButton from '../BackButton/BackButton';
import FearAndGreedIndex from './FearAndGreedIndex';
import fearAndGreedService from '../../../services/FearAndGreedServices';
import useFearAndGreedStyles from './FearAndGreedStyles';

const FearAndGreed = ({handleReturn}) => {
  const styles = useFearAndGreedStyles();
  useEffect(() => {
    const fetchFearAndGreedIndex = async () => {
      try {
        const index = await fearAndGreedService.getFearAndGreedIndex();
        setIndexValue(index);
        setLoading(false);
        console.log(index);
      } catch (error) {
        console.error(`Error trying to get fear & greed index data: ${error}`);
      }
    };

    fetchFearAndGreedIndex();
  }, []);

  const [indexValue, setIndexValue] = useState(null);
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.mainSection}>
      <BackButton handleReturn={handleReturn} />
      <Text style={styles.title}>Fear and Greed Index</Text>
      <View style={styles.fearAndGreedWidgetContainer}>
        {<FearAndGreedIndex styles={styles} />}
      </View>
    </View>
  );
};

export default FearAndGreed;
