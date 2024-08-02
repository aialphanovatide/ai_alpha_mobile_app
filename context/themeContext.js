import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightThemeStyles, darkThemeStyles} from '../theme/theme.js';
import eventEmitter from '../eventEmitter';

const AppThemeContext = createContext();

const AppThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = isDarkMode ? darkThemeStyles : lightThemeStyles;

  useEffect(() => {
    const fetchDarkMode = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('isDarkMode');
        if (savedDarkMode !== null) {
          setIsDarkMode(JSON.parse(savedDarkMode));
        }
      } catch (error) {
        console.log('Failed to load dark mode state', error);
      }
    };

    fetchDarkMode();
  }, []);

  useEffect(() => {
    const saveDarkMode = async () => {
      try {
        await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        eventEmitter.emit('darkModeChanged', isDarkMode);
      } catch (error) {
        console.log('Failed to save dark mode state', error);
      }
    };

    saveDarkMode();
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log("isDarkMode -> ", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AppThemeContext.Provider value={{theme, toggleDarkMode, isDarkMode}}>
      {children}
    </AppThemeContext.Provider>
  );
};

export {AppThemeContext, AppThemeProvider};
