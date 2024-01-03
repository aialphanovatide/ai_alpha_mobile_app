import React, {createContext, useContext, useState} from 'react';
import {lightThemeStyles, darkThemeStyles} from '../theme/theme.js';

const AppThemeContext = createContext();

const AppThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkThemeStyles : lightThemeStyles;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AppThemeContext.Provider value={{theme, toggleDarkMode, isDarkMode}}>
      {children}
    </AppThemeContext.Provider>
  );
};

export {AppThemeContext, AppThemeProvider};
