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
        <View style={styles.analysisIconContainer}>
          <Image
            style={styles.analysisIcon}
            source={icon}
            resizeMode={'contain'}
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
      id: 'Calendar',
      sectionName: 'Calendar',
      icon: require('../../assets/images/analysis/calendar.png'),
    },
    {
      id: 'BTCFundingRates',
      sectionName: 'BTC Funding Rates',
      icon: require('../../assets/images/analysis/btcfr.png'),
    },
    {
      id: 'BTCDominance',
      sectionName: 'BTC Dominance Chart',
      icon: require('../../assets/images/analysis/btc-dom.png'),
    },
    {
      id: 'EthBtc',
      sectionName: 'ETH/BTC',
      icon: require('../../assets/images/analysis/ethbtc.png'),
    },
    {
      id: 'Total3',
      sectionName: 'TOTAL 3',
      icon: require('../../assets/images/analysis/total3.png'),
    },
    {
      id: 'DXYChart',
      sectionName: 'DXY Chart',
      icon: require('../../assets/images/analysis/dxy.png'),
    },
    {
      id: 'GoldChart',
      sectionName: 'Gold Price Chart',
      icon: require('../../assets/images/analysis/gold.png'),
    },
    {
      id: 'SP500',
      sectionName: 'S&P 500 Chart',
      icon: require('../../assets/images/analysis/sp500.png'),
    },
    {
      id: 'FearAndGreed',
      sectionName: 'Fear And Greed',
      icon: require('../../assets/images/analysis/fandg.png'),
    },
  ];
  const handleItemTouch = selectedSectionId => {
    navigation.navigate(selectedSectionId);
  };

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <SafeAreaView style={styles.background}>
        <ScrollView
          style={[styles.background, styles.paddingV]}
          nestedScrollEnabled={true}>
          <Text style={styles.analysisTitle}>Analysis</Text>
          <View style={styles.analyisisContainer}>
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
        <UpgradeOverlay isBlockingByCoin={false} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Analysis;
