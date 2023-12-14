import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './CompetitorsStyles';
import TypeOfToken from './CompetitorSections/TypeOfToken/TypeOfToken';
import CompetitorSection from './CompetitorSections/CompetitorSection';
import CirculatingSupply from './CompetitorSections/CirculatingSupply/CirculatingSupply';

const MenuItem = ({item, activeOption, handleOptionChange}) => {
  return (
    <TouchableOpacity onPress={() => handleOptionChange(item)}>
      <View style={styles.menuItemContainer}>
        {item.icon && (
          <Icon
            style={styles.itemIcon}
            name={item.icon}
            size={15}
            color={activeOption.name === item.name ? 'orange' : 'gray'}
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
      image: 'ETH',
      maxValue: Infinity,
      percentageValue: 100,
      inflationary: false,
    },
    {
      crypto: 'Solana',
      image: 'SOL',
      maxValue: Infinity,
      percentageValue: 75,
      inflationary: null,
    },
    {
      crypto: 'Cardano',
      image: 'ADA',
      maxValue: '45 billion ADA',
      percentageValue: 78,
      inflationary: true,
    },
    {
      crypto: 'Avalanche',
      image: 'AVAX',
      maxValue: '720 million AVAX',
      percentageValue: 49,
      inflationary: false,
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
      icon: 'arrow-circle-o-down',
    },
    {name: 'Current Market Cap', component: <></>, icon: ''},
    {name: 'TVL', component: <></>, icon: ''},
    {name: 'Daily Active Users', component: <></>, icon: 'user'},
    {name: 'Transaction Fees', component: <></>, icon: 'dollar'},
    {name: 'Transaction Speed', component: <></>, icon: 'clock-o'},
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
