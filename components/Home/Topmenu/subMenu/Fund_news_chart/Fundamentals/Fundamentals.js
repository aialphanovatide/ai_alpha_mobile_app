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
import UpdatedRevenueModel from './SubSections/RevenueModel/UpdatedRevenueModel';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
import {getService} from '../../../../../../services/aiAlphaApi';
import {fundamentalsMock} from '../../../../../../assets/static_data/fundamentalsMock';
import TokenUtility from './SubSections/TokenUtility/TokenUtility';
import AboutModal from '../../../../../AboutModal/AboutModal';
import {fundamentals_static_content} from '../../../../../../assets/static_data/fundamentalsStaticData';
import {useFocusEffect, useScrollToTop} from '@react-navigation/native';
import BackgroundGradient from '../../../../../BackgroundGradient/BackgroundGradient';
import {HeaderVisibilityContext} from '../../../../../../context/HeadersVisibilityContext';
import {throttle} from 'lodash';
import {useScreenOrientation} from '../../../../../../hooks/useScreenOrientation';

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

// Main component that renders all the sections of the Fundamentals page and handles the requests to the API to get the data of each section. It also handles the state of the content of each section and the state of the about modal, and the state of the loading of the page.

const Fundamentals = () => {
  const {activeSubCoin} = useContext(TopMenuContext);
  const [coin, setCoin] = useState(activeSubCoin);
  const styles = useFundamentalsStyles();
  const [sharedData, setSharedData] = useState([]);
  const [fundamentalsData, setFundamentalsData] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [hasContent, setHasContent] = useState(initialContentState);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');
  const [aboutTitle, setAboutTitle] = useState('About');
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const ref = useRef(null);

  const handleAboutPress = (description = null, title = null) => {
    if (description) {
      setAboutDescription(description);
    }

    if (title) {
      setAboutTitle(title);
    }

    setAboutVisible(!aboutVisible);
  };

  useScrollToTop(ref);

  const handleSectionContent = (section, value) => {
    setHasContent(prevState => ({
      ...prevState,
      [section]: value,
    }));
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

      console.log(
        `- Successfully requested fundamentals data for ${coin}. Status: ${results[0].status}`,
      );
      setFundamentalsData(data);
    } catch (error) {
      console.error(`Error fetching crypto data: ${error.message}`);
      setFundamentalsData(null);
    } finally {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setGlobalLoading(false);
    }
  };

  // Function to handle the requests to the API to get the data of a specific section. It receives the endpoint of the section as a parameter.

  const getSectionData = async endpoint => {
    const data = await getService(endpoint);
    return data;
  };

  useEffect(() => {
    setGlobalLoading(true);
    getAllFundamentalsData(coin && coin !== undefined ? coin : activeSubCoin);
    const handleCoinUpdate = newCoin => {
      setCoin(newCoin);
      setHasContent(initialContentState);
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

  useFocusEffect(() => {
    if (isLandscape && isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
    }
  });

  // Functions to handle the scrolling interaction that hides the menu

  const {showHeader, hideHeader} = useContext(HeaderVisibilityContext);
  const scrollOffset = useRef(0);
  const scrollViewRef = useRef(null);

  const handleScroll = throttle(event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;

    if (diff > 40 && currentOffset > 180) {
      hideHeader('TopMenu');
      hideHeader('SubMenu');
    } else if (diff < -40) {
      showHeader('TopMenu');
      showHeader('SubMenu');
    }

    scrollOffset.current = currentOffset;
  }, 350);

  const onScroll = event => {
    event.persist();
    handleScroll(event);
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={styles.backgroundColor}
      ref={scrollViewRef}
      onScroll={onScroll}
      scrollEventThrottle={16}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        {aboutVisible && (
          <AboutModal
            title={aboutTitle}
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
          description={fundamentals_static_content.upgrades.sectionDescription}
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
  );
};

export default Fundamentals;
