import React, { createContext, useState } from 'react';

const TopMenuContext = createContext();

const TopMenuContextProvider = ({ children }) => {
  
  const [activeCoin, setActiveCoin] = useState({});

  const updateActiveCoin = (newValue) => {
    setActiveCoin(newValue);
  };

  return (
    <TopMenuContext.Provider value={{ activeCoin, updateActiveCoin }}>
      {children}
    </TopMenuContext.Provider>
  );
};

export { TopMenuContext, TopMenuContextProvider };