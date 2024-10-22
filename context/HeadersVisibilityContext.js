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

  const handleScroll = (event, scrollOffset) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;

    if (diff > 5 && currentOffset > 100) {
      hideHeader('TopMenu');
      hideHeader('SubMenu');
      hideHeader('FundNewsChartsMenu');
    } else if (diff < -5) {
      showHeader('TopMenu');
      showHeader('SubMenu');
      showHeader('FundNewsChartsMenu');
    }

    scrollOffset.current = currentOffset;
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
