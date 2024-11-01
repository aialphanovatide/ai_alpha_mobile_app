import React, {createContext, useState} from 'react';

export const HeaderVisibilityContext = createContext();

export const HeaderVisibilityProvider = ({children}) => {
  const [headersVisibility, setHeadersVisibility] = useState({
    TopMenu: true,
    SubMenu: true,
    FundNewsChartsMenu: true,
  });

  const showHeader = headerName => {
    setHeadersVisibility(prev => ({...prev, [headerName]: true}));
  };

  const hideHeader = headerName => {
    setHeadersVisibility(prev => ({...prev, [headerName]: false}));
  };

  return (
    <HeaderVisibilityContext.Provider
      value={{
        headersVisibility,
        showHeader,
        hideHeader,
      }}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
};
