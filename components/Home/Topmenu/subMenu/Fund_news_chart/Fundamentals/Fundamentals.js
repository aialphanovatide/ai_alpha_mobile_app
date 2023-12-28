import {Text, View, ScrollView, SafeAreaView} from 'react-native';
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
import Hacks from './SubSections/Hacks/Hacks';
import Upgrades from './SubSections/UpgradesSection/Upgrades';
import DApps from './SubSections/DApps/DApps';

const Fundamentals = ({}) => {
  return (
    <ScrollView nestedScrollEnabled={true}>
      <SafeAreaView style={styles.container}>
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
        />
        <SubSection
          subtitle={'Hacks'}
          content={
            <Hacks
              events={[
                {
                  date: 'July 2016',
                  description:
                    'A vulnerability in the DAO smart contract allowed an attacker to steal $60 million worth of ETH.',
                  hasFinished: true,
                },
                {
                  date: 'June 2017',
                  description:
                    'A bug in the Parity wallet software allowed attackers to steal $31 million worth of ETH.',
                  hasFinished: true,
                },
                {
                  date: 'November 2018',
                  description:
                    'A DNS hijacking attack allowed attackers to steal $17 million worth of ETH from MyEtherWallet users.',
                  hasFinished: true,
                },
                {
                  date: 'February 2019',
                  description:
                    'A security breach at Crypto.com allowed attackers to steal $26 million worth of ETH and other cryptocurrencies.',
                  hasFinished: true,
                },
                {
                  date: 'May 2022',
                  description:
                    'A cross-chain bridge between the Ethereum and Avalanche blockchains was hacked, resulting in the loss of $190 million worth of cryptocurrencies.',
                  hasFinished: true,
                },
              ]}
            />
          }
        />
        <SubSection
          subtitle={'Upgrades'}
          content={
            <Upgrades
              events={[
                {
                  date: 'August 2021',
                  description: 'London Hard Fork',
                  hasFinished: true,
                },
                {
                  date: 'September 2022',
                  description: 'The Merge',
                  hasFinished: true,
                },
                {
                  date: 'April 2023',
                  description: 'Shanghai Upgrade',
                  hasFinished: true,
                },
                {
                  date: 'Q1/Q2 2024',
                  description: 'Cancun-Deneb',
                  hasFinished: false,
                },
                {
                  date: 'Early 2024',
                  description: 'EIP 4844 (Potential)',
                  hasFinished: false,
                },
                {
                  date: 'Mid 2024',
                  description: 'Mid 2024: EIP-4337 (Potential)',
                  hasFinished: false,
                },
                {
                  date: 'Late 2024/Early 2025',
                  description: 'Surge & Shard Phase 1',
                  hasFinished: false,
                },
                {
                  date: 'Ongoing development',
                  description:
                    'Ongoing development: Surge & Shard Phase 2 and beyond',
                  hasFinished: false,
                },
                {
                  date: 'Long-term',
                  description: 'Long-term: EVM 3.0 Vision',
                  hasFinished: false,
                },
              ]}
            />
          }
        />
        <SubSection
          subtitle={'DApps'}
          content={
            <DApps
              protocols={[
                {
                  name: 'Uniswap',
                  description:
                    'Decentralised exchange (DEX) for trading Ethereum-based tokens',
                  tvl: 14.6,
                  benefits:
                    'Decentralised and permissionless way to trade Ethereum-based tokens, which helps to increase the liquidity of these tokens and to make them more accessible to users.',
                  image: require('../../../../../../assets/images/fundamentals/dApps/uniswap.png'),
                },
                {
                  name: 'Aave',
                  description: 'Decentralised lending and borrowing platform.',
                  tvl: 13.2,
                  benefits:
                    'Decentralised and permissionless way for users to borrow and lend Ethereum-based tokens, which helps to increase the utilisation of these tokens and to create new financial products and services.',
                  image: require('../../../../../../assets/images/fundamentals/dApps/aave.png'),
                },
                {
                  name: 'MakerDAO',
                  description: 'Decentralised stablecoin issuer.',
                  tvl: 8.6,
                  benefits:
                    'MakerDAO issues the DAI stablecoin, which is one of the most popular stablecoins in the crypto ecosystem. DAI provides a stable and reliable store of value, which helps to attract users to the Ethereum ecosystem and to make it more attractive to institutional investors.',
                  image: require('../../../../../../assets/images/fundamentals/dApps/maker.png'),
                },
                {
                  name: 'Lido Finance',
                  description:
                    'A decentralised staking protocol that allows users to stake their ETH without having to run their own node.',
                  tvl: 14.2,
                  benefits:
                    'Lido Finance makes it easier for users to participate in staking, which helps to increase the security of the Ethereum network and to provide a source of passive income for stakers.',
                  image: require('../../../../../../assets/images/fundamentals/dApps/lido.png'),
                },
                {
                  name: 'Curve',
                  description: 'Decentralised exchange for stablecoin trading.',
                  tvl: 12.8,
                  benefits:
                    'Decentralised and permissionless way to trade stablecoins, which helps to improve the stability of the Ethereum ecosystem and to make it more attractive to institutional investors.',
                  image: require('../../../../../../assets/images/fundamentals/dApps/curve.png'),
                },
                {
                  name: 'Synthetix',
                  description:
                    'A decentralised exchange for synthetic assets, which are tokens that track the price of real-world assets such as stocks and commodities.',
                  tvl: 6,
                  benefits:
                    'Synthetix provides a decentralised and permissionless way to trade synthetic assets, which helps to expand the range of financial products and services available on Ethereum.',
                  image: require('../../../../../../assets/images/fundamentals/dApps/synthetix.png'),
                },
                {
                  name: 'dYdX',
                  description: 'A decentralised margin trading platform.',
                  tvl: 5.8,
                  benefits:
                    'dYdX provides a decentralised and permissionless way to trade crypto assets with leverage, which helps to increase the liquidity of these assets and to create new financial products and services.',
                  image: require('../../../../../../assets/images/fundamentals/dApps/dydx.png'),
                },
                {
                  name: 'OpenSea',
                  description: 'NFT marketplace.',
                  tvl: 7.2,
                  benefits:
                    'Decentralised and permissionless way to create, buy, and sell NFTs, which helps to fuel the growth of the NFT market and to bring new users to the Ethereum ecosystem.',
                  image: require('../../../../../../assets/images/fundamentals/dApps/opensea.png'),
                },
                {
                  name: 'Compound Protocol',
                  description:
                    'An algorithmic interest rate protocol that offers both borrowing and lending services.',
                  tvl: 15.3,
                  benefits:
                    'Compound Protocol provides a decentralised and permissionless way to borrow and lend Ethereum-based tokens, which helps to increase the utilisation of these tokens and to create new financial products and services.',
                  image: require('../../../../../../assets/images/fundamentals/dApps/compound.png'),
                },
              ]}
            />
          }
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Fundamentals;
