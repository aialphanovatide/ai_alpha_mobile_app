// DailyActiveUsers.js
import React from 'react';
import { View } from 'react-native';
import CryptoSection from './CryptoSection';
import styles from './CompetitorSections/CirculatingSupply/CirculatingSupplyStyles';

const DailyActiveUsers = ({ cryptos }) => {
  const data = [
    { name: 'Ethereum', logo: require('../Competitors/CompetitorSections/coinsLogos/ETH.png'), score: 6, value: '325,45k' },
    { name: 'Solana', logo: require('../Competitors/CompetitorSections/coinsLogos/SOL.png'), score: 2, value: '106,53k' },
    { name: 'Cardano', logo: require('../Competitors/CompetitorSections/coinsLogos/ADA.png'), score: 1, value: '42.52k' },
    { name: 'Avalanche', logo: require('../Competitors/CompetitorSections/coinsLogos/AVAX.png'), score: 1, value: '37,28k' },
  ];

  return (
    <View>
      {data.map((crypto, index) => (
        <CryptoSection key={index} {...crypto} />
      ))}
    </View>
  );
};

export default DailyActiveUsers;
