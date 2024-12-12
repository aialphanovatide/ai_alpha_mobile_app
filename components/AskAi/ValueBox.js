import React from 'react';
import useAskAiStyles from './AskAiStyles';
import {Text, View} from 'react-native';

// Component that renders each item of the content and data fetched, displaying a title with the box including the data itself.

const ValueBox = ({title, content, valueType}) => {
  const styles = useAskAiStyles();

  const formatContentByValueType = content => {
    switch (valueType) {
      case 'price':
        let numStr = content.toString();

        if (numStr.includes('e')) {
          numStr = parseFloat(content).toFixed(
            Math.max(
              0,
              (numStr.split('e')[0].split('.')[1] || '').length -
                (parseInt(numStr.split('e')[1]) || 0),
            ),
          );
        }

        let [integerPart, decimalPart] = numStr.split('.');
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return decimalPart
          ? `${integerPart}.${decimalPart} USD`
          : `${integerPart} USD`;
      case 'percentage':
        const numericContent = parseFloat(content);
        return `${numericContent.toFixed(2)}%`;
      case 'symbol':
        return `${
          content.slice(0, 1).toUpperCase() + content.slice(1, content.length)
        }`;
      case 'array':
        const arrayContent = content.replace(/[\[\]"]+/g, '');
        return arrayContent;
      default:
        return content;
    }
  };

  return (
    <View style={styles.valueBoxContainer}>
      <Text style={styles.boxTitle}>{title}</Text>
      <Text style={styles.content}>
        {formatContentByValueType(content.replace(/"/g, ''))}
      </Text>
    </View>
  );
};

export default React.memo(ValueBox);