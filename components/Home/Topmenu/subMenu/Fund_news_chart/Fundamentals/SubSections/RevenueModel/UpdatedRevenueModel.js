import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import useUpdatedRevenueModelStyles from './UpdatedRevenueModelStyles';

const UpdatedRevenueModel = ({getSectionData, coin}) => {
  const styles = useUpdatedRevenueModelStyles();
  const [revenues, setRevenues] = useState([]);

  const formatNumber = num => {
    const absNum = Math.abs(num);
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const thousand = 1000;

    const tier = (Math.log10(absNum) / 3) | 0;

    if (tier == 0) return num;

    const divisor = Math.pow(thousand, tier);
    const formattedNum = (num / divisor).toFixed(3);

    return formattedNum + abbrev[tier];
  };

  useEffect(() => {
    const fetchRevenueModelData = async coin => {
      try {
        const response = await getSectionData(
          `/api/get_revenue_models?coin_name=${coin}`,
        );
        if (response.status !== 200) {
          setRevenues([]);
        } else {
          const revenue_model = response.revenue_model;
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
      } catch (error) {
        console.log('Error trying to get revenue model data: ', error);
      }
    };
    fetchRevenueModelData(coin);
  }, [coin]);

  if (revenues?.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {revenues.map((revenue, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image
            style={styles.revenueImage}
            resizeMode="contain"
            source={require('../../../../../../../../assets/images/fundamentals/revenueModel.png')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.revenueTitle}>{revenue.title}</Text>
            <Text style={styles.revenueSubtitle}>{revenue.subtitle}</Text>
          </View>
          <Text style={styles.revenueValue}>
            {revenue.value !== null
              ? typeof revenue.value === 'string'
                ? revenue.value
                : `$${formatNumber(revenue.value)}`
              : 'N/A'}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default UpdatedRevenueModel;
