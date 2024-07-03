import {Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CircleChart from '../CircleChart/CircleChart';
import useGTAStyles from './GTAStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import Loader from '../../../../../../../Loader/Loader';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';

const GeneralTokenData = ({
  currentToken,
  data,
  handleTokenChange,
  styles,
  colors,
  theme,
}) => {
  return (
    <View style={styles.circleDataContainer}>
      {data.map((sector, index) => {
        return (
          <TouchableOpacity
            style={styles.row}
            key={index}
            onPress={() => handleTokenChange(sector)}>
            <Text
              style={[
                styles.tokenSelector,
                {
                  backgroundColor: colors[index],
                },
              ]}>
              {''}
            </Text>
            <Text
              style={[
                styles.strong,
                {color: colors[index]},
                currentToken.title === sector.title
                  ? {
                      fontFamily: theme.fontSemibold,
                    }
                  : {},
              ]}
              numberOfLines={2}
              ellipsizeMode="clip">
              {sector.title.length > 18
                ? `${sector.title.slice(0, 15)}...`
                : sector.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const GeneralTokenAllocation = ({
  getSectionData,
  coin,
  handleSectionContent,
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
        '#CD1900',
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
  const [loading, setLoading] = useState(true);
  const [currentToken, setCurrentToken] = useState(null);
  const handleTokenChange = token => {
    setCurrentToken(token);
  };

  useEffect(() => {
    setLoading(true);
    setPercentagesData([]);
    const fetchTokenDistributionData = async () => {
      try {
        const response = await getSectionData(
          `/api/get_tokenomics?coin_name=${coin}`,
        );

        if (response.status !== 200) {
          setPercentagesData([]);
        } else {
          // console.log(response.message.token_distribution);
          const parsed_data = response.message.token_distribution.map(
            distribution => {
              return {
                title: distribution.token_distributions.holder_category,
                percentage: parseFloat(
                  distribution.token_distributions.percentage_held.replace(
                    '%',
                    '',
                  ),
                ),
              };
            },
          );
          // console.log('Parsed data:', parsed_data);
          setPercentagesData(parsed_data.slice(0, 8));
          setCurrentToken(parsed_data[0]);
        }
      } catch (error) {
        console.log('Error trying to get token distribution data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTokenDistributionData();
  }, [coin]);

  const currentTokenIndex = percentagesData.findIndex(
    values => values.title === currentToken?.title,
  );

  useEffect(() => {
    if (!loading && percentagesData?.length === 0) {
      handleSectionContent('generalTokenAllocation', true);
    }
  }, [percentagesData, loading, handleSectionContent]);

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
            data={percentagesData}
            handleTokenChange={handleTokenChange}
            styles={styles}
            colors={colors}
            theme={theme}
          />
        </>
      )}
    </View>
  );
};

export default GeneralTokenAllocation;
