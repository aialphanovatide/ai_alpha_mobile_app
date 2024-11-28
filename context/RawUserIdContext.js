// [DEPRECATED] This file is not used anymore. It was used to store the raw user id in the context. Now, the raw user id is handled with the Redux store and the user's local storage.

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
