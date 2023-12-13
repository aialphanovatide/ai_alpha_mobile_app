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
          content={<VestingSchedule year={2024} tokens={49999992} />}
        />
        <SubSection
          subtitle={'Value Accrual Mechanisms'}
          content={
            <ValueAccrualMechanisms
              options={[
                {name: 'Benefits', icon: 'dollar'},
                {name: 'USP', icon: 'star'},
              ]}
              contentData={[
                {
                  option: 'Benefits',
                  content: [
                    {
                      title: 'Staking',
                      image: '',
                      text: '4% to 5% per annum',
                    },
                    {
                      title: 'Fee Burning',
                      image: '',
                      text: 'Potential for deflationary pressure on the circulating supply',
                    },
                  ],
                },
                {
                  option: 'USP',
                  content: [
                    {
                      title: 'Staking',
                      image: '',
                      text: 'Similar to other Proof-to-Stake cryptocurrencies',
                    },
                    {
                      title: 'Fee Burning',
                      image: '',
                      text: 'Unique to Ethereum',
                    },
                  ],
                },
              ]}
            />
          }
        />
        <SubSection
          subtitle={'Competitors'}
          content={
            <Competitors
              options={[
                {name: 'Type of token', icon: ''},
                {name: 'Circulating Supply', icon: ''},
                {name: 'Current Market Cap', icon: ''},
                {name: 'TVL', icon: ''},
                {name: 'Daily Active Users', icon: ''},
                {name: 'Transaction Fees', icon: ''},
                {name: 'Transaction Speed', icon: ''},
                {name: 'Inflation Rate', icon: ''},
                {name: 'APR', icon: ''},
                {name: 'Active Developers', icon: ''},
                {name: 'Revenue', icon: ''},
              ]}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

export default Fundamentals;
