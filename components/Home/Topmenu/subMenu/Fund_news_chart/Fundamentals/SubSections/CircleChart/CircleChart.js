import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Pie from 'react-native-pie';
import {VictoryPie} from 'victory-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import useGTAStyles from '../GeneralTokenAllocation/GTAStyles';

const CircleChart = ({
  data,
  dividerSize,
  colors,
  currentToken,
  currentTokenIndex,
}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useGTAStyles();
  return (
    <View style={styles.circleChartContainer}>
      {/* <Pie
        radius={80}
        innerRadius={60}
        sections={data.map((sector, index) => {
          return {
            percentage: sector.percentage,
            color: colors[index],
          };
        })}
        backgroundColor={backgroundColor}
        dividerSize={dividerSize}
      /> */}
      <VictoryPie
        width={200}
        radius={80}
        innerRadius={60}
        data={data.map((sector, index) => {
          return {
            x: sector.percentage,
            y: sector.percentage,
            label: '',
          };
        })}
        colorScale={data.map((datum, index) => colors[index])}
        padAngle={dividerSize}
        labels={datum => null}
        style={styles.chart}
      />
      <Text
        style={
          currentToken && [
            {
              color: currentToken
                ? colors[currentTokenIndex]
                : theme.boxesBackgroundColor,
            },
            styles.currentTokenPercentage,
          ]
        }>
        {currentToken?.percentage && currentToken?.percentage !== undefined
          ? `${currentToken.percentage}%`
          : ''}
      </Text>
    </View>
  );
};

export default CircleChart;
