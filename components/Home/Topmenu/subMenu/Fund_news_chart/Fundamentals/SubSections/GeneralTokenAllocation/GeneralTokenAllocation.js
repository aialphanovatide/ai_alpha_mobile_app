import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './GTAStyles';
import CircleChart from '../CircleChart/CircleChart';

const GeneralTokenData = ({data, currentToken, handleTokenChange}) => {
  return (
    <View style={styles.circleDataContainer}>
      {data.map((sector, index) => (
        <TouchableOpacity
          style={styles.row}
          key={index}
          onPress={() => handleTokenChange(sector)}>
          <Text style={[styles.tokenSelector, {backgroundColor: sector.color}]}>
            {''}
          </Text>
          <Text style={[styles.strong, {color: sector.color}]}>
            {sector.title}
          </Text>
        </TouchableOpacity>
      ))}
      {currentToken && (
        <Text
          style={[{color: currentToken.color}, styles.currentTokenPercentage]}>
          {` ${currentToken.percentage}% `}
        </Text>
      )}
    </View>
  );
};

const GeneralTokenAllocation = () => {
  const chartData = [
    {title: 'Exchanges', percentage: 26, color: '#FC0404'},
    {title: 'Institutions', percentage: 22, color: '#FC5404'},
    {title: 'Miners', percentage: 21, color: '#F98404'},
    {title: 'ETH Foundation', percentage: 17, color: '#F9B208'},
    {title: 'Retail Investors', percentage: 14, color: '#F8E405'},
  ];
  const [currentToken, setCurrentToken] = useState(null);

  const handleTokenChange = token => {
    setCurrentToken(token);
  };

  return (
    <View style={styles.container}>
      <CircleChart data={chartData} />
      <GeneralTokenData
        currentToken={currentToken}
        data={chartData}
        handleTokenChange={handleTokenChange}
      />
    </View>
  );
};

export default GeneralTokenAllocation;
