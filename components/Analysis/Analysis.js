import {React, useContext, useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import useAnalysisStyles from './AnalysisStyles';
import UpgradeOverlay from '../UpgradeOverlay/UpgradeOverlay';
import {useNavigation} from '@react-navigation/native';
const AnalysisItem = ({id, sectionName, handleItemTouch, icon, styles}) => {
  return (
    <TouchableOpacity onPress={() => handleItemTouch(id)}>
      <View
        style={[
          id === 'calendar' ? styles.emphasizedItem : styles.itemContainer,
        ]}>
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

const Analysis = () => {
  const styles = useAnalysisStyles();
  const [overlayVisible, setOverlayVisible] = useState(true);
  const navigation = useNavigation();

  const handleOverlayClose = () => {
    navigation.navigate('PaywallScreen');
    setOverlayVisible(false);
  };

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
  const [currentSection, setCurrentSection] = useState(null);
  // const [percentages, setPercentages] = useState([
  //   {id: 'fundingRates', percentage: 0},
  //   {id: 'btcDominance', percentage: 0},
  //   {id: 'ethBtc', percentage: 0},
  //   {id: 'total3', percentage: 0},
  //   {id: 'goldPrice', percentage: 0},
  //   {id: 'dxy', percentage: 0},
  //   {id: 'sp500', percentage: 0},
  // ]);

  const handleItemTouch = selectedSectionId => {
    // const selectedObject = sections.find(
    //   section => section.id === selectedSectionId,
    // );
    // if (selectedObject) setCurrentSection(selectedObject);
    navigation.navigate(selectedSectionId);
  };

  return (
    <ScrollView style={styles.background} nestedScrollEnabled={true}>
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
      <UpgradeOverlay visible={overlayVisible} onClose={handleOverlayClose} />
    </ScrollView>
  );
};

export default Analysis;
