import React, { useContext, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import useCustomInputStyles from './CustomInputStyles';
import { AppThemeContext } from '../../../context/themeContext';

// Component to render a custom input with different styles based on the theme. It can be a date input or a regular input. The date input has a specific validation logic. The input can also be a secure text input. It uses an error handler to show an error message when the input is invalid.

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  isDateInput,
  onError,
  containerStyles = null,
}) => {
  const styles = useCustomInputStyles();
  const { theme } = useContext(AppThemeContext);

  if (value === '//'){
    value = '';
  }

  useEffect(() => {
    if (isDateInput) {
      validateDate(value);
    }
  }, [value, isDateInput]);

  const validateDate = (date) => {
    // Allow empty input

    if (date === '//') {
      date = '';
    };

    if (date === '') {
      date = 'DD/MM/YYYY';
      onError(false); // No error if the input is empty
      return;
    }

    // Ensure the format is "DD/MM/YYYY"
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      onError(true);
      return;
    }

    const [day, month, year] = date.split('/').map(Number);
    const userDate = new Date(year, month - 1, day);
    const today = new Date();
    const currentYear = today.getFullYear();

    // Validate the date logic
    if (
      month < 1 || month > 12 ||
      day < 1 || day > 31 ||
      year > currentYear ||
      userDate.getFullYear() !== year ||
      userDate.getMonth() + 1 !== month ||
      userDate.getDate() !== day ||
      userDate > today
    ) {
      onError(true);
      return;
    }


    onError(false); // Date is valid
  };

  const handleDateInputChange = (text) => {
    if (isDateInput) {
      // Only add slashes when the user starts typing
      const filteredText = text.replace(/[^0-9]/g, '').substring(0, 8);
      let newText = filteredText;

      const isDeleting = text.length < value.length;

      if (filteredText.length >= 2 && !isDeleting ) {
        newText = `${filteredText.slice(0, 2)}/${filteredText.slice(2, 4)}${filteredText.length > 3 ? '/' + filteredText.slice(4) : ''}`;
      }

      setValue(newText);
    } else {
      setValue(text);
    }
  };

  return (
    <View
      style={[styles.container, containerStyles && containerStyles]}
      showsVerticalScrollIndicator={false}>
      <TextInput
        value={value}
        onChangeText={handleDateInputChange}
        placeholder={placeholder}
        placeholderTextColor={theme.placeHolderTextColor}
        style={styles.dateInput}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        keyboardType={isDateInput ? 'numeric' : 'default'}
      />
    </View>
  );
};

export default CustomInput;
