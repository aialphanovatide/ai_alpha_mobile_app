import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import useChartsStyles from './ChartsStyles';

const RsButton = ({activeButtons, setActiveButtons}) => {
  
  const styles = useChartsStyles();
  
  const buttons = [
    {label: 'Support', color: '#FC5404'},
    {label: 'Resistance', color: '#F012A1'},
    // {label: 'Fibonacci', color: '#783AED'}, // Uncomment when fibonacci functionality is ready
    // {label: 'Trend Lines', color: '#13B4C7'}, // Uncomment when trend lines functionality is ready
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
              opacity: button.label === 'Trend Lines' ? 0.2 : 1, // Disable the button while it doesn't have a functionality
            },
          ]}
          onPress={() => handlePress(button.label)}
          disabled={button.label === 'Trend Lines'} // Disable the button while it doesn't have a functionality
          >
          <Text
             style={[
              styles.rsButtonText,
              activeButtons.includes(button.label)
                ? styles.activeRsButtonText
                : { color: button.color },
            ]}>
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RsButton;
