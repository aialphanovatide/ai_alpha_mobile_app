import React, {useContext, useState, useEffect} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import useCustomInputStyles from './CustomInputStyles';
import {AppThemeContext} from '../../../context/themeContext';

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
  const {theme} = useContext(AppThemeContext);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isDateInput) {
      validateDate(value);
    }
  }, [value, isDateInput]);

  const validateDate = date => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date) && date !== '') {
      setError('Please enter the date in DD/MM/YYYY format.');
      onError('Please enter the date in DD/MM/YYYY format.');
      return;
    }

    const [day, month, year] = date.split('/');
    const userDate = new Date(year, month - 1, day);
    const today = new Date();

    if (
      userDate.getFullYear() !== parseInt(year) ||
      userDate.getMonth() + 1 !== parseInt(month) ||
      userDate.getDate() !== parseInt(day)
    ) {
      setError('Invalid date. Please check the values entered.');
      onError('Invalid date. Please check the values entered.');
      return;
    }

    if (userDate > today) {
      setError('Date cannot be in the future.');
      onError('Date cannot be in the future.');
      return;
    }

    setError('');
    onError('');
  };

  const handleDateInputChange = text => {
    if (isDateInput) {
      const filteredText = text.replace(/[^0-9/]/g, '');
      let newText = filteredText;
      const isDeleting = text.length < value.length;

      if (
        (filteredText.length === 2 || filteredText.length === 5) &&
        !isDeleting
      ) {
        if (filteredText[filteredText.length - 1] !== '/') {
          newText += '/';
        }
      } else if (filteredText.length > 10) {
        newText = filteredText.substring(0, 10);
      } else if (filteredText.length === 3 || filteredText.length === 6) {
        if (isDeleting && newText.endsWith('/')) {
          newText = newText.slice(0, -1); // Remove the trailing slash
        }
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
        placeholderTextColor={theme.textColor}
        style={styles.dateInput}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        keyboardType={isDateInput ? 'numeric' : 'default'}
      />
      {error !== '' && <Text style={localStyles.errorText}>{error}</Text>}
    </View>
  );
};

const localStyles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default CustomInput;
