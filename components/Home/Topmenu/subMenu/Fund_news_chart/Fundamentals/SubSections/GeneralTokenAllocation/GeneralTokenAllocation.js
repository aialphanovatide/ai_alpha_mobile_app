import {Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CircleChart from '../CircleChart/CircleChart';
import useGTAStyles from './GTAStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import Loader from '../../../../../../../Loader/Loader';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';

const GeneralTokenData = ({data, handleTokenChange, styles, colors}) => {
  return (
    <View style={styles.circleDataContainer}>
      {data.map((sector, index) => (
        <TouchableOpacity
          style={styles.row}
          key={index}
          onPress={() => handleTokenChange(sector)}>
          <Text
            style={[
              styles.tokenSelector,
              {
                backgroundColor: colors[index > 5 ? index % 5 : index],
              },
            ]}>
            {''}
          </Text>
          <Text
            style={[
              styles.strong,
              {color: colors[index > 5 ? index % 5 : index]},
            ]}>
            {sector.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const GeneralTokenAllocation = ({getSectionData, coin}) => {
  const colors = ['#80290E', '#C93A05', '#FC5404', '#FF8D34', '#FFB76E'];
  const styles = useGTAStyles();
  const [percentagesData, setPercentagesData] = useState([]);
  const {theme} = useContext(AppThemeContext);
  const [loading, setLoading] = useState(true);
  const [currentToken, setCurrentToken] = useState(
    percentagesData.length > 0 ? percentagesData[0] : null,
  );
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
          console.log(response.message.token_distribution);
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
          console.log('Parsed data:', parsed_data);
          setPercentagesData(parsed_data);
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

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : percentagesData?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          <View style={styles.flex}>
            <CircleChart
              data={percentagesData}
              dividerSize={5}
              backgroundColor={theme.boxesBackgroundColor}
              colors={colors}
            />
            <Text
              style={
                currentToken && [
                  {
                    color: currentToken
                      ? colors[
                          currentTokenIndex > 5
                            ? currentTokenIndex % 5
                            : currentTokenIndex
                        ]
                      : theme.boxesBackgroundColor,
                  },
                  styles.currentTokenPercentage,
                ]
              }>
              {currentToken ? ` ${currentToken.percentage}% ` : ''}
            </Text>
          </View>
          <GeneralTokenData
            currentToken={currentToken}
            data={percentagesData}
            handleTokenChange={handleTokenChange}
            styles={styles}
            colors={colors}
          />
        </>
      )}
    </View>
  );
};

export default GeneralTokenAllocation;
