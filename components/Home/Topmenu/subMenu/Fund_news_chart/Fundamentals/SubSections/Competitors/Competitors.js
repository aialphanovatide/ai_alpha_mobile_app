import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './CompetitorsStyles';
import TypeOfToken from './CompetitorSections/TypeOfToken/TypeOfToken';
import CompetitorSection from './CompetitorSections/CompetitorSection';
import CirculatingSupply from './CompetitorSections/CirculatingSupply/CirculatingSupply';
import DailyActiveUsers from './DailyActiveUsers';
import TransactionFees from './CompetitorSections/TransactionFees/TransactionFees';

const MenuItem = ({item, activeOption, handleOptionChange}) => {
  return (
    <TouchableOpacity onPress={() => handleOptionChange(item)}>
      <View style={styles.menuItemContainer}>
        {item.icon && (
          <Icon
            style={styles.itemIcon}
            name={item.icon}
            size={15}
            color={activeOption.name === item.name ? '#FB6822' : '#B8BBBC'}
          />
        )}
        <Text
          style={[
            styles.menuItemName,
            activeOption.name === item.name && styles.activeItem,
          ]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const CompetitorsMenu = ({options, activeOption, handleOptionChange}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.menuContainer}>
        {options.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            activeOption={activeOption}
            handleOptionChange={handleOptionChange}
          />
        ))}
      </View>
    </ScrollView>
  );
};

// Todo - Move content outside the component

const Competitors = () => {
  const cryptosData = [
    {
      crypto: 'Ethereum',
      symbol: 'ETH',
      image: require('../../../../../../../../assets/ETH.png'),
      maxValue: Infinity,
      percentageValue: 100,
      inflationary: false,
      marketCap: 250.3,
      tvl: 26.6,
      color: '#F9638F',
      tps: [11.14],
      fee: 1.3,
    },
    {
      crypto: 'Solana',
      symbol: 'SOL',
      image: require('../../../../../../../../assets/SOL.png'),
      maxValue: Infinity,
      percentageValue: 75,
      inflationary: null,
      marketCap: 25.7,
      tvl: 0.67,
      color: '#3ADF00',
      tps: [65000],
      fee: 0.01,
    },
    {
      crypto: 'Cardano',
      symbol: 'ADA',
      image: require('../../../../../../../../assets/ADA.png'),
      maxValue: '45 billion ADA',
      percentageValue: 78,
      inflationary: true,
      marketCap: 13.4,
      tvl: 0.25,
      color: '#F9B208',
      tps: [1000],
      fee: 0.07,
    },
    {
      crypto: 'Avalanche',
      symbol: 'AVAX',
      image: require('../../../../../../../../assets/AVAX.png'),
      maxValue: '720 million AVAX',
      percentageValue: 49,
      inflationary: false,
      marketCap: 7.9,
      tvl: 3,
      color: '#F8E405',
      tps: [4500, 6500],
      fee: 0.96,
    },
  ];

  const content = [
    {
      name: 'Type Of Token',
      component: <TypeOfToken tokens={cryptosData} />,
      icon: 'dot-circle-o',
    },
    {
      name: 'Circulating Supply',
      component: <CirculatingSupply cryptos={cryptosData} />,
      icon: 'rotate-right',
    },
    {
      name: 'Current Market Cap',
      component: <CurrentMarketCap cryptos={cryptosData} />,
      icon: '',
    },
    {
      name: 'TVL',
      component: <TotalValueLocked cryptos={cryptosData} />,
      icon: '',
    },
    {
      name: 'Daily Active Users',
      component: <DailyActiveUsers cryptos={cryptosData} />,
      icon: 'user',
    },
    {
      name: 'Transaction Fees',
      component: <TransactionFees cryptos={cryptosData} />,
      icon: 'dollar',
    },
    {
      name: 'Transaction Speed',
      component: <TransactionSpeed cryptos={cryptosData} />,
      icon: 'clock-o',
    },
    {name: 'Inflation Rate', component: <></>, icon: 'thermometer-empty'},
    {name: 'APR', component: <></>, icon: 'calculator'},
    {name: 'Active Developers', component: <></>, icon: 'desktop'},
    {name: 'Revenue', component: <></>, icon: ''},
  ];

  const [activeOption, setActiveOption] = useState(content[0]);

  const handleOptionChange = option => {
    setActiveOption(option);
  };

  return (
    <View style={styles.container}>
      <CompetitorsMenu
        options={content}
        activeOption={activeOption}
        handleOptionChange={handleOptionChange}
      />
      <View style={styles.selectedOptionContent}>
        <CompetitorSection
          title={activeOption.name}
          component={activeOption.component}
        />
      </View>
    </View>
  );
};

export default Competitors;
