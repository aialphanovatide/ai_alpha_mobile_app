import {
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  UIManager,
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
import {getService} from '../../../../../../services/aiAlphaApi';
import {fundamentalsMock} from '../../../../../../assets/static_data/fundamentalsMock';
import TokenUtility from './SubSections/TokenUtility/TokenUtility';
import AboutModal from '../../../../../AboutModal/AboutModal';
import {fundamentals_static_content} from '../../../../../../assets/static_data/fundamentalsStaticData';
import {useScrollToTop} from '@react-navigation/native';
import BackgroundGradient from '../../../../../BackgroundGradient/BackgroundGradient';
import {HeaderVisibilityContext} from '../../../../../../context/HeadersVisibilityContext';
import {throttle} from 'lodash';
import {useScreenOrientation} from '../../../../../../hooks/useScreenOrientation';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchFundamentalsData,
  selectFundamentalsData,
  selectGlobalLoading,
} from '../../../../../../actions/fundamentalsActions';
import {selectActiveSubCoin} from '../../../../../../actions/categoriesActions';
import {
  handleAboutPress,
  handleClose,
  selectAboutDescription,
  selectAboutTitle,
  selectAboutVisible,
} from '../../../../../../store/aboutSlice';

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
  // const {activeSubCoin} = useContext(TopMenuContext);
  const activeSubCoin = useSelector(selectActiveSubCoin);
  const [coin, setCoin] = useState(activeSubCoin);
  const styles = useFundamentalsStyles();
  const fundamentalsData = useSelector(selectFundamentalsData);
  const globalLoading = useSelector(selectGlobalLoading);
  const [loadingState, setLoadingState] = useState(true);
  const [hasContent, setHasContent] = useState(initialContentState);
  const aboutVisible = useSelector(selectAboutVisible);
  const aboutDescription = useSelector(selectAboutDescription);
  const aboutTitle = useSelector(selectAboutTitle);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (globalLoading === 'idle') {
      setLoadingState(true);
    } else {
      setLoadingState(false);
    }
  }, [globalLoading, activeSubCoin]);

  useEffect(() => {
    dispatch(fetchFundamentalsData(activeSubCoin));
  }, [dispatch, activeSubCoin]);

  // Function to handle the about modal visibility and content based on the section that the user clicked on

  const toggleAbout = (description = null, title = null) => {
    dispatch(handleAboutPress({description, title}));
  };

  const closeAbout = () => {
    dispatch(handleClose());
  };

  useScrollToTop(ref);

  const handleSectionContent = (section, value) => {
    setHasContent(prevState => ({
      ...prevState,
      [section]: value,
    }));
  };

  // Function to handle the requests to the API to get the data of a specific section. It receives the endpoint of the section as a parameter.

  const getSectionData = async endpoint => {
    const data = await getService(endpoint);
    return data;
  };

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
            onClose={closeAbout}
            visible={aboutVisible}
          />
        )}
        <Text style={styles.title}>Fundamentals</Text>
        <SubSection
          subtitle={'Introduction'}
          content={
            <Introduction
              coin={activeSubCoin}
              getSectionData={getSectionData}
              handleSectionContent={handleSectionContent}
              loading={loadingState}
              globalData={fundamentalsData}
            />
          }
          handleAboutPress={toggleAbout}
          hasEmptyContent={hasContent.introduction}
        />
        <SubSection
          handleAboutPress={toggleAbout}
          subtitle={'Tokenomics'}
          content={
            <Tokenomics
              getSectionData={getSectionData}
              coin={activeSubCoin}
              handleSectionContent={handleSectionContent}
              globalData={fundamentalsData}
              loading={loadingState}
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
              coin={activeSubCoin}
              handleSectionContent={handleSectionContent}
              loading={loadingState}
              globalData={fundamentalsData}
            />
          }
          hasEmptyContent={hasContent.generalTokenAllocation}
          hasAbout
          handleAboutPress={toggleAbout}
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
              coin={activeSubCoin}
              handleSectionContent={handleSectionContent}
              loading={loadingState}
              globalData={fundamentalsData}
            />
          }
          hasAbout
          handleAboutPress={toggleAbout}
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
              coin={activeSubCoin}
              loading={loadingState}
              globalData={fundamentalsData}
            />
          }
          hasAbout
          handleAboutPress={toggleAbout}
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
              coin={activeSubCoin}
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
              handleAboutPress={toggleAbout}
              loading={loadingState}
              globalData={fundamentalsData}
            />
          }
          hasAbout
          handleAboutPress={toggleAbout}
          description={
            fundamentals_static_content.competitors.sectionDescription
          }
        />
        <SubSection
          hasEmptyContent={hasContent.revenueModel}
          subtitle={'Revenue Model'}
          hasAbout
          handleAboutPress={toggleAbout}
          content={
            <UpdatedRevenueModel
              handleSectionContent={handleSectionContent}
              getSectionData={getSectionData}
              coin={activeSubCoin}
              globalData={fundamentalsData}
              loading={loadingState}
            />
          }
          description={
            fundamentals_static_content.revenueModel.sectionDescription
          }
        />
        <SubSection
          hasEmptyContent={hasContent.hacks}
          hasAbout
          handleAboutPress={toggleAbout}
          subtitle={'Hacks'}
          content={
            <Hacks
              getSectionData={getSectionData}
              coin={activeSubCoin}
              handleSectionContent={handleSectionContent}
              globalData={fundamentalsData}
              loading={loadingState}
            />
          }
          description={fundamentals_static_content.hacks.sectionDescription}
        />
        <SubSection
          hasAbout
          hasEmptyContent={hasContent.upgrades}
          handleAboutPress={toggleAbout}
          subtitle={'Upgrades'}
          description={fundamentals_static_content.upgrades.sectionDescription}
          content={
            <Upgrades
              getSectionData={getSectionData}
              coin={activeSubCoin}
              handleSectionContent={handleSectionContent}
              globalData={fundamentalsData}
              loading={loadingState}
            />
          }
        />
        <SubSection
          hasAbout
          hasEmptyContent={hasContent.dapps}
          handleAboutPress={toggleAbout}
          subtitle={'DApps'}
          content={
            <DApps
              getSectionData={getSectionData}
              coin={activeSubCoin}
              handleSectionContent={handleSectionContent}
              globalData={fundamentalsData}
              loading={loadingState}
            />
          }
          description={fundamentals_static_content.dApps.sectionDescription}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Fundamentals;
