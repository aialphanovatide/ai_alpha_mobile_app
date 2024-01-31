import {Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import CircleChart from '../CircleChart/CircleChart';
import useGTAStyles from './GTAStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const GeneralTokenData = ({data, handleTokenChange, styles}) => {
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
    </View>
  );
};

const GeneralTokenAllocation = () => {
  const styles = useGTAStyles();
  const chartData = [
    {title: 'Exchanges', percentage: 26, color: '#399AEA'},
    {title: 'Institutions', percentage: 22, color: '#20CBDD'},
    {title: 'Miners', percentage: 21, color: '#C539B4'},
    {title: 'ETH Foundation', percentage: 17, color: '#FF3BC3'},
    {title: 'Retail Investors', percentage: 14, color: '#FFC53D'},
  ];
  const [currentToken, setCurrentToken] = useState(chartData[0]);
  const {theme} = useContext(AppThemeContext);
  const handleTokenChange = token => {
    setCurrentToken(token);
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <CircleChart
          data={chartData}
          dividerSize={5}
          backgroundColor={theme.boxesBackgroundColor}
        />
        <Text
          style={
            currentToken && [
              {color: currentToken.color},
              styles.currentTokenPercentage,
            ]
          }>
          {currentToken ? ` ${currentToken.percentage}% ` : ''}
        </Text>
      </View>
      <GeneralTokenData
        currentToken={currentToken}
        data={chartData}
        handleTokenChange={handleTokenChange}
        styles={styles}
      />
    </View>
  );
};

export default GeneralTokenAllocation;
