// [DEPRECATED] This file is not used anymore. It was used to store the user id in the context. Now, the user id is handled with the Redux store and the user's local storage.
import React, { createContext, useState, useContext } from 'react';

const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState('');

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => useContext(UserIdContext);
