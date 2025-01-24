import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../BackButton/BackButton';
import useChartSectionStyles from './ChartSectionStyles';
import ChartTimeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/ChartTimeSelector';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import ChartButtons from './ChartButtons';
import ChartWidget from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/ChartWidget/ChartWidget';

// ChartSection component that renders the chart section of the Dashboard screen. It displays the chart of the selected coin, the time interval selector, and the support and resistance levels. The user can interact with the chart by selecting the time interval, zooming in and out, and viewing the support and resistance levels. It is used to display charts that used data from the CapitalCom API.

const DashboardChartsWidget = ({route, navigation}) => {
  const {title, symbol, description} = route.params;
  const styles = useChartSectionStyles();
  const [selectedInterval, setSelectedInterval] = useState('1d');
  const [loading, setLoading] = useState(true);
  // S&R State variables
  const [activeButtons, setActiveButtons] = useState(['Support', 'Resistance']);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const [supportResistanceLoading, setSupportResistanceLoading] =
    useState(false);
  const {subscribed} = useContext(RevenueCatContext);

  const changeInterval = async newInterval => {
    setSelectedInterval(newInterval);
  };
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape && isHorizontal) {
      handleScreenOrientationChange(false);
      navigation.canGoBack(false);
    }
  };

  // Function to enable and disable the scroll interactions when zooming the chart

  const handleOnZoom = value => {
    setScrollEnabled(value);
  };

  return (
    <SafeAreaView
      style={[
        styles.mainSection,
        isLandscape &&
          isHorizontal && {width: '100%', paddingTop: 0, paddingBottom: 48},
      ]}>
      <BackgroundGradient />
      <ScrollView
        scrollEnabled={scrollEnabled}
        style={[
          {flex: 1, paddingTop: 24},
          isLandscape && isHorizontal && {paddingTop: 36},
        ]}
        showsVerticalScrollIndicator={false}
        G
        bounces={false}>
        <BackButton />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sectionDescription}>{description}</Text>
        <View style={styles.timeframeContainer}>
          <ChartTimeSelector
            selectedInterval={selectedInterval}
            changeInterval={changeInterval}
            selectedPairing={'usdt'}
            disabled={loading}
          />
          {(selectedInterval.toUpperCase() === '1W' ||
            selectedInterval.toUpperCase() === '1D') && (
            <ChartButtons
              activeButtons={activeButtons}
              setActiveButtons={setActiveButtons}
              disabled={loading || supportResistanceLoading}
            />
          )}
        </View>
        <View style={{flex: 1, width: '100%', height: 340, marginBottom: 54}}>
          <ChartWidget
            symbol={symbol}
            pair={''}
            loading={loading}
            setLoading={setLoading}
            activeButtons={activeButtons}
            activeInterval={selectedInterval.toLowerCase()}
            handleOnZoom={handleOnZoom}
          />
          {/* Horizontal view button */}
          {/* <TouchableOpacity
            onPress={
              isLandscape
                ? () => {
                    handleBackInteraction();
                  }
                : () => {
                    navigation.canGoBack(false);
                    handleScreenOrientationChange(true);
                  }
            }>
            <Image
              style={styles.chartsHorizontalButton}
              source={
                isLandscape && isHorizontal
                  ? require('../../../assets/images/home/charts/deactivate-horizontal.png')
                  : require('../../../assets/images/home/charts/activate-horizontal.png')
              }
            />
          </TouchableOpacity> */}
          {/* Horizontal view close button */}
          {/* <TouchableOpacity onPress={() => handleBackInteraction()}>
            <Image
              style={
                isLandscape && isHorizontal
                  ? [styles.chartBackButton, {right: '15%'}]
                  : {display: 'none'}
              }
              resizeMode="contain"
              source={require('../../../assets/images/home/charts/back.png')}
            />
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      {subscribed ? <></> : <UpgradeOverlay />}
    </SafeAreaView>
  );
};

export default DashboardChartsWidget;
