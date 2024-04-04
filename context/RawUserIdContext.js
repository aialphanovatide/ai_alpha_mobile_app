import React, { createContext, useState, useContext } from 'react';

const RawUserIdContext = createContext();

export const RawUserIdProvider = ({ children }) => {
  const [rawUserId, setRawUserId] = useState('');

  return (
    <RawUserIdContext.Provider value={{ rawUserId, setRawUserId }}>
      {children}
    </RawUserIdContext.Provider>
  );
};

export const useRawUserId = () => useContext(RawUserIdContext);
