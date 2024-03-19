import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import useChartsStyles from './ChartsStyles';

const RsButton = ({activeButtons, setActiveButtons}) => {
  const styles = useChartsStyles();
  const buttons = [
    {label: 'Resistance', color: '#F9B208'},
    {label: 'Support', color: '#FC5404'},
    {label: 'Support', color: '#FC5404'},
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
            },
          ]}
          onPress={() => handlePress(button.label)}>
          <Text
            style={[
              styles.rsButtonText,
              activeButtons.includes(button.label)
                ? styles.activeRsButtonText
                : {},
            ]}>
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RsButton;
