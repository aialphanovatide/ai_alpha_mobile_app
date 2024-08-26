import {
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {getService} from '../../../../../../services/aiAlphaApi';
import {fundamentalsMock} from './fundamentalsMock';
import TokenUtility from './SubSections/TokenUtility/TokenUtility';
import AboutModal from './AboutModal';
import {fundamentals_static_content} from './fundamentalsStaticData';
import LinearGradient from 'react-native-linear-gradient';
import {useScrollToTop} from '@react-navigation/native';

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

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Fundamentals = ({route}) => {
  const {activeSubCoin} = useContext(TopMenuContext);
  const [coin, setCoin] = useState(activeSubCoin);
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useFundamentalsStyles();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');
  const [currentContent, setCurrentContent] = useState(fundamentalsMock[coin]);
  const [sharedData, setSharedData] = useState([]);
  const [fundamentalsData, setFundamentalsData] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [hasContent, setHasContent] = useState(initialContentState);
  const ref = useRef(null);

  useScrollToTop(ref);

  const handleSectionContent = (section, value) => {
    setHasContent(prevState => ({
      ...prevState,
      [section]: value,
    }));
  };

  const handleAboutPress = (description = null) => {
    if (description) {
      setAboutDescription(description);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAboutVisible(!aboutVisible);
  };

  // Function to handle the requests to all the endpoints related to the coin

  const getAllFundamentalsData = async () => {
    setGlobalLoading(true);
    const endpoints = [
      `/api/get_competitors_by_coin_name?coin_name=${coin}`,
      `/api/get_tokenomics?coin_name=${coin}`,
      `/api/get_introduction?coin_name=${coin}`,
      `/api/get_revenue_models?coin_name=${coin}`,
      `/api/hacks?coin_bot_name=${coin}`,
      `/api/get_upgrades?coin_name=${coin}`,
      `/api/dapps?coin_bot_name=${coin}`,
    ];

    try {
      const results = await Promise.all(
        endpoints.map(endpoint => getService(endpoint)),
      );

      const data = {
        competitors: results[0],
        tokenomics: results[1],
        introduction: results[2],
        revenueModels: results[3],
        hacks: results[4],
        upgrades: results[5],
        dapps: results[6],
      };

      console.log('Fundamentals all data: ', data);
      setFundamentalsData(data);
    } catch (error) {
      console.error(`Error fetching crypto data: ${error.message}`);
      setFundamentalsData(null);
    } finally {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setGlobalLoading(false);
    }
  };

  const getSectionData = async endpoint => {
    const data = await getService(endpoint);
    return data;
  };

  useEffect(() => {
    setGlobalLoading(true);
    getAllFundamentalsData(coin && coin !== undefined ? coin : activeSubCoin);
    const handleCoinUpdate = newCoin => {
      setCurrentContent(fundamentalsMock[newCoin]);
      setCoin(newCoin);
      setHasContent(initialContentState);
      // console.log(`Updating content from coin ${coin} to ${newCoin}`);
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
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.22, 0.97]}
      style={styles.linearGradient}>
      <ScrollView
        nestedScrollEnabled={true}
        style={styles.backgroundColor}
        ref={ref}>
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
                loading={globalLoading}
                globalData={fundamentalsData}
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
                globalData={fundamentalsData}
                loading={globalLoading}
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
                loading={globalLoading}
                globalData={fundamentalsData}
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
                loading={globalLoading}
                globalData={fundamentalsData}
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
                loading={globalLoading}
                globalData={fundamentalsData}
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
                tokenomicsData={
                  fundamentalsData
                    ? fundamentalsData.tokenomics.status !== 200
                      ? []
                      : fundamentalsData.tokenomics.message.tokenomics_data
                    : []
                }
                subsectionsData={
                  fundamentals_static_content.competitors.subsections
                }
                handleAboutPress={handleAboutPress}
                loading={globalLoading}
                globalData={fundamentalsData}
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
                globalData={fundamentalsData}
                loading={globalLoading}
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
                globalData={fundamentalsData}
                loading={globalLoading}
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
                globalData={fundamentalsData}
                loading={globalLoading}
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
                globalData={fundamentalsData}
                loading={globalLoading}
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
