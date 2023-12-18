import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './CompetitorsStyles';
import TypeOfToken from './CompetitorSections/TypeOfToken/TypeOfToken';
import CompetitorSection from './CompetitorSections/CompetitorSection';
import CirculatingSupply from './CompetitorSections/CirculatingSupply/CirculatingSupply';
import DailyActiveUsers from './CompetitorSections/DailyActiveUsers/DailyActiveUsers';
import TransactionFees from './CompetitorSections/TransactionFees/TransactionFees';
import CurrentMarketCap from './CompetitorSections/CurrentMarketCap/CurrentMarketCap';
import TotalValueLocked from './CompetitorSections/TVL/Tvl';
import TransactionSpeed from './CompetitorSections/TransactionSpeed/TransactionSpeed';
import Apr from './CompetitorSections/APR/Apr';
import Revenue from './CompetitorSections/Revenue/Revenue';
import ActiveDevelopers from './CompetitorSections/ActiveDevelopers/ActiveDevelopers';

const MenuItem = ({item, activeOption, handleOptionChange}) => {
  return (
    <TouchableOpacity onPress={() => handleOptionChange(item)}>
      <View style={styles.menuItemContainer}>
        <View style={styles.iconContainer}>
          <Image
            style={[
              styles.itemIcon,
              activeOption.name === item.name && {tintColor: '#FB6822'},
            ]}
            resizeMode={'contain'}
            source={item.icon}
          />
        </View>
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
      marketCap: [250.3, 250331978.508],
      tvl: 26.6,
      color: '#F9638F',
      tps: [11.14],
      fee: 1.3,
      apr: 4.44,
      revenue: 2.48,
      activeDevs: 162.87,
    },
    {
      crypto: 'Solana',
      symbol: 'SOL',
      image: require('../../../../../../../../assets/SOL.png'),
      maxValue: Infinity,
      percentageValue: 75,
      inflationary: null,
      marketCap: [25.7, 25696025.115],
      tvl: 0.67,
      color: '#3ADF00',
      tps: [65000],
      fee: 0.01,
      apr: 8.69,
      revenue: 0.019,
      activeDevs: 82.57,
    },
    {
      crypto: 'Cardano',
      symbol: 'ADA',
      image: require('../../../../../../../../assets/ADA.png'),
      maxValue: '45 billion ADA',
      percentageValue: 78,
      inflationary: true,
      marketCap: [13.4, 13412098.765],
      tvl: 0.25,
      color: '#F9B208',
      tps: [1000],
      fee: 0.07,
      apr: 6.94,
      revenue: 0.16,
      activeDevs: 166.8,
    },
    {
      crypto: 'Avalanche',
      symbol: 'AVAX',
      image: require('../../../../../../../../assets/AVAX.png'),
      maxValue: '720 million AVAX',
      percentageValue: 49,
      inflationary: false,
      marketCap: [7.9, 7974837.865],
      tvl: 3,
      color: '#F8E405',
      tps: [4500, 6500],
      fee: 0.96,
      apr: 3.14,
      revenue: 0.033,
      activeDevs: 47.17,
    },
  ];

  const content = [
    {
      name: 'Type Of Token',
      component: <TypeOfToken tokens={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/typeoftoken.png'),
    },
    {
      name: 'Circulating Supply',
      component: <CirculatingSupply cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/circulatingsupply.png'),
    },
    {
      name: 'Current Market Cap',
      component: <CurrentMarketCap cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/cmc.png'),
    },
    {
      name: 'TVL',
      component: <TotalValueLocked cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/TVL.png'),
    },
    {
      name: 'Daily Active Users',
      component: <DailyActiveUsers cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/dailyusers.png'),
    },
    {
      name: 'Transaction Fees',
      component: <TransactionFees cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/tfee.png'),
    },
    {
      name: 'Transaction Speed',
      component: <TransactionSpeed cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/tspeed.png'),
    },
    {
      name: 'Inflation Rate',
      component: <></>,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/inflationrate.png'),
    },
    {
      name: 'APR',
      component: <Apr cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/apr.png'),
    },
    {
      name: 'Active Developers',
      component: <ActiveDevelopers cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/activedevs.png'),
    },
    {
      name: 'Revenue',
      component: <Revenue cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/revenue.png'),
    },
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
