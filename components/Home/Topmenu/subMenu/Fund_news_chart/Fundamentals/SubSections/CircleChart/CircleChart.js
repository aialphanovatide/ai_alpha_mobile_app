import React, {useContext} from 'react';
import {Text, View} from 'react-native';
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
      <VictoryPie
        width={200}
        radius={100}
        innerRadius={85}
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
            currentToken?.percentage % 1 !== 0 ? {left: 70} : {},
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
