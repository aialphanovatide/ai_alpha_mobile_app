import React, { createContext, useState } from 'react';

const TopMenuContext = createContext();

const TopMenuContextProvider = ({ children }) => {
  
  const [activeCoin, setActiveCoin] = useState({});
  const [activeSubCoin, setActiveSubCoin] = useState(null);

  const updateActiveCoin = (newValue) => {
    setActiveCoin(newValue);
  };

  const updateActiveSubCoin = newValue => {
    setActiveSubCoin(newValue);
  };

  return (
    <TopMenuContext.Provider value={{ activeCoin, updateActiveCoin, activeSubCoin, updateActiveSubCoin }}>
      {children}
    </TopMenuContext.Provider>
  );
};

export { TopMenuContext, TopMenuContextProvider };