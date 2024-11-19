import {React} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BackgroundGradient from '../BackgroundGradient/BackgroundGradient';
import {useScreenOrientation} from '../../hooks/useScreenOrientation';
import useDashboardStyles from './DashboardStyles';

// Component to render an item for each section, that redirects the user to the assigned section of the item when touched. Each item has an icon, a title and a right arrow to indicate that the user can navigate to the corresponding section.

const DashboardItem = ({id, sectionName, handleItemTouch, icon, styles}) => {
  return (
    <TouchableOpacity onPress={() => handleItemTouch(id)}>
      <View style={styles.itemContainer}>
        <View style={[styles.analysisIconContainer, icon.styles]}>
          <Image
            style={styles.analysisIcon}
            source={icon.source}
            resizeMode={'contain'}
            fadeDuration={0}
            loadingIndicatorSource={require('../../assets/images/analysis/empty-icon.png')}
          />
        </View>
        <Text style={styles.itemText}>{sectionName}</Text>
        <View style={styles.rateValueContainer}>
          <View style={styles.rightArrowContainer}>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/images/analysis/right-arrow.png')}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Component that generates the main Dashboard screen, which renders multiple items that redirects to other sections. Each item has an icon, a title and a right arrow to indicate that the user can navigate to the corresponding section.

const Dashboard = () => {
  const styles = useDashboardStyles();
  const navigation = useNavigation();
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();

  // Static data for each section of the dashboard. Each section has an id, a title and an icon and maps into a DashboardItem component.
  const sections = [
    {
      id: 'History',
      sectionName: 'History',
      icon: {
        source: require('../../assets/images/analysis/history.png'),
        styles: {
          width: 28,
          height: 25,
        },
      },
    },
    {
      id: 'NarrativeTrading',
      sectionName: 'Narrative Trading',
      icon: {
        source: require('../../assets/images/analysis/narrative-trading.png'),
        styles: {width: 28, height: 25},
      },
    },
    {
      id: 'Calendar',
      sectionName: 'Calendar',
      icon: {
        source: require('../../assets/images/analysis/calendar.png'),
        styles: {width: 28, height: 25},
      },
    },
    {
      id: 'FundingRates',
      sectionName: 'Funding Rates',
      icon: {
        source: require('../../assets/images/analysis/btcfr.png'),
        styles: {width: 28, height: 25},
      },
    },
    {
      id: 'BTCDominance',
      sectionName: 'BTC Dominance Chart',
      icon: {
        source: require('../../assets/images/analysis/btc-dom.png'),
        styles: {width: 28, height: 25},
      },
    },
    {
      id: 'EthBtc',
      sectionName: 'ETH/BTC',
      icon: {
        source: require('../../assets/images/analysis/ethbtc.png'),
        styles: {width: 28, height: 29},
      },
    },
    {
      id: 'Total3',
      sectionName: 'TOTAL 3',
      icon: {
        source: require('../../assets/images/analysis/total3.png'),
        styles: {width: 28, height: 25},
      },
    },
    {
      id: 'DXYChart',
      sectionName: 'DXY Chart',
      icon: {
        source: require('../../assets/images/analysis/dxy.png'),
        styles: {width: 28, height: 25},
      },
    },
    {
      id: 'GoldChart',
      sectionName: 'Gold Price Chart',
      icon: {
        source: require('../../assets/images/analysis/gold.png'),
        styles: {width: 28, height: 20},
      },
    },
    {
      id: 'SP500',
      sectionName: 'S&P 500 Chart',
      icon: {
        source: require('../../assets/images/analysis/sp500.png'),
        styles: {width: 28, height: 26},
      },
    },
    {
      id: 'USOIL',
      sectionName: 'U.S. Oil Chart',
      icon: {
        source: require('../../assets/images/analysis/sp500.png'),
        styles: {width: 28, height: 26},
      },
    },
    {
      id: 'VIX',
      sectionName: 'VIX Index Chart',
      icon: {
        source: require('../../assets/images/analysis/dxy.png'),
        styles: {width: 28, height: 25},
      },
    },
    {
      id: 'FearAndGreed',
      sectionName: 'Fear And Greed',
      icon: {
        source: require('../../assets/images/analysis/fandg.png'),
        styles: {width: 28, height: 18},
      },
    },
  ];

  useFocusEffect(() => {
    if (isLandscape && isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
    }
  });

  const handleItemTouch = selectedSectionId => {
    navigation.navigate(selectedSectionId);
  };

  return (
    <SafeAreaView style={[styles.background, {justifyContent: 'center'}]}>
      <BackgroundGradient />
      <ScrollView
        style={[styles.background, {padding: 10}]}
        nestedScrollEnabled={true}>
        <Text style={styles.analysisTitle}>Dashboard</Text>
        <View style={[styles.analyisisContainer, styles.paddingBottom]}>
          {sections.map(section => (
            <DashboardItem
              handleItemTouch={handleItemTouch}
              key={section.id}
              id={section.id}
              sectionName={section.sectionName}
              icon={section.icon}
              styles={styles}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
