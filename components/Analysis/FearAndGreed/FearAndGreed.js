import {React, useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import BackButton from '../BackButton/BackButton';
import FearAndGreedIndex from './FearAndGreedIndex';
import fearAndGreedService from '../../../services/FearAndGreedServices';
import useFearAndGreedStyles from './FearAndGreedStyles';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';
import Loader from '../../Loader/Loader';

const ReferenceItem = ({item, styles}) => {
  return (
    <View style={styles.referenceItem}>
      <Image
        source={item.referenceImage}
        style={styles.referenceImage}
        resizeMode="contain"
      />
      <Text style={styles.referenceTitle}>{item.title}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.descriptionText}>{item.referenceDescription}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const References = ({references, activeReference}) => {
  const styles = useFearAndGreedStyles();
  return (
    <ScrollView style={styles.referencesContainer}>
      {activeReference ? (
        <ReferenceItem item={activeReference} styles={styles} />
      ) : (
        <Text style={styles.descriptionText}>No active reference</Text>
      )}
    </ScrollView>
  );
};

const FearAndGreed = ({handleReturn}) => {
  const styles = useFearAndGreedStyles();
  const referenceOptions = [
    {
      title: 'Extreme Fear',
      referenceDescription:
        'Indicates that investors are deeply concerned and are panic selling, it might also be due to a black swan event like COVID or the FTX bankruptcy. In many cases this shows that a bottom is forming and it is in fact a good buying opportunity, but investors should always remain cautious regardless.',
      referenceImage: require('../../../assets/images/fundamentals/fearAndGreed/extremefear.png'),
      valuesRange: [0, 24],
    },
    {
      title: 'Fear',
      referenceDescription:
        "Suggests that investors are cautious about the market's future direction, leading to possible decreases in market prices. It reflects growing concern but not yet panic. It is worth remembering that during a bear market this sentiment can remain in place for months on end and the market still heads in a downward direction.",
      referenceImage: require('../../../assets/images/fundamentals/fearAndGreed/fear.png'),
      valuesRange: [25, 44],
    },
    {
      title: 'Neutral',
      referenceDescription:
        'Implies that investors are neither excessively fearful nor greedy. The market could be in a period of consolidation or simply unclear as to which direction it might be heading in. This is often a time to stay out of the market, as it shows investors are unsure which direction the market is heading next.',
      referenceImage: require('../../../assets/images/fundamentals/fearAndGreed/neutral.png'),
      valuesRange: [45, 55],
    },
    {
      title: 'Greed',
      referenceDescription:
        'Indicates that investors are becoming increasingly optimistic and is either a sign the market is in a healthy position or in fact an early indicator of a looming correction. It is worth remembering that during a bull market this sentiment can remain in place for months on end and the market still heads in an upward direction.',
      referenceImage: require('../../../assets/images/fundamentals/fearAndGreed/greed.png'),
      valuesRange: [56, 75],
    },
    {
      title: 'Extreme Greed',
      referenceDescription:
        'Suggests that investors are overly optimistic, leading to speculative buying and potential market tops. It might indicate that the market is overvalued and due for a correction.',
      referenceImage: require('../../../assets/images/fundamentals/fearAndGreed/extremegreed.png'),
      valuesRange: [76, 100],
    },
  ];

  const [indexValue, setIndexValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const {isDarkMode} = useContext(AppThemeContext);
  const [activeOption, setActiveOption] = useState(null);

  const findActiveFngOption = value => {
    const found = referenceOptions.find(option => {
      return value >= option.valuesRange[0] && value <= option.valuesRange[1];
    });

    return found && found !== undefined ? found : null;
  };

  useEffect(() => {
    setLoading(true);
    const fetchFearAndGreedIndex = async () => {
      try {
        const response = await fearAndGreedService.getFearAndGreedFullData();
        setIndexValue(response.data[0].value);
        setActiveOption(findActiveFngOption(Number(response.data[0].value)));
      } catch (error) {
        console.error(`Error trying to get fear & greed index data: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFearAndGreedIndex();
  }, []);

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <SafeAreaView style={styles.mainSection}>
          <BackButton handleReturn={handleReturn} />
          <Text style={styles.title}>Fear and Greed Index</Text>
          <Text style={styles.sectionDescription}>
            Indicates the current sentiment of the cryptocurrency market using
            various factors. It helps investors understand the psychology of the
            market and make more informed decisions based on fear or greed in
            the market.
          </Text>
          {loading ? (
            <Loader />
          ) : (
            <>
              <View style={styles.fearAndGreedWidgetContainer}>
                {<FearAndGreedIndex styles={styles} />}
              </View>
              <Text style={styles.subTitle}>References</Text>
              <References
                references={referenceOptions}
                activeReference={activeOption}
              />
            </>
          )}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default FearAndGreed;
