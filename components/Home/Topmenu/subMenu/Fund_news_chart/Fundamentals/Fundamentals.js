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
import LinearGradient from 'react-native-linear-gradient';

const initialContentState = {
  introduction: false,
  tokenomics: false,
  generalTokenAllocation: false,
  tokenUtility: false,
  valueAccrualMechanisms: false,
  competitors: false,
  revenueModel: false,
  hacks: false,
  upgrades: false,
  dapps: false,
};

const Fundamentals = ({route}) => {
  const {activeSubCoin} = useContext(TopMenuContext);
  const initial_coin = activeSubCoin;
  const [coin, setCoin] = useState(initial_coin);
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useFundamentalsStyles();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');
  const [currentContent, setCurrentContent] = useState(fundamentalsMock[coin]);
  const [sharedData, setSharedData] = useState([]);
  const [hasContent, setHasContent] = useState(initialContentState);

  const handleSectionContent = (section, value) => {
    setHasContent((prevState) => ({
      ...prevState,
      [section]: value,
    }));
  };

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
      setHasContent(initialContentState);
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

        if (response?.status !== 200 || !response?.message) {
          setSharedData([]);
        } else {
          console.log(response.message.tokenomics_data);
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
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={styles.linearGradient}>
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
            subtitle={'Introduction'}
            content={
              <Introduction
                coin={coin}
                getSectionData={getSectionData}
                handleSectionContent={handleSectionContent}
              />
            }
            handleAboutPress={handleAboutPress}
            hasEmptyContent={hasContent.introduction}
          />
          <SubSection
            handleAboutPress={handleAboutPress}
            subtitle={'Tokenomics'}
            content={
              <Tokenomics
                getSectionData={getSectionData}
                coin={coin}
                handleSectionContent={handleSectionContent}
              />
            }
            hasAbout={true}
            description={
              fundamentals_static_content.tokenomics.sectionDescription
            }
            hasEmptyContent={hasContent.tokenomics}
          />
          <SubSection
            subtitle={'Token Distribution'}
            content={
              <GeneralTokenAllocation
                getSectionData={getSectionData}
                coin={coin}
                handleSectionContent={handleSectionContent}
              />
            }
            hasEmptyContent={hasContent.generalTokenAllocation}
            hasAbout
            handleAboutPress={handleAboutPress}
            description={
              fundamentals_static_content.tokenDistribution.sectionDescription
            }
          />
          {/* <SubSection
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
          /> */}
          <SubSection
            subtitle={'Token Utility'}
            hasEmptyContent={hasContent.tokenUtility}
            content={
              <TokenUtility
                getSectionData={getSectionData}
                coin={coin}
                handleSectionContent={handleSectionContent}
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
            hasEmptyContent={hasContent.valueAccrualMechanisms}
            content={
              <ValueAccrualMechanisms
                handleSectionContent={handleSectionContent}
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
            hasEmptyContent={hasContent.competitors}
            subtitle={'Competitors'}
            content={
              <Competitors
                coin={coin}
                getSectionData={getSectionData}
                handleSectionContent={handleSectionContent}
                tokenomicsData={sharedData}
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
            hasEmptyContent={hasContent.revenueModel}
            subtitle={'Revenue Model'}
            hasAbout
            handleAboutPress={handleAboutPress}
            content={
              <UpdatedRevenueModel
                handleSectionContent={handleSectionContent}
                getSectionData={getSectionData}
                coin={coin}
              />
            }
            description={
              fundamentals_static_content.revenueModel.sectionDescription
            }
          />
          <SubSection
            hasEmptyContent={hasContent.hacks}
            hasAbout
            handleAboutPress={handleAboutPress}
            subtitle={'Hacks'}
            content={
              <Hacks
                getSectionData={getSectionData}
                coin={coin}
                handleSectionContent={handleSectionContent}
              />
            }
            description={fundamentalsMock.eth.hacks.sectionDescription}
          />
          <SubSection
            hasAbout
            hasEmptyContent={hasContent.upgrades}
            handleAboutPress={handleAboutPress}
            subtitle={'Upgrades'}
            description={
              fundamentals_static_content.upgrades.sectionDescription
            }
            content={
              <Upgrades
                getSectionData={getSectionData}
                coin={coin}
                handleSectionContent={handleSectionContent}
              />
            }
          />
          <SubSection
            hasAbout
            hasEmptyContent={hasContent.dapps}
            handleAboutPress={handleAboutPress}
            subtitle={'DApps'}
            content={
              <DApps
                getSectionData={getSectionData}
                coin={coin}
                handleSectionContent={handleSectionContent}
              />
            }
            description={fundamentals_static_content.dApps.sectionDescription}
          />
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default Fundamentals;
