import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useContext, useState} from 'react';
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
import InflationRate from './CompetitorSections/InflationRate/InflationRate';
import useCompetitorsStyles from './CompetitorsStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import {fundamentalsMock} from '../../fundamentalsMock';

const MenuItem = ({item, activeOption, handleOptionChange, styles}) => {
  const {theme} = useContext(AppThemeContext);
  return (
    <TouchableOpacity onPress={() => handleOptionChange(item)}>
      <ImageBackground
        source={
          activeOption.name === item.name
            ? require('../../../../../../../../assets/images/fundamentals/competitors/competitors-active-item.png')
            : require('../../../../../../../../assets/images/fundamentals/competitors/competitors-inactive-item.png')
        }
        style={styles.menuItemContainer}
        resizeMode="contain"
        tintColor={theme.secondaryBoxesBgColor}>
        <View style={styles.iconContainer}>
          <Image
            style={[
              styles.itemIcon,
              activeOption.name === item.name && {tintColor: theme.orange},
            ]}
            resizeMode={'contain'}
            source={item.icon}
          />
        </View>
        <Text
          style={[
            styles.menuItemName,
            activeOption.name === item.name && styles.activeItem,
          ]}
          numberOfLines={2}>
          {item.name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const CompetitorsMenu = ({
  options,
  activeOption,
  handleOptionChange,
  styles,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}>
      <View style={styles.menuContainer}>
        {options.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            activeOption={activeOption}
            handleOptionChange={handleOptionChange}
            styles={styles}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const Competitors = ({cryptosData, subsectionsData, handleAboutPress}) => {
  const styles = useCompetitorsStyles();

  const content = [
    {
      name: 'Current Market Cap',
      component: <CurrentMarketCap cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/cmc.png'),
      sectionDescription: subsectionsData.marketCap.sectionDescription,
    },
    {
      name: 'Supply Model',
      component: <CirculatingSupply cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/circulatingsupply.png'),
      sectionDescription: subsectionsData.supplyModel.sectionDescription,
    },

    {
      name: 'Type Of Token',
      component: <TypeOfToken tokens={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/typeoftoken.png'),
      sectionDescription: subsectionsData.typeOfToken.sectionDescription,
    },
    {
      name: 'TVL',
      component: <TotalValueLocked cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/TVL.png'),
      sectionDescription: subsectionsData.TVL.sectionDescription,
    },
    {
      name: 'Daily Active Users',
      component: <DailyActiveUsers cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/dailyusers.png'),
      sectionDescription: subsectionsData.dailyActiveUsers.sectionDescription,
    },
    {
      name: 'Transaction Fees',
      component: <TransactionFees cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/tfee.png'),
      sectionDescription: subsectionsData.transactionFees.sectionDescription,
    },
    {
      name: 'Transaction Speed',
      component: <TransactionSpeed cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/tspeed.png'),
      sectionDescription: subsectionsData.transactionSpeed.sectionDescription,
    },
    {
      name: 'Inflation Rate',
      component: <InflationRate cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/inflationrate.png'),
      sectionDescription: subsectionsData.inflationRate.sectionDescription,
    },
    {
      name: 'APR',
      component: <Apr cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/apr.png'),
      sectionDescription: subsectionsData.APR.sectionDescription,
    },
    {
      name: 'Active Developers',
      component: <ActiveDevelopers cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/activedevs.png'),
      sectionDescription: subsectionsData.activeDevelopers.sectionDescription,
    },
    {
      name: 'Revenue',
      component: <Revenue cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/revenue.png'),
      sectionDescription: subsectionsData.revenue.sectionDescription,
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
        styles={styles}
      />
      <View style={styles.selectedOptionContent}>
        <CompetitorSection
          handleAboutPress={handleAboutPress}
          title={activeOption.name}
          description={activeOption.sectionDescription}
          component={activeOption.component}
          styles={styles}
        />
      </View>
    </View>
  );
};

export default Competitors;
