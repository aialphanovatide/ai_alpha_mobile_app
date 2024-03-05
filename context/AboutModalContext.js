import React, {createContext, useContext, useState} from 'react';

const AboutModalContext = createContext();

const AboutModalProvider = ({children}) => {
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');

  const handleAboutPress = (description = null) => {
    if (description) {
      setAboutDescription(description);
    }
    setAboutVisible(!aboutVisible);
  };

  return (
    <AboutModalContext.Provider
      value={{aboutDescription, aboutVisible, handleAboutPress}}>
      {children}
    </AboutModalContext.Provider>
  );
};

export {AboutModalContext, AboutModalProvider};
