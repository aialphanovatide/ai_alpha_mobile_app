import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';
import ActiveTriangle from '../../../../../../../../assets/images/fundamentals/competitors/active-triangle.svg';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MenuItem = ({item, activeOption, handleOptionChange, styles}) => {
  const {theme} = useContext(AppThemeContext);
  return (
    <View style={styles.relativeContainer}>
      <TouchableOpacity
        onPress={() => handleOptionChange(item)}
        style={styles.menuItemContainer}>
        {/* <ImageBackground
        source={
          activeOption.name === item.name
            ? require('../../../../../../../../assets/images/fundamentals/competitors/competitors-active-item.png')
            : require('../../../../../../../../assets/images/fundamentals/competitors/competitors-inactive-item.png')
        }
        style={styles.menuItemContainer}
        resizeMode="contain"
        tintColor={theme.fundamentalsCompetitorsItemBg}> */}
        <Image
          style={[
            styles.itemIcon,
            activeOption.name === item.name && {tintColor: theme.orange},
          ]}
          resizeMode={'contain'}
          source={item.icon}
        />
        <Text
          style={[
            styles.menuItemName,
            activeOption.name === item.name && styles.activeItem,
          ]}
          numberOfLines={2}>
          {item.menuTitle}
        </Text>
        {/* </ImageBackground> */}
      </TouchableOpacity>
      {activeOption.name === item.name && (
        <ActiveTriangle style={styles.activeTriangle} />
      )}
    </View>
  );
};

const CompetitorsMenu = ({
  options,
  activeOption,
  handleOptionChange,
  styles,
  competitorsData,
  isSectionWithoutData,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}>
      <View style={styles.menuContainer}>
        {options.map((item, index) =>
          !isSectionWithoutData(competitorsData, item.keyName, '-') ? (
            <MenuItem
              key={index}
              item={item}
              activeOption={activeOption}
              handleOptionChange={handleOptionChange}
              styles={styles}
            />
          ) : (
            <View key={index} style={styles.none} />
          ),
        )}
      </View>
    </ScrollView>
  );
};

const Competitors = ({
  getSectionData,
  coin,
  cryptosData,
  tokenomicsData,
  subsectionsData,
  handleAboutPress,
  handleSectionContent,
  globalData,
  loading,
}) => {
  const styles = useCompetitorsStyles();
  const [competitorsData, setCompetitorsData] = useState([]);
  const [activeOption, setActiveOption] = useState(null);

  const isSectionWithoutData = (data, key, nullSymbol) => {
    const has_one_key = data.find(datum => datum.competitor.key.includes(key));

    if (has_one_key && has_one_key !== undefined) {
      const found = data.find(
        datum =>
          datum.competitor.key.includes(key) &&
          datum.competitor.value !== nullSymbol,
      );
      return found && found !== undefined ? false : true;
    }

    return true;
  };

  const content = [
    {
      name: 'Current Market Cap',
      menuTitle: 'Current\nMarket Cap',
      component: (
        <CurrentMarketCap
          coin={coin}
          cryptos={cryptosData}
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
          loading={loading}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/cmc.png'),
      keyName: 'current market cap',
      sectionDescription: subsectionsData.marketCap.sectionDescription,
    },
    {
      name: 'Supply Model',
      menuTitle: 'Supply \n Model',
      component: (
        <CirculatingSupply
          getSectionData={getSectionData}
          competitorsData={competitorsData}
          tokenomicsData={tokenomicsData}
          cryptos={cryptosData}
          coin={coin}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/circulatingsupply.png'),
      keyName: 'circulating supply',
      sectionDescription: subsectionsData.supplyModel.sectionDescription,
    },
    {
      name: 'Type Of Token',
      menuTitle: 'Type of \nToken',
      component: (
        <TypeOfToken
          tokens={cryptosData}
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/typeoftoken.png'),
      keyName: 'type of token',
      sectionDescription: subsectionsData.typeOfToken.sectionDescription,
    },
    {
      name: 'TVL',
      menuTitle: 'TVL',
      component: (
        <TotalValueLocked
          cryptos={cryptosData}
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/TVL.png'),
      keyName: 'tvl',
      sectionDescription: subsectionsData.TVL.sectionDescription,
    },
    {
      name: 'Daily Active Users',
      menuTitle: 'Daily Active \nUsers',
      component: (
        <DailyActiveUsers
          cryptos={cryptosData}
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/dailyusers.png'),
      keyName: 'daily active users',
      sectionDescription: subsectionsData.dailyActiveUsers.sectionDescription,
    },
    {
      name: 'Transaction Fees',
      menuTitle: 'Transaction \nFees',
      component: (
        <TransactionFees
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/tfee.png'),
      keyName: 'transaction fees',
      sectionDescription: subsectionsData.transactionFees.sectionDescription,
    },
    {
      name: 'Transaction Speed',
      menuTitle: 'Transaction \nSpeed',
      component: (
        <TransactionSpeed
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/tspeed.png'),
      keyName: 'transaction speed',
      sectionDescription: subsectionsData.transactionSpeed.sectionDescription,
    },
    {
      name: 'Inflation Rate',
      menuTitle: 'Inflation \nRate',
      component: (
        <InflationRate
          cryptos={cryptosData}
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/inflationrate.png'),
      keyName: 'inflation rate',
      sectionDescription: subsectionsData.inflationRate.sectionDescription,
    },
    {
      name: 'APR',
      menuTitle: 'APR',
      component: (
        <Apr
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/apr.png'),
      keyName: 'apr',
      sectionDescription: subsectionsData.APR.sectionDescription,
    },
    {
      name: 'Active Developers',
      menuTitle: 'Active \nDevelopers',
      component: (
        <ActiveDevelopers
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/activedevs.png'),
      keyName: 'active developers',
      sectionDescription: subsectionsData.activeDevelopers.sectionDescription,
    },
    {
      name: 'Revenue',
      menuTitle: 'Revenue',
      component: (
        <Revenue
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/revenue.png'),
      keyName: 'revenue',
      sectionDescription: subsectionsData.revenue.sectionDescription,
    },
  ];

  useEffect(() => {
    const fetchCompetitorsData = coin => {
      if (!globalData || globalData.competitors.status !== 200) {
        setCompetitorsData([]);
      } else {
        setCompetitorsData(globalData.competitors.competitors);
      }
      setActiveOption(content[0]);
    };
    fetchCompetitorsData(coin);
  }, [globalData, coin, getSectionData]);

  useEffect(() => {
    if (!loading && competitorsData?.length === 0) {
      handleSectionContent('competitors', true);
    }
  }, [competitorsData, loading, handleSectionContent]);

  // Function to handle the active competitors section, changing the active one, by default, it is set to the Current Market Cap section.

  const handleOptionChange = option => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveOption(option);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <SkeletonLoader type="competitors" quantity={5} />
          <SkeletonLoader type="chart" />
        </>
      ) : competitorsData.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          <CompetitorsMenu
            options={content}
            activeOption={activeOption}
            handleOptionChange={handleOptionChange}
            styles={styles}
            competitorsData={competitorsData}
            isSectionWithoutData={isSectionWithoutData}
          />
          {isSectionWithoutData(competitorsData, activeOption.keyName, '-') ? (
            <></>
          ) : (
            <View style={styles.selectedOptionContent}>
              <CompetitorSection
                handleAboutPress={handleAboutPress}
                title={activeOption.name}
                description={activeOption.sectionDescription}
                component={activeOption.component}
                styles={styles}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Competitors;
