import React, {useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import useChartsStyles from './ChartsStyles';
import {AppThemeContext} from '../../../../../../context/themeContext';

const RsButton = ({activeButtons, setActiveButtons, disabled}) => {
  const styles = useChartsStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  // Hard-coded buttons data for the charts
  const buttons = [
    {
      label: 'Support',
      color: {
        inactive: isDarkMode ? '#E93334' : '#E93334',
        active: isDarkMode ? '#FFFFFF' : '#FFFFFF',
      },
      background: {
        inactive: isDarkMode ? 'transparent' : 'transparent',
        active: isDarkMode ? '#D82A2B' : '#D82A2B',
      },
      border: {
        inactive: isDarkMode ? '#E93334' : '#E93334',
        active: isDarkMode ? '#D82A2B' : '#D82A2B',
      },
    },
    {
      label: 'Resistance',
      color: {
        inactive: isDarkMode ? '#09C283' : '#2DDA99',
        active: isDarkMode ? '#FFFFFF' : '#FFFFFF',
      },
      background: {
        inactive: isDarkMode ? 'transparent' : 'transparent',
        active: isDarkMode ? '#09C283' : '#2DDA99',
      },
      border: {
        inactive: isDarkMode ? '#09C283' : '#2DDA99',
        active: isDarkMode ? '#09C283' : '#2DDA99',
      },
    },
    // {
    //   label: 'Fibonacci',
    //   color: {
    //     inactive: isDarkMode ? '#A58BFA' : '#783AED',
    //     active: isDarkMode ? '#FFFFFF' : '#FFFFFF',
    //   },
    //   background: {
    //     inactive: isDarkMode ? '#2C1065' : '#F5F3FF',
    //     active: isDarkMode ? '#895EF6' : '#895EF6',
    //   },
    //   border: {
    //     inactive: isDarkMode ? '#895EF6' : '#783AED',
    //     active: isDarkMode ? '#895EF6' : '#895EF6',
    //   },
    // },
    // Uncomment when fibonacci functionality is ready
    // {
    //   label: 'Trend Lines',
    //   color: {
    //     inactive: isDarkMode ? '#13B4C7' : '#13B4C7',
    //     active: isDarkMode ? '#FFFFFF' : '#FFFFFF',
    //   },
    //   background: {
    //     inactive: isDarkMode ? '#0C3340' : '#E7F6F6',
    //     active: isDarkMode ? '#20CBDD' : '#20CBDD',
    //   },
    //   border: {
    //     inactive: isDarkMode ? '#138FA7' : '#13B4C7',
    //     active: isDarkMode ? '#20CBDD' : '#20CBDD',
    //   },
    // },
    // Uncomment when trend lines functionality is ready
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
                ? button.background.active
                : button.background.inactive,
              borderColor: activeButtons.includes(button.label)
                ? button.border.active
                : button.border.inactive,
              opacity: button.label === 'Trend Lines' ? 0.2 : 1, // Disable the button while it doesn't have a functionality
            },
          ]}
          onPress={() => handlePress(button.label)}
          disabled={disabled || button.label === 'Trend Lines'} // Disable the button while it doesn't have a functionality
        >
          <Text
            style={[
              styles.rsButtonText,
              activeButtons.includes(button.label)
                ? {color: button.color.active}
                : {color: button.color.inactive},
            ]}>
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RsButton;
