import {React, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './FearAndGreedStyles';
import BackButton from '../BackButton/BackButton';
import FearAndGreedIndex from './FearAndGreedIndex';
import fearAndGreedService from '../../../services/FearAndGreedServices';
import Loader from '../../Loader/Loader';

const FearAndGreed = ({handleReturn}) => {
  useEffect(() => {
    const fetchFearAndGreedIndex = async () => {
      try {
        const index = await fearAndGreedService.getFearAndGreedIndex();
        setIndexValue(index);
        setLoading(false)
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
      <BackButton handleReturn={handleReturn}/>
      <Text style={styles.title}>Fear and Greed Index</Text>
      <View style={styles.fearAndGreedWidgetContainer}>
        { loading ? (<Loader />) : (<FearAndGreedIndex indexValue={indexValue} />)}
      </View>
    </View>
  );
};

export default FearAndGreed;
