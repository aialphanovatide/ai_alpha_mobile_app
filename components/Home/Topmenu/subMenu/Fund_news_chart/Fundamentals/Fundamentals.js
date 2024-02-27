import {Text, ScrollView, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import SubSection from './SubSections/SubSection';
import Introduction from './SubSections/Introduction/Introduction.js';
import Tokenomics from './SubSections/Tokenomics/Tokenomics.js';
import GeneralTokenAllocation from './SubSections/GeneralTokenAllocation/GeneralTokenAllocation.js';
import ValueAccrualMechanisms from './SubSections/ValueAccrualMechanisms/ValueAccrualMechanisms.js';
import Competitors from './SubSections/Competitors/Competitors';
import Hacks from './SubSections/Hacks/Hacks';
import Upgrades from './SubSections/UpgradesSection/Upgrades';
import DApps from './SubSections/DApps/DApps';
import useFundamentalsStyles from './FundamentalsStyles';
import {AppThemeContext} from '../../../../../../context/themeContext';
import UpdatedRevenueModel from './SubSections/RevenueModel/UpdatedRevenueModel';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
import {altGetService, getService} from '../../../../../../services/aiAlphaApi';
import {fundamentalsMock} from './fundamentalsMock';
import TokenUtility from './SubSections/TokenUtility/TokenUtility';
import AboutModal from './AboutModal';
import {fundamentals_static_content} from './fundamentalsStaticData';
import VestingSchedule from './SubSections/VestingSchedule/VestingSchedule';

const Fundamentals = ({route}) => {
  const {activeSubCoin} = useContext(TopMenuContext);
  console.log(route);
  const initial_coin = route ? route.params.activeCoin : activeSubCoin;
  const [coin, setCoin] = useState(initial_coin);
  // const coin = 'eth';
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useFundamentalsStyles();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');
  const [currentContent, setCurrentContent] = useState(fundamentalsMock[coin]);
  const [sharedData, setSharedData] = useState([]);

  const handleAboutPress = (description = null) => {
    if (description) {
      setAboutDescription(description);
    }
    setAboutVisible(!aboutVisible);
  };

  const getSectionData = async endpoint => {
    const data = await getService(endpoint);
    return data;
  };

  useEffect(() => {
    const handleCoinUpdate = newCoin => {
      setCurrentContent(fundamentalsMock[newCoin]);
      setCoin(newCoin);
      console.log(`Updating content from coin ${coin} to ${newCoin}`);
    };

    handleCoinUpdate(activeSubCoin);
  }, [coin, activeSubCoin]);

  useEffect(() => {
    const fetchTokenomicsData = async () => {
      try {
        const response = await getSectionData(
          `/api/get_tokenomics?coin_name=${coin}`,
        );

        if (response.status !== 200) {
          setSharedData([]);
        } else {
          // console.log(response.message.tokenomics_data);
          const parsed_cryptos = response.message.tokenomics_data;
          setSharedData(parsed_cryptos);
        }
      } catch (error) {
        console.log('Error trying to get tokenomics data: ', error);
      }
    };
    fetchTokenomicsData();
  }, [coin]);

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.backgroundColor}>
      <SafeAreaView style={styles.container}>
        {aboutVisible && (
          <AboutModal
            description={aboutDescription}
            onClose={handleAboutPress}
            visible={aboutVisible}
          />
        )}
        <Text style={styles.title}>Fundamentals</Text>
        <SubSection
        <SubSection
          subtitle={'Introduction'}
          content={<Introduction coin={coin} getSectionData={getSectionData} />}
          handleAboutPress={handleAboutPress}
        />
        <SubSection
          handleAboutPress={handleAboutPress}
          subtitle={'Tokenomics'}
          content={
            <Tokenomics
              content={currentContent.tokenomics.content}
              getSectionData={getSectionData}
              coin={coin}
            />
          }
          hasAbout={true}
          description={
            fundamentals_static_content.tokenomics.sectionDescription
          }
        />
        <SubSection
          subtitle={'Token Distribution'}
          content={
            <GeneralTokenAllocation
              chartData={currentContent.tokenDistribution.chartData}
              getSectionData={getSectionData}
              coin={coin}
            />
          }
          hasAbout
          handleAboutPress={handleAboutPress}
          description={
            fundamentals_static_content.tokenDistribution.sectionDescription
          }
        />
        <SubSection
          subtitle={'Vesting Schedule'}
          content={
            <VestingSchedule
              crypto={currentContent.vestingSchedules?.displayName}
              schedules={currentContent.vestingSchedules?.schedules}
            />
          }
          hasAbout
          handleAboutPress={handleAboutPress}
          description={
            fundamentals_static_content.vestingSchedule.sectionDescription
          }
        />
        <SubSection
          subtitle={'Token Utility'}
          content={
            <TokenUtility
              getSectionData={getSectionData}
              coin={coin}
              content={currentContent.tokenUtility.content}
            />
          }
          hasAbout
          handleAboutPress={handleAboutPress}
          description={
            fundamentals_static_content.tokenUtility.sectionDescription
          }
        />
        <SubSection
          subtitle={'Value Accrual Mechanisms'}
          content={
            <ValueAccrualMechanisms
              contentData={currentContent.valueAccrualMechanisms.content}
              getSectionData={getSectionData}
              coin={coin}
            />
          }
          hasAbout
          handleAboutPress={handleAboutPress}
          description={
            fundamentals_static_content.valueAccrualMechanisms
              .sectionDescription
          }
        />
        <SubSection
          subtitle={'Competitors'}
          content={
            <Competitors
              coin={coin}
              getSectionData={getSectionData}
              tokenomicsData={sharedData}
              cryptosData={currentContent.competitors.cryptosData}
              subsectionsData={
                fundamentals_static_content.competitors.subsections
              }
              handleAboutPress={handleAboutPress}
            />
          }
          hasAbout
          handleAboutPress={handleAboutPress}
          description={
            fundamentals_static_content.competitors.sectionDescription
          }
        />
        <SubSection
          subtitle={'Revenue Model'}
          hasAbout
          handleAboutPress={handleAboutPress}
          content={
            <UpdatedRevenueModel
              revenues={currentContent.revenueModel?.revenues}
              getSectionData={getSectionData}
              coin={coin}
            />
          }
          description={
            fundamentals_static_content.revenueModel.sectionDescription
          }
        />
        <SubSection
          hasAbout
          handleAboutPress={handleAboutPress}
          subtitle={'Hacks'}
          content={<Hacks getSectionData={getSectionData} coin={coin} />}
          description={fundamentalsMock.eth.hacks.sectionDescription}
        />
        <SubSection
          hasAbout
          handleAboutPress={handleAboutPress}
          subtitle={'Upgrades'}
          description={fundamentals_static_content.upgrades.sectionDescription}
          content={
            <Upgrades
              events={currentContent.upgrades.events}
              getSectionData={getSectionData}
              coin={coin}
            />
          }
        />
        <SubSection
          hasAbout
          handleAboutPress={handleAboutPress}
          subtitle={'DApps'}
          content={
            <DApps
              content={currentContent.dApps}
              getSectionData={getSectionData}
              coin={coin}
            />
          }
          description={fundamentals_static_content.dApps.sectionDescription}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Fundamentals;
