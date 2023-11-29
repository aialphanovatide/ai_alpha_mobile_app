import React, { createContext, useState } from 'react';

const TopMenuContext = createContext();

const TopMenuContextProvider = ({ children }) => {
  
    const [sharedData, setSharedData] = useState({'active': false, data: 'charts'});

  const updateSharedData = (newValue) => {
    setSharedData(newValue);
  };

  return (
    <TopMenuContext.Provider value={{ sharedData, updateSharedData }}>
      {children}
    </TopMenuContext.Provider>
  );
};

export { TopMenuContext, TopMenuContextProvider };