import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
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
import {fundamentalsMock} from '../../fundamentalsMock';
import Loader from '../../../../../../../Loader/Loader';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';

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
        tintColor={theme.fundamentalsCompetitorsItemBg}>
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

const Competitors = ({
  getSectionData,
  coin,
  cryptosData,
  tokenomicsData,
  subsectionsData,
  handleAboutPress,
}) => {
  const styles = useCompetitorsStyles();
  const [competitorsData, setCompetitorsData] = useState([]);
  const [loading, setLoading] = useState(true);
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
      component: (
        <CurrentMarketCap
          cryptos={cryptosData}
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/cmc.png'),
      sectionDescription: subsectionsData.marketCap.sectionDescription,
    },
    {
      name: 'Supply Model',
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
      sectionDescription: subsectionsData.supplyModel.sectionDescription,
    },
    {
      name: 'Type Of Token',
      component: (
        <TypeOfToken
          tokens={cryptosData}
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/typeoftoken.png'),
      sectionDescription: subsectionsData.typeOfToken.sectionDescription,
    },
    {
      name: 'TVL',
      component: (
        <TotalValueLocked
          cryptos={cryptosData}
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/TVL.png'),
      sectionDescription: subsectionsData.TVL.sectionDescription,
    },
    {
      name: 'Daily Active Users',
      component: (
        <DailyActiveUsers
          cryptos={cryptosData}
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/dailyusers.png'),
      sectionDescription: subsectionsData.dailyActiveUsers.sectionDescription,
    },
    {
      name: 'Transaction Fees',
      component: (
        <TransactionFees
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/tfee.png'),
      sectionDescription: subsectionsData.transactionFees.sectionDescription,
    },
    {
      name: 'Transaction Speed',
      component: (
        <TransactionSpeed
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/tspeed.png'),
      sectionDescription: subsectionsData.transactionSpeed.sectionDescription,
    },
    {
      name: 'Inflation Rate',
      component: (
        <InflationRate
          cryptos={cryptosData}
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/inflationrate.png'),
      sectionDescription: subsectionsData.inflationRate.sectionDescription,
    },
    {
      name: 'APR',
      component: (
        <Apr
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/apr.png'),
      sectionDescription: subsectionsData.APR.sectionDescription,
    },
    {
      name: 'Active Developers',
      component: (
        <ActiveDevelopers
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/activedevs.png'),
      sectionDescription: subsectionsData.activeDevelopers.sectionDescription,
    },
    {
      name: 'Revenue',
      component: (
        <Revenue
          competitorsData={competitorsData}
          isSectionWithoutData={isSectionWithoutData}
        />
      ),
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/revenue.png'),
      sectionDescription: subsectionsData.revenue.sectionDescription,
    },
  ];

  useEffect(() => {
    setLoading(true);
    setCompetitorsData([]);
    const fetchCompetitorsData = async coin => {
      try {
        const response = await getSectionData(
          `/api/get_competitors_by_coin_name?coin_name=${coin}`,
        );
        if (response.status !== 200) {
          setCompetitorsData([]);
        } else {
          setCompetitorsData(response.competitors);
        }
      } catch (error) {
        console.log('Error trying to get competitors data: ', error);
      } finally {
        setActiveOption(content[0]);
        setLoading(false);
      }
    };
    fetchCompetitorsData(coin);
  }, [coin, getSectionData]);

  const handleOptionChange = option => {
    setActiveOption(option);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : competitorsData.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
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
        </>
      )}
    </View>
  );
};

export default Competitors;
