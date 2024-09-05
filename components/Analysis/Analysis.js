import {React, useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import useAnalysisStyles from './AnalysisStyles';
import UpgradeOverlay from '../UpgradeOverlay/UpgradeOverlay';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';

// Component to render an item for each section, that redirects the user to the assigned section of the item

const AnalysisItem = ({id, sectionName, handleItemTouch, icon, styles}) => {
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

// Component that generates the main Analysis screen, which renders multiple items that redirects to other sections

const Analysis = () => {
  const styles = useAnalysisStyles();
  const navigation = useNavigation();
  const {isDarkMode} = useContext(AppThemeContext);
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
  const handleItemTouch = selectedSectionId => {
    navigation.navigate(selectedSectionId);
  };

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.22, 0.97]}
      style={{flex: 1, justifyContent: 'center'}}>
      <SafeAreaView style={styles.background}>
        <ScrollView
          style={[styles.background, {padding: 10}]}
          nestedScrollEnabled={true}>
          <Text style={styles.analysisTitle}>Dashboard</Text>
          <View style={[styles.analyisisContainer, styles.paddingBottom]}>
            {sections.map(section => (
              <AnalysisItem
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
    </LinearGradient>
  );
};

export default Analysis;
