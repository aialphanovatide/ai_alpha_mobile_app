import {Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CircleChart from '../CircleChart/CircleChart';
import useGTAStyles from './GTAStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';

// General Token Data component used in the General Token Distribution section. It is used to display the percentage of each token in the portfolio. It also allows the user to select a token to view its percentage. The selected token is highlighted with a different color.

const GeneralTokenData = ({
  currentToken,
  data,
  handleTokenChange,
  styles,
  colors,
}) => {
  return (
    <View style={styles.circleDataContainer}>
      {data.map((sector, index) => {
        return (
          <TouchableOpacity
            style={[
              styles.row,
              {borderColor: colors[index]},
              currentToken.title === sector.title
                ? {backgroundColor: colors[index]}
                : {},
            ]}
            key={index}
            onPress={() => handleTokenChange(sector)}>
            <Text
              style={[
                styles.strong,
                currentToken.title === sector.title ? styles.activeText : {},
              ]}
              ellipsizeMode="clip">
              {sector.title.length > 21
                ? `${sector.title.slice(0, 21)}..`
                : sector.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// General Token Allocation component used in the General Token Distribution section. It is used to display the percentage of each token in the portfolio.

const GeneralTokenAllocation = ({
  coin,
  handleSectionContent,
  globalData,
  loading,
}) => {
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const colors = isDarkMode
    ? [
        '#FFB546',
        '#FFCC7E',
        '#FFE3B8',
        '#FFF7EB',
        '#FF9900',
        '#FF7000',
        '#FF3D00',
        '#E01C01',
      ]
    : [
        '#FF7000',
        '#FF9900',
        '#FFB546',
        '#FFCC7E',
        '#FF3D00',
        '#FF1F00',
        '#C93A05',
        '#80290E',
      ];
  const styles = useGTAStyles();
  const [percentagesData, setPercentagesData] = useState([]);
  const [currentToken, setCurrentToken] = useState(null);
  const handleTokenChange = token => {
    setCurrentToken(token);
  };

  useEffect(() => {
    const fetchTokenDistributionData = () => {
      if (!globalData || globalData.tokenomics.status !== 200) {
        setPercentagesData([]);
      } else {
        const parsed_data =
          globalData.tokenomics.message.token_distribution.map(distribution => {
            return {
              title: distribution.token_distributions.holder_category,
              percentage: parseFloat(
                distribution.token_distributions.percentage_held.replace(
                  '%',
                  '',
                ),
              ),
            };
          });
        setPercentagesData(parsed_data.slice(0, 8));
        setCurrentToken(parsed_data[0]);
      }
    };
    fetchTokenDistributionData();
  }, [globalData, coin]);

  const currentTokenIndex = percentagesData.findIndex(
    values => values.title === currentToken?.title,
  );

  const sortTokenArrays = (data, colors) => {
    const results = {dataArray: [], sortedColors: []};
    if (!data || !colors) {
      return results;
    } else {
      for (let i = 0; i < data.length; i++) {
        if (i > 3) {
          results.dataArray.unshift(data[i]);
          results.sortedColors.unshift(colors[i]);
        } else {
          results.dataArray.push(data[i]);
          results.sortedColors.push(colors[i]);
        }
      }
    }
    return results;
  };

  useEffect(() => {
    if (!loading && percentagesData?.length === 0) {
      handleSectionContent('generalTokenAllocation', true);
    }
  }, [percentagesData, loading, handleSectionContent]);

  const sortedReferencesData = sortTokenArrays(
    percentagesData,
    colors,
  ).dataArray;

  const sortedColors = sortTokenArrays(percentagesData, colors).sortedColors;

  return (
    <View style={styles.container}>
      {loading ? (
        <SkeletonLoader type="circleChart" />
      ) : percentagesData?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          <CircleChart
            data={percentagesData}
            dividerSize={4}
            colors={colors}
            currentToken={currentToken}
            currentTokenIndex={currentTokenIndex}
          />
          <GeneralTokenData
            currentToken={currentToken}
            data={sortedReferencesData}
            handleTokenChange={handleTokenChange}
            styles={styles}
            colors={sortedColors}
          />
        </>
      )}
    </View>
  );
};

export default GeneralTokenAllocation;
