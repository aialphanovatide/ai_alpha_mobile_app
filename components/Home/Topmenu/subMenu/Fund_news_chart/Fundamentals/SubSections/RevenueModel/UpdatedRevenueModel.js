import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import useUpdatedRevenueModelStyles from './UpdatedRevenueModelStyles';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';

// Component to render the Revenue Model section in the Fundamentals tab. It displays the annualised revenue and fees of the coin. It also shows a loader when requesting the data and a message in case there is no content to display.

const UpdatedRevenueModel = ({
  coin,
  handleSectionContent,
  globalData,
  loading,
}) => {
  const styles = useUpdatedRevenueModelStyles();
  const [revenues, setRevenues] = useState([]);

  const formatNumber = num => {
    const absNum = Math.abs(num);
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const thousand = 1000;

    const tier = (Math.log10(absNum) / 3) | 0;

    if (tier == 0) return num;

    const divisor = Math.pow(thousand, tier);
    const formattedNum = (num / divisor).toFixed(2);

    return formattedNum + abbrev[tier];
  };

  useEffect(() => {
    const fetchRevenueModelData = coin => {
      if (!globalData || globalData.revenueModels.status !== 200) {
        setRevenues([]);
      } else {
        const revenue_model = globalData.revenueModels.revenue_model;
        const mapped_data = [];
        for (const key in revenue_model) {
          switch (key) {
            case 'analized_revenue':
              mapped_data.push({
                title: 'Annualised Revenue',
                subtitle: '*Cumulative last 1yr revenue',
                value: revenue_model[key],
              });
              break;
            case 'fees_1ys':
              mapped_data.push({
                title: 'Fees (1Y)',
                subtitle: '*Cumulative last 1yr fees',
                value: revenue_model[key],
              });
              break;
            default:
              break;
          }
        }
        setRevenues(mapped_data);
      }
    };

    fetchRevenueModelData(coin);
  }, [globalData, coin]);

  useEffect(() => {
    if (!loading && revenues?.length === 0) {
      handleSectionContent('revenueModel', true);
    }
  }, [revenues, loading, handleSectionContent]);

  return (
    <View style={styles.container}>
      {loading ? (
        <SkeletonLoader quantity={1} style={{marginVertical: 4}} />
      ) : revenues?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          {revenues.map((revenue, index) => {
            if (revenue.value === null) {
              return;
            } else {
              return (
                <View
                  key={index}
                  style={[
                    styles.itemContainer,
                    index ===
                    revenues.filter(rev => rev.value !== null).length - 1
                      ? {borderBottomWidth: 0}
                      : {},
                  ]}>
                  <Image
                    style={styles.revenueImage}
                    resizeMode="contain"
                    source={require('../../../../../../../../assets/images/fundamentals/revenueModel.png')}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.revenueTitle}>{revenue.title}</Text>
                    <Text style={styles.revenueSubtitle}>
                      {revenue.subtitle}
                    </Text>
                  </View>
                  <Text style={styles.revenueValue}>
                    {`$${formatNumber(revenue.value)}`}
                  </Text>
                </View>
              );
            }
          })}
        </>
      )}
    </View>
  );
};

export default UpdatedRevenueModel;
