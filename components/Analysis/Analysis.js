import {React, useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './AnalysisStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Calendar from './Calendar/Calendar';
import FearAndGreed from './FearAndGreed/FearAndGreed';
import ChartSection from './ChartSection/ChartSection';
import BitcoinFundingRates from './BTCFundingRates/BitcoinFundingRates';
const AnalysisItem = ({id, sectionName, component, handleItemTouch}) => {
  return (
    <TouchableOpacity onPress={() => handleItemTouch(id)}>
      <View
        style={[
          id === 'calendar' ? styles.emphasizedItem : styles.itemContainer,
        ]}>
        <Icon name={'circle'} size={20} />
        <Text style={styles.itemText}>{sectionName}</Text>
        <View style={styles.rateValueContainer}>
          {/* <Text>0.00%</Text> */}
          <Icon name={'chevron-right'} size={14} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Analysis = () => {
  const sections = [
    {
      id: 'calendar',
      sectionName: 'Calendar',
      component: <Calendar handleReturn={handleReturn} />,
    },
    {
      id: 'btcFunding',
      sectionName: 'BTC Funding Rates',
      component: (
        <BitcoinFundingRates
          handleReturn={handleReturn}
          handlePercentageUpdate={handlePercentageUpdate}
        />
      ),
    },
    {id: 'btcDominance', sectionName: 'BTC Dominance Chart', component: <></>},
    {id: 'ethBtc', sectionName: 'ETH/BTC', component: <></>},
    {id: 'total3', sectionName: 'TOTAL 3', component: <></>},
    {
      id: 'dxyChart',
      sectionName: 'DXY Chart',
      component: (
        <ChartSection
          title={'DXY Chart'}
          symbol={'CAPITALCOM:DXY'}
          widgetId={3}
          handleReturn={handleReturn}
        />
      ),
    },
    {
      id: 'goldChart',
      sectionName: 'Gold Price Chart',
      component: (
        <ChartSection
          title={'Gold Price Chart'}
          symbol={'CAPITALCOM:GOLD'}
          widgetId={4}
          handleReturn={handleReturn}
        />
      ),
    },
    {
      id: 'spChart',
      sectionName: 'S&P 500 Chart',
      component: (
        <ChartSection
          title={'S&P 500 Chart'}
          symbol={'SPREADEX:SPX'}
          widgetId={5}
          handleReturn={handleReturn}
        />
      ),
    },
    {
      id: 'fearAndGreed',
      sectionName: 'Fear And Greed',
      component: <FearAndGreed handleReturn={handleReturn} />,
    },
  ];
  const [currentSection, setCurrentSection] = useState(null);
  const [percentages, setPercentages] = useState([
    {id: 'fundingRates', percentage: 0},
    {id: 'btcDominance', percentage: 0},
    {id: 'ethBtc', percentage: 0},
    {id: 'total3', percentage: 0},
    {id: 'goldPrice', percentage: 0},
    {id: 'dxy', percentage: 0},
    {id: 'sp500', percentage: 0},
  ]);

  const handlePercentageUpdate = (id, newPercentage) => {
    const updatedPercentages = percentages.map(item => {
      if (item.id === id) {
        return {...item, percentage: newPercentage};
      } else {
        return item;
      }
    });

    setPercentages(updatedPercentages);
  };

  const handleItemTouch = selectedSectionId => {
    const selectedObject = sections.find(
      section => section.id === selectedSectionId,
    );
    if (selectedObject) setCurrentSection(selectedObject);
  };

  function handleReturn() {
    setCurrentSection(null);
  }

  return (
    <ScrollView style={styles.background} nestedScrollEnabled={true}>
      {currentSection === null && (
        <Text style={styles.analysisTitle}>Analysis</Text>
      )}
      <View style={styles.analyisisContainer}>
        {currentSection === null &&
          sections.map(section => (
            <AnalysisItem
              handleItemTouch={handleItemTouch}
              key={section.id}
              id={section.id}
              sectionName={section.sectionName}
              component={section.component}
            />
          ))}
        {currentSection && currentSection.component}
      </View>
    </ScrollView>
  );
};

export default Analysis;
