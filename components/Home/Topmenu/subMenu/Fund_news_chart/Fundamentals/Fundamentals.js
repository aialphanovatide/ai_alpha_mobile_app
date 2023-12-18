import {Text, View, ScrollView} from 'react-native';
import React from 'react';
import styles from './FundamentalsStyles';
import SubSection from './SubSections/SubSection';
import Introduction from './SubSections/Introduction/Introduction';
import Tokenomics from './SubSections/Tokenomics/Tokenomics';
import GeneralTokenAllocation from './SubSections/GeneralTokenAllocation/GeneralTokenAllocation';
import VestingSchedule from './SubSections/VestingSchedule/VestingSchedule';
import ValueAccrualMechanisms from './SubSections/ValueAccrualMechanisms/ValueAccrualMechanisms';
import Competitors from './SubSections/Competitors/Competitors';
import RevenueModel from './SubSections/RevenueModel/RevenueModel';

const Fundamentals = ({}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Fundamentals</Text>
        <SubSection
          subtitle={'Introduction'}
          content={
            <Introduction
              description={
                'Ethereum aims to address the limitations of traditional blockchains by enabling the creation of over 3,000 DApps and smart contracts that are currently running on the protocol.'
              }
              dataItems={[
                {text: 'Market capitalization of over $25 billion'},
                {text: '4 billion unique addresses and facilitated'},
                {text: 'Over $150 billion in transaction volume'},
                {text: 'Leading platform for decentralised innovation'},
              ]}
            />
          }
        />
        <SubSection subtitle={'Tokenomics'} content={<Tokenomics />} />
        <SubSection
          subtitle={'General Token Allocation'}
          content={<GeneralTokenAllocation />}
        />
        <SubSection
          subtitle={'Vesting Schedules'}
          content={
            <VestingSchedule year={2024} tokens={49999992} crypto={'ETH'} />
          }
        />
        <SubSection
          subtitle={'Value Accrual Mechanisms'}
          content={
            <ValueAccrualMechanisms
              options={[
                {
                  name: 'Benefits',
                  icon: require('../../../../../../assets/images/fundamentals/benefits.png'),
                },
                {
                  name: 'USP',
                  icon: require('../../../../../../assets/images/fundamentals/usp.png'),
                },
              ]}
              contentData={[
                {
                  option: 'Benefits',
                  content: [
                    {
                      title: 'Staking',
                      image: require('../../../../../../assets/Staking.png'),
                      text: '4% to 5% per annum',
                    },
                    {
                      title: 'Fee Burning',
                      image: require('../../../../../../assets/FeeBurning.png'),
                      text: 'Potential for deflationary pressure on the circulating supply',
                    },
                  ],
                },
                {
                  option: 'USP',
                  content: [
                    {
                      title: 'Staking',
                      image: require('../../../../../../assets/Staking.png'),
                      text: 'Similar to other Proof-to-Stake cryptocurrencies',
                    },
                    {
                      title: 'Fee Burning',
                      image: require('../../../../../../assets/FeeBurning.png'),
                      text: 'Unique to Ethereum',
                    },
                  ],
                },
              ]}
            />
          }
        />
        <SubSection subtitle={'Competitors'} content={<Competitors />} />
        <SubSection
          subtitle={'Revenue Model'}
          content={
            <RevenueModel
              options={[
                {
                  name: 'Transaction Fees',
                  color: '#FC5404',
                  values: [
                    {year: 2022, percentage: 75},
                    {year: 2023, percentage: 65},
                  ],
                },
                {
                  name: 'Ether Burning',
                  color: '#F9B208',
                  values: [
                    {year: 2022, percentage: 25},
                    {year: 2023, percentage: 30},
                  ],
                },
              ]}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

export default Fundamentals;
