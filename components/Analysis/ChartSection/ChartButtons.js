import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import useChartSectionStyles from './ChartSectionStyles';

const ChartButtons = ({activeButtons, setActiveButtons, disabled}) => {
  const styles = useChartSectionStyles();
  const buttons = [
    {label: 'Support', color: '#C539B4'},
    {label: 'Resistance', color: '#F012A1'},
  ];
  const handlePress = buttonLabel => {
    const index = activeButtons.indexOf(buttonLabel);
    if (index !== -1) {
      setActiveButtons(prevActiveButtons =>
        prevActiveButtons.filter(label => label !== buttonLabel),
      );
    } else {
      setActiveButtons(prevActiveButtons => [
        ...prevActiveButtons,
        buttonLabel,
      ]);
    }
  };

  return (
    <View style={styles.rsButtonContainer}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          disabled={disabled}
          key={index}
          style={[
            styles.rsButton,
            {
              backgroundColor: activeButtons.includes(button.label)
                ? button.color
                : 'transparent',
              borderColor: activeButtons.includes(button.label)
                ? 'transparent'
                : button.color,
            },
          ]}
          onPress={() => handlePress(button.label)}>
          <Text
            style={[
              styles.rsButtonText,
              activeButtons.includes(button.label)
                ? styles.activeRsButtonText
                : {color: button.color},
            ]}>
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChartButtons;
