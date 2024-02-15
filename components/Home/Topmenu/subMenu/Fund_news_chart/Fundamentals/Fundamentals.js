import {Text, ScrollView, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import SubSection from './SubSections/SubSection';
import Introduction from './SubSections/Introduction/Introduction.js';
import Tokenomics from './SubSections/Tokenomics/Tokenomics.js';
import GeneralTokenAllocation from './SubSections/GeneralTokenAllocation/GeneralTokenAllocation.js';
import VestingSchedule from './SubSections/VestingSchedule/VestingSchedule.js';
import ValueAccrualMechanisms from './SubSections/ValueAccrualMechanisms/ValueAccrualMechanisms.js';
import Competitors from './SubSections/Competitors/Competitors';
import RevenueModel from './SubSections/RevenueModel/RevenueModel';
import Hacks from './SubSections/Hacks/Hacks';
import Upgrades from './SubSections/UpgradesSection/Upgrades';
import DApps from './SubSections/DApps/DApps';
import useFundamentalsStyles from './FundamentalsStyles';
import {AppThemeContext} from '../../../../../../context/themeContext';
import UpdatedRevenueModel from './SubSections/RevenueModel/UpdatedRevenueModel';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
import {altGetService} from '../../../../../../services/aiAlphaApi';
import {fundamentalsMock} from './fundamentalsMock';
import TokenUtility from './SubSections/TokenUtility/TokenUtility';
import AboutModal from './AboutModal';

const Fundamentals = ({route}) => {
  const {activeSubCoin} = useContext(TopMenuContext);
  const coin = route ? route.params.activeCoin : activeSubCoin;
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useFundamentalsStyles();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');

  const handleAboutPress = (description = null) => {
    if (description) {
      setAboutDescription(description);
    }
    setAboutVisible(!aboutVisible);
  };

  const getHacksData = async coin => {
    const data = await altGetService(`/api/hacks?coin_bot_name=${coin}`);
    console.log('Hacks response from server: ', data);
    return data.message;
  };

  const getIntroductionData = async coin => {
    const data = await altGetService(`/get_introduction/${coin}`);
    return data;
  };

  useEffect(() => {}, [coin]);

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
        {/*<SubSection
          subtitle={'Introduction'}
          content={
            <Introduction
              coin={coin}
              getIntroductionData={getIntroductionData}
            />
          }
          handleAboutPress={handleAboutPress}
        />
        <SubSection
          handleAboutPress={handleAboutPress}
          subtitle={'Tokenomics'}
          content={<Tokenomics />}
          hasAbout={true}
          description={fundamentalsMock.tokenomics.sectionDescription}
        />
        <SubSection
          subtitle={'Token Distribution'}
          content={<GeneralTokenAllocation />}
          hasAbout
          handleAboutPress={handleAboutPress}
          description={fundamentalsMock.tokenDistribution.sectionDescription}
        />
        {/* <SubSection
          subtitle={'Vesting Schedules'}
          content={
            <VestingSchedule year={2024} tokens={49999992} crypto={'ETH'} />
          }
          hasAbout
          handleAboutPress={handleAboutPress}
        /> */}
        <SubSection
          subtitle={'Token Utility'}
          content={
            <TokenUtility content={fundamentalsMock.tokenUtility.content} />
          }
          hasAbout
          handleAboutPress={handleAboutPress}
          description={fundamentalsMock.tokenUtility.sectionDescription}
        />
        <SubSection
          subtitle={'Value Accrual Mechanisms'}
          content={
            <ValueAccrualMechanisms
              options={fundamentalsMock.valueAccrualMechanisms.options}
              contentData={fundamentalsMock.valueAccrualMechanisms.contentData}
            />
          }
          hasAbout
          handleAboutPress={handleAboutPress}
          description={
            fundamentalsMock.valueAccrualMechanisms.sectionDescription
          }
        />
        <SubSection
          subtitle={'Competitors'}
          content={
            <Competitors
              cryptosData={fundamentalsMock.competitors.cryptosData}
              subsectionsData={fundamentalsMock.competitors.subsections}
              handleAboutPress={handleAboutPress}
            />
          }
          hasAbout
          handleAboutPress={handleAboutPress}
          description={fundamentalsMock.competitors.sectionDescription}
        />
        {/* <SubSection
          hasAbout
          subtitle={'Revenue Model'}
          content={
            <RevenueModel
              options={[
                {
                  name: 'Transaction Fees',
                  color: '#399AEA',
                  values: [
                    {year: 2022, percentage: 75},
                    {year: 2023, percentage: 65},
                  ],
                },
                {
                  name: 'Ether Burning',
                  color: '#C539B4',
                  values: [
                    {year: 2022, percentage: 20},
                    {year: 2023, percentage: 30},
                  ],
                },
                {
                  name: 'Other Sources',
                  color: '#FFC53D',
                  values: [
                    {year: 2022, percentage: 0},
                    {year: 2023, percentage: 5},
                  ],
                },
              ]}
            />
          }
        /> */}
        <SubSection
          subtitle={'Revenue Model'}
          hasAbout
          handleAboutPress={handleAboutPress}
          content={
            <UpdatedRevenueModel
              title={'Annualised Revenue'}
              subtitle={'*Cumulative last 1yr revenue'}
              value={'$1.562b'}
            />
          }
          description={fundamentalsMock.revenueModel.sectionDescription}
        />
        <SubSection
          hasAbout
          handleAboutPress={handleAboutPress}
          subtitle={'Hacks'}
          content={<Hacks getHacksData={getHacksData} coin={coin} />}
          description={fundamentalsMock.hacks.sectionDescription}
        />
        <SubSection
          hasAbout
          handleAboutPress={handleAboutPress}
          subtitle={'Upgrades'}
          description={fundamentalsMock.upgrades.sectionDescription}
          content={
            <Upgrades
              events={fundamentalsMock.upgrades.events}
            />
          }
        />
        <SubSection
          hasAbout
          handleAboutPress={handleAboutPress}
          subtitle={'DApps'}
          content={
            <DApps
              protocols={fundamentalsMock.dApps.protocols}
            />
          }
          description={fundamentalsMock.dApps.sectionDescription}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Fundamentals;
