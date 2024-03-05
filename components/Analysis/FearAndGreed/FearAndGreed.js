import {React, useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import BackButton from '../BackButton/BackButton';
import FearAndGreedIndex from './FearAndGreedIndex';
import fearAndGreedService from '../../../services/FearAndGreedServices';
import useFearAndGreedStyles from './FearAndGreedStyles';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';

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
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <SafeAreaView style={styles.mainSection}>
        <BackButton handleReturn={handleReturn} />
        <Text style={styles.title}>Fear and Greed Index</Text>
        <Text style={styles.sectionDescription}>
          Indicates the current sentiment of the cryptocurrency market using
          various factors. It helps investors understand the psychology of the
          market and make more informed decisions based on fear or greed in the
          market.
        </Text>
        <View style={styles.fearAndGreedWidgetContainer}>
          {<FearAndGreedIndex styles={styles} />}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default FearAndGreed;
